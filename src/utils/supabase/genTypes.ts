import { execSync } from "node:child_process";
import { loadEnvConfig } from "@next/env";

/**
 * This script generates the types for the Supabase database.
 *
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
  loadEnvConfig(process.cwd());
  // This requires the supabase CLI to be installed and logged in
  const cmd = `supabase gen types --lang typescript --project-id ${process.env.SUPABASE_PROJECT_ID} > ../../types/database.ts`;
  console.log(cmd);
  execSync(cmd);
}

main();
