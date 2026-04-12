import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const county = searchParams.get("county");
  const year = parseInt(searchParams.get("year") ?? "0", 10);

  console.log(`[county-attorneys] county="${county}" year=${year}`);

  if (!county || !year) {
    return NextResponse.json({ error: "Missing county or year" }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createClient();
  } catch (e) {
    console.error("[county-attorneys] Failed to create Supabase client:", e);
    return NextResponse.json({ error: "Supabase client init failed", detail: String(e) }, { status: 500 });
  }

  // Diagnostic: count ALL rows in the table (no filters) to confirm service role access
  const { count, error: countError } = await supabase
    .from("attorney_detail_report")
    .select("*", { count: "exact", head: true });
  console.log(`[county-attorneys] total rows in table: ${count}, error:`, countError);

  const [currentRes, threeYearRes] = await Promise.all([
    supabase
      .from("attorney_detail_report")
      .select("bar_number, total_cases, adult_felony_cases_paid, adult_misdemeanor_cases_paid, fiscal_year")
      .ilike("county", `%${county}%`)
      .eq("fiscal_year", year)
      .order("total_cases", { ascending: false }),
    supabase
      .from("attorney_detail_report")
      .select("bar_number, total_cases, fiscal_year")
      .ilike("county", `%${county}%`)
      .in("fiscal_year", [year - 2, year - 1, year]),
  ]);

  console.log(`[county-attorneys] currentRes: ${currentRes.data?.length ?? 0} rows, error:`, currentRes.error);
  console.log(`[county-attorneys] threeYearRes: ${threeYearRes.data?.length ?? 0} rows, error:`, threeYearRes.error);

  // If current year returned nothing, log what years DO have data for this county
  if (!currentRes.data?.length) {
    const { data: availableYears } = await supabase
      .from("attorney_detail_report")
      .select("fiscal_year")
      .ilike("county", `%${county}%`)
      .order("fiscal_year", { ascending: false })
      .limit(10);
    console.log(`[county-attorneys] available fiscal_years for "${county}":`, availableYears?.map(r => r.fiscal_year));
  }

  if (currentRes.error || threeYearRes.error) {
    return NextResponse.json(
      { error: "Query failed", current: currentRes.error, threeYear: threeYearRes.error },
      { status: 500 }
    );
  }

  // Compute 3-year average per attorney
  const threeYearAvgMap: Record<string, number> = {};
  const rows = threeYearRes.data ?? [];
  const acc: Record<string, { sum: number; count: number }> = {};
  rows.forEach((r) => {
    const key = String(r.bar_number ?? "");
    if (!key) return;
    if (!acc[key]) acc[key] = { sum: 0, count: 0 };
    acc[key].sum += r.total_cases ?? 0;
    acc[key].count += 1;
  });
  Object.entries(acc).forEach(([k, v]) => {
    threeYearAvgMap[k] = Math.round(v.sum / v.count);
  });

  const attorneys = currentRes.data ?? [];
  const highCaseloadCount = attorneys.filter((a) => (a.total_cases ?? 0) > 150).length;

  return NextResponse.json({
    attorneys: attorneys.slice(0, 8),
    threeYearAvgMap,
    highCaseloadCount,
  });
}
