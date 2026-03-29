import { execSync } from "node:child_process";
import { loadEnvConfig } from "@next/env";
import path from "node:path";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

/**
 * Generates `src/types/database.ts` via the Supabase CLI against the hosted project.
 *
 * Requires:
 * - `SUPABASE_PROJECT_ID` in `.env.local` (project ref from the dashboard URL).
 * - Supabase CLI installed (devDependency) and authenticated: `pnpm run sb:login`.
 *
 * Run: `pnpm run sb:gen`
 *
 * Note: `supabase gen types` uses the CLI login session, not API keys from env.
 */
function main() {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  const targetFile = path.join(projectDir, "src", "types", "database.ts");
  const targetDir = path.dirname(targetFile);

  // Ensure the target directory exists
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  const projectId = process.env.SUPABASE_PROJECT_ID;

  if (!projectId) {
    throw new Error("SUPABASE_PROJECT_ID is not set");
  }

  if (!/^[a-z\d-]+$/i.test(projectId)) {
    throw new Error("SUPABASE_PROJECT_ID has unexpected characters");
  }

  const types = execSync(
    `supabase gen types --lang typescript --project-id ${projectId}`,
    { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
  );

  writeFileSync(targetFile, types, "utf8");

  console.log(`Wrote ${targetFile}`);
}

main();
