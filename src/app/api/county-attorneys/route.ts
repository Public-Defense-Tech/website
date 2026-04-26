import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const county = searchParams.get("county");
  const year = parseInt(searchParams.get("year") ?? "0", 10);

  if (!county || !year) {
    return NextResponse.json({ error: "Missing county or year" }, { status: 400 });
  }

  const supabase = createClient();

  // 1. Get the list of bar numbers for attorneys active in THAT SPECIFIC COUNTY
  // We use the raw table here because the View doesn't have a 'county' column
  const { data: activeAttorneys, error: subqueryError } = await supabase
    .from("attorney_detail_report")
    .select("bar_number")
    .eq("fiscal_year", year)
    .ilike("county", `%${county}%`)
    .limit(5000);

  if (subqueryError) {
    return NextResponse.json({ error: "County lookup failed", detail: subqueryError }, { status: 500 });
  }

  const barNumbers = [...new Set(activeAttorneys?.map(a => a.bar_number) ?? [])];

  if (barNumbers.length === 0) {
    return NextResponse.json({ attorneys: [], message: "No attorneys found for this county/year" });
  }

  // 2. Fetch aggregates from the VIEW using the corrected column names
  const [currentRes, threeYearRes] = await Promise.all([
    supabase
      .from("attorney_yearly_totals")
      .select("bar_number, attorney_name, total_cases_reported, total_paid_amount, fiscal_year")
      .in("bar_number", barNumbers)
      .eq("fiscal_year", year)
      .order("total_cases_reported", { ascending: false }), // Fixed column name
    supabase
      .from("attorney_yearly_totals")
      .select("bar_number, total_cases_reported, fiscal_year, total_paid_amount") // Fixed typo 'repoted'
      .in("bar_number", barNumbers)
      .in("fiscal_year", [year - 2, year - 1, year]),
  ]);

  if (currentRes.error || threeYearRes.error) {
    return NextResponse.json(
      { error: "View query failed", current: currentRes.error, threeYear: threeYearRes.error },
      { status: 500 }
    );
  }

  // 3. Compute 3-year average per attorney
  const threeYearAvgMap: Record<string, number> = {};
  const historyRows = threeYearRes.data ?? [];
  const acc: Record<string, { sum: number; count: number }> = {};
  
  historyRows.forEach((r) => {
    const key = String(r.bar_number ?? "");
    if (!key) return;
    if (!acc[key]) acc[key] = { sum: 0, count: 0 };
    acc[key].sum += Number(r.total_cases_reported ?? 0);
    acc[key].count += 1;
  });

  Object.entries(acc).forEach(([k, v]) => {
    threeYearAvgMap[k] = Math.round(v.sum / v.count);
  });

  const attorneys = currentRes.data ?? [];
  const highCaseloadCount = attorneys.filter((a) => (a.total_cases_reported ?? 0) > 150).length;

  return NextResponse.json({
    attorneys: attorneys.slice(0, 8),
    threeYearAvgMap,
    highCaseloadCount,
  });
}