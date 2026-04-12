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

  const url = process.env.SUPABASE_PROJECT_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables (need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE)");
  }

  supabase = createSupabaseClient<Database>(url, key);

  return supabase;
}
