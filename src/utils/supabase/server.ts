import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from "@supabase/supabase-js";
import { type Database } from "@/types/database";

// Ensure that the supabase client is a singleton
let supabase: SupabaseClient<Database> | null = null;

/**
 * Returns a singleton Supabase client configured for server-only usage.
 * No cookie handling is needed because the website is public and every
 * request originates from our own Node process.
 */
export function createClient() {
  if (supabase) return supabase;

  if (!process.env.SUPABASE_PROJECT_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables");
  }

  supabase = createSupabaseClient<Database>(
    process.env.SUPABASE_PROJECT_URL,
    process.env.SUPABASE_ANON_KEY
  );

  return supabase;
}
