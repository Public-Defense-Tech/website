import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  if (!process.env.SUPABASE_PROJECT_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables");
  }

  return createBrowserClient(
    process.env.SUPABASE_PROJECT_URL,
    process.env.SUPABASE_ANON_KEY
  );
}
