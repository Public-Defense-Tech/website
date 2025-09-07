import { execSync } from "node:child_process";
import { loadEnvConfig } from "@next/env";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

/**
 * This script generates the types for the Supabase database.
 *
 * Requirements:
 * 1. The supabase project to be created and the .env.local file to be present in the root of the project.
 *    - The supabase project should be created in the supabase dashboard.
 *    - You'll need the following environment variables:
 *      - SUPABASE_PROJECT_ID
 *      - SUPABASE_PROJECT_URL
 *      - SUPABASE_ANON_KEY
 *      - SUPABASE_SERVICE_ROLE_KEY
 *
 * 2. Run the script:
 *    - npm run sb:gen
 *
 * 3. The types will be generated in the src/types/database.ts file.
 *
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

  console.log("projectId: ", projectId);
  if (!projectId) {
    throw new Error("SUPABASE_PROJECT_ID is not set");
  }

  // This requires the supabase CLI to be installed and logged in
  // Use proper quoting for the file path to handle spaces and special characters
  const cmd = `supabase gen types --lang typescript --project-id ${projectId} > "${targetFile}"`;
  console.log(cmd);
  execSync(cmd);
}

main();
