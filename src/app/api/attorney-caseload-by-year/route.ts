import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface YearlyCaseload {
  year: number;
  attorneyName: string;
  caseload: number;
}

export async function GET() {
  const supabase = createClient();
  // Use years 2020-2025 based on available data in view
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const results: YearlyCaseload[] = [];

  try {
    // Try using the view first if it has year data
    const { data: viewData, error: viewError } = await supabase
      .from("v_hays_attorney_caseload")
      .select("*");

    // If view exists and has data, process it
    if (!viewError && viewData && viewData.length > 0) {
      // Process view data by year
      for (const year of years) {
        // Filter by year AND ensure we have valid attorney identification
        // Exclude records where both attorney_name and attorney_hash are null
        const yearData = viewData.filter(
          (item) =>
            item.year === year &&
            (item.attorney_name || item.attorney_hash) &&
            (item.cases ?? 0) > 0
        );

        if (yearData.length > 0) {
          // Find attorney with highest caseload for this year
          const topAttorney = yearData.reduce((max, attorney) => {
            const cases = attorney.cases || 0;
            const maxCases = max.cases || 0;

            if (cases > maxCases) {
              return attorney;
            }
            // If same case count, prefer one with attorney_name
            if (
              cases === maxCases &&
              attorney.attorney_name &&
              !max.attorney_name
            ) {
              return attorney;
            }
            return max;
          }, yearData[0]);

          const attorneyName =
            topAttorney.attorney_name ||
            topAttorney.attorney_hash ||
            "Unknown Attorney";

          results.push({
            year,
            attorneyName,
            caseload: topAttorney.cases ?? 0,
          });
        }
      }

      // Ensure all years are represented (even if no data)
      for (const year of years) {
        if (!results.find((r) => r.year === year)) {
          results.push({
            year,
            attorneyName: "No data available",
            caseload: 0,
          });
        }
      }
      return NextResponse.json(results.toSorted((a, b) => a.year - b.year));
    }

    // If view doesn't exist or has no data, return empty results
    return NextResponse.json(
      years.map((year) => ({
        year,
        attorneyName: "No data available",
        caseload: 0,
      }))
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
