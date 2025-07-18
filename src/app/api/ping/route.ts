import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// This is a test route to check if the Supabase client is working
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("charge").select("*").limit(100);

  return NextResponse.json({ ok: !error, error, data });
}
