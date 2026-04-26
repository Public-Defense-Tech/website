"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";
import type { Tables } from "@/types/database";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "@vnedyalk0v/react19-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import Grid from "@mui/material/Grid";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Chip,
  Stack,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { X, TrendingDown, TrendingUp } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const TEXAS_TOPO_JSON = "/texas-counties.json";

// National average for indigent defense per capita spending (US avg, adjust as needed)
const NATIONAL_AVG_PER_CAPITA = 47.25;

// ABA recommended caseload standards (cases/attorney/year)
const CASELOAD_STANDARDS = { felony: 150, misdemeanor: 400 };

const AVAILABLE_YEARS = [2022, 2023, 2024];

type ManagedSystemRow = Tables<"counties_managed_systems">;
type CourtYearRow = Tables<"county_year_disposition_summary">;
type AttorneyRow = Tables<"attorney_yearly_totals">;

/** Disposition row; DB may expose extra columns before types are regenerated. */
type CountyCourtStats = CourtYearRow & {
  felony_appointment_rate?: number | null;
  felony_cases_paid?: number | null;
  felony_new_cases_filed?: number | null;
  misdemeanor_appointment_rate?: number | null;
  misdemeanor_cases_paid?: number | null;
  misdemeanor_new_cases_filed?: number | null;
};

type CountyAttorneysResponse = {
  attorneys: AttorneyRow[];
  threeYearAvgMap: Record<string, number>;
  highCaseloadCount: number;
};

export type SelectedCountyData = {
  county_name: string;
  population: number;
  areaSqMiles: number | null;
  systems: ManagedSystemRow[];
  perCapita: number;
  totalExpenditure: number;
  courtStats: CountyCourtStats | null;
  topAttorneys: AttorneyRow[];
  threeYearAvgMap: Record<string, number>;
  highCaseloadCount: number;
};

function parseCountyAttorneysResponse(raw: unknown): CountyAttorneysResponse {
  if (raw == null || typeof raw !== "object") {
    return { attorneys: [], threeYearAvgMap: {}, highCaseloadCount: 0 };
  }
  const o = raw as Record<string, unknown>;
  const attorneys = Array.isArray(o.attorneys)
    ? (o.attorneys as AttorneyRow[])
    : [];
  const threeYearAvgMap =
    o.threeYearAvgMap != null && typeof o.threeYearAvgMap === "object"
      ? (o.threeYearAvgMap as Record<string, number>)
      : {};
  const highCaseloadCount =
    typeof o.highCaseloadCount === "number" ? o.highCaseloadCount : 0;
  return { attorneys, threeYearAvgMap, highCaseloadCount };
}

// --- HELPERS ---
const getCountyName = (properties: GeoJsonProperties | undefined): string => {
  if (properties == null || typeof properties !== "object") return "";
  const p = properties as Record<string, unknown>;
  return String(p.NAME ?? p.name ?? p.CNTY_NM ?? p.COUNTY ?? "").trim();
};

const cleanKey = (name: string) =>
  name
    .toUpperCase()
    .replace(/\s*COUNTY$/i, "")
    .trim();

const getCountyColor = (systems: string[]) => {
  if (!systems || systems.length === 0) return "#f8fafc";
  if (systems.length > 1) return "#6366f1";
  const rawType = systems[0];
  if (!rawType || typeof rawType !== "string") return "#f8fafc";
  const type = rawType.toLowerCase();
  if (type.includes("regional")) return "#0ea5e9";
  if (type.includes("public defender")) return "#1976d2";
  if (type.includes("managed assigned counsel") || type.includes("mac"))
    return "#8b5cf6";
  return "#94a3b8";
};

const pct = (
  n: number | null | undefined,
  d: number | null | undefined,
): string => {
  if (!n || !d || d === 0) return "—";
  return `${((n / d) * 100).toFixed(1)}%`;
};

// Horizontal bar for expenditure comparison
const SpendBar = ({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) => (
  <Stack direction="row" spacing={1.5} alignItems="center">
    <Typography
      variant="caption"
      sx={{
        fontWeight: 700,
        color: "#64748b",
        width: 76,
        flexShrink: 0,
        fontSize: "0.65rem",
        textTransform: "uppercase",
      }}
    >
      {label}
    </Typography>
    <Box
      sx={{
        flex: 1,
        bgcolor: "#e2e8f0",
        borderRadius: 4,
        height: 8,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: `${Math.min((value / max) * 100, 100)}%`,
          height: "100%",
          bgcolor: color,
          borderRadius: 4,
          transition: "width 0.6s ease",
        }}
      />
    </Box>
    <Typography
      variant="caption"
      sx={{
        fontWeight: 800,
        color: "#1e293b",
        width: 44,
        textAlign: "right",
        fontSize: "0.7rem",
        flexShrink: 0,
      }}
    >
      ${value.toFixed(2)}
    </Typography>
  </Stack>
);

// Section label used throughout the card
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="overline"
    sx={{
      color: "#64748b",
      fontWeight: 800,
      fontSize: "0.6rem",
      letterSpacing: "0.12em",
      display: "block",
      mb: 1,
    }}
  >
    {children}
  </Typography>
);

export default function InteractiveTexasDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCountyName, setSelectedCountyName] = useState<string | null>(
    null,
  );
  const [selectedData, setSelectedData] = useState<SelectedCountyData | null>(
    null,
  );
  const [systemMap, setSystemMap] = useState<Record<string, string[]> | null>(
    null,
  );
  const [texasGeo, setTexasGeo] = useState<FeatureCollection | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [stateAvgPerCapita, setStateAvgPerCapita] = useState<number | null>(
    null,
  );

  const supabase = useMemo(() => createClient(), []);

  // On mount: load map geometry, system map, and compute state average
  useEffect(() => {
    setIsMounted(true);
    let cancelled = false;

    async function initMap() {
      setGeoError(null);
      try {
        const [systemsOutcome, geoOutcome, spendingOutcome] =
          await Promise.allSettled([
            supabase
              .from("counties_managed_systems")
              .select("county, system_type"),
            fetch(TEXAS_TOPO_JSON),
            supabase
              .from("county_per_capita_spending")
              .select("net_per_capita_spending"),
          ]);

        if (cancelled) return;

        if (systemsOutcome.status === "fulfilled") {
          const { data } = systemsOutcome.value;
          const mapping: Record<string, string[]> = {};
          data?.forEach((row) => {
            const key = cleanKey(row.county ?? "");
            if (!key) return;
            if (!mapping[key]) mapping[key] = [];
            if (row.system_type) mapping[key].push(row.system_type);
          });
          setSystemMap(mapping);
        }

        if (geoOutcome.status === "fulfilled" && geoOutcome.value.ok) {
          const parsed = await geoOutcome.value.json();
          setTexasGeo(parsed as FeatureCollection);
        } else {
          setGeoError("Failed to load map geometry.");
        }

        if (spendingOutcome.status === "fulfilled") {
          const { data } = spendingOutcome.value;
          if (data && data.length > 0) {
            const vals = data
              .map((r) => r.net_per_capita_spending || 0)
              .filter((v) => v > 0);
            if (vals.length > 0) {
              const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
              setStateAvgPerCapita(avg);
            }
          }
        }
      } catch {
        if (!cancelled) setGeoError("An unexpected error occurred.");
      }
    }

    initMap();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  // Fetch county data whenever selected county or year changes
  const fetchCountyData = useCallback(
    async (searchName: string) => {
      console.log(
        "[fetchCountyData] called with",
        searchName,
        "year",
        selectedYear,
      );
      setIsActionLoading(true);
      try {
        const [systemsRes, spendingRes, countyRes] = await Promise.all([
          supabase
            .from("counties_managed_systems")
            .select("*")
            .ilike("county", `%${searchName}%`),
          supabase
            .from("county_per_capita_spending")
            .select("*")
            .ilike("County", `%${searchName}%`)
            .maybeSingle(),
          supabase
            .from("counties")
            .select("id")
            .ilike("name", searchName)
            .maybeSingle(),
        ]);

        let courtActivity: CountyCourtStats | null = null;
        let topAttorneys: AttorneyRow[] = [];
        let threeYearAvgMap: Record<string, number> = {};
        let highCaseloadCount = 0;

        console.log(
          "[fetchCountyData] reached attorney fetch for",
          searchName,
          "year",
          selectedYear,
        );
        // Attorney data is fetched server-side to bypass RLS on attorney_detail_report
        const attorneyFetch = fetch(
          `/api/county-attorneys?county=${encodeURIComponent(searchName)}&year=${selectedYear}`,
        )
          .then(async (r) => {
            const json: unknown = await r.json();
            console.log(`[county-attorneys] status=${r.status}`, json);
            return json;
          })
          .catch((e) => {
            console.error("[county-attorneys] fetch error:", e);
            return null;
          });

        if (countyRes.data?.id) {
          const countyId = countyRes.data.id;

          const [courtRes, attorneyRaw] = await Promise.all([
            supabase
              .from("county_year_disposition_summary")
              .select("*")
              .eq("county_id", countyId)
              .eq("year", selectedYear)
              .maybeSingle(),
            attorneyFetch,
          ]);

          courtActivity = courtRes.data ?? null;
          const parsed = parseCountyAttorneysResponse(attorneyRaw);
          topAttorneys = parsed.attorneys;
          threeYearAvgMap = parsed.threeYearAvgMap;
          highCaseloadCount = parsed.highCaseloadCount;
        } else {
          const attorneyRaw = await attorneyFetch;
          const parsed = parseCountyAttorneysResponse(attorneyRaw);
          topAttorneys = parsed.attorneys;
          threeYearAvgMap = parsed.threeYearAvgMap;
          highCaseloadCount = parsed.highCaseloadCount;
        }

        // Deduplicate managed systems by system_type
        const systemRows: ManagedSystemRow[] = systemsRes.data ?? [];
        const seenTypes = new Set<string>();
        const uniqueSystems = systemRows.filter((r) => {
          const key = r.system_type ?? r.name ?? "";
          if (seenTypes.has(key)) return false;
          seenTypes.add(key);
          return true;
        });

        // Area in square miles from first managed-systems row
        const areaSqMiles = systemRows[0]?.area_sq_miles ?? null;

        setSelectedData({
          county_name: `${searchName} County`,
          population: systemRows[0]?.population || 0,
          areaSqMiles,
          systems: uniqueSystems,
          perCapita: spendingRes.data?.net_per_capita_spending || 0,
          totalExpenditure: spendingRes.data?.total_net_expenditure || 0,
          courtStats: courtActivity,
          topAttorneys: topAttorneys.slice(0, 8),
          threeYearAvgMap,
          highCaseloadCount,
        });
      } catch (err) {
        console.error("Selection error:", err);
      } finally {
        setIsActionLoading(false);
      }
    },
    [supabase, selectedYear],
  );

  // Trigger fetch when county or year changes
  useEffect(() => {
    if (selectedCountyName) {
      fetchCountyData(selectedCountyName);
    }
  }, [selectedCountyName, fetchCountyData]);

  const handleCountyClick = (geo: Feature<Geometry>) => {
    const rawName = getCountyName(geo.properties);
    if (!rawName) return;
    const searchName = rawName.replace(/\s*County$/i, "").trim();
    setSelectedCountyName(searchName);
  };

  if (!isMounted) {
    return (
      <Box
        sx={{
          height: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
    >
      {/* LEGEND */}
      <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ px: 1 }}>
        {[
          { label: "Public Defender", color: "#1976d2" },
          { label: "Regional PD", color: "#0ea5e9" },
          { label: "Managed Assigned Counsel", color: "#8b5cf6" },
          { label: "Multiple Systems", color: "#6366f1" },
          { label: "Traditional", color: "#f8fafc" },
        ].map((item) => (
          <Stack
            key={item.label}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: 0.5,
                bgcolor: item.color,
                border: "1px solid #cbd5e1",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "#475569",
                fontSize: "0.65rem",
              }}
            >
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {/* MAP */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          borderRadius: 4,
          border: "1px solid #e2e8f0",
          bgcolor: "#ffffff",
          overflow: "hidden",
        }}
      >
        {geoError ? (
          <Box
            sx={{
              height: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="error">{geoError}</Typography>
          </Box>
        ) : !systemMap || !texasGeo ? (
          <Box
            sx={{
              height: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={
              { scale: 2400, center: [-99.5, 31.2] } as React.ComponentProps<
                typeof ComposableMap
              >["projectionConfig"]
            }
            width={800}
            height={600}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={texasGeo}>
              {({ geographies }) =>
                geographies.map((geo, index) => {
                  const name = getCountyName(geo.properties);
                  const key = cleanKey(name);
                  const systems = systemMap[key] || [];
                  const isSelected =
                    selectedCountyName !== null &&
                    name
                      .replace(/\s*County$/i, "")
                      .trim()
                      .toLowerCase() === selectedCountyName.toLowerCase();
                  return (
                    <Geography
                      key={
                        (geo as Feature<Geometry> & { rsmKey?: string }).rsmKey ??
                        index
                      }
                      geography={geo}
                      onClick={() => handleCountyClick(geo)}
                      tabIndex={-1}
                      style={{
                        default: {
                          fill: isSelected
                            ? "#0f172a"
                            : getCountyColor(systems),
                          stroke: "#cbd5e1",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#0f172a",
                          stroke: "#0f172a",
                          strokeWidth: 1,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: { fill: "#1e40af", outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        )}
        {isActionLoading && (
          <CircularProgress
            size={24}
            sx={{ position: "absolute", top: 20, right: 20 }}
          />
        )}
      </Paper>

      {/* INFO CARD */}
      <Box>
        <AnimatePresence mode="wait">
          {selectedData ? (
            <motion.div
              key={selectedCountyName ?? "card"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Paper
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  bgcolor: "#ffffff",
                }}
              >
                {/* ── HEADER ── */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={1}
                  sx={{ mb: 3 }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 900, color: "#0f172a" }}
                  >
                    {selectedData.county_name}
                  </Typography>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <ToggleButtonGroup
                      value={selectedYear}
                      exclusive
                      onChange={(_, v) => v && setSelectedYear(v)}
                      size="small"
                      sx={{
                        "& .MuiToggleButton-root": {
                          px: 1.5,
                          py: 0.5,
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          textTransform: "none",
                        },
                      }}
                    >
                      {AVAILABLE_YEARS.map((y) => (
                        <ToggleButton key={y} value={y}>
                          {y}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                    {isActionLoading && <CircularProgress size={16} />}
                    <IconButton
                      onClick={() => {
                        setSelectedData(null);
                        setSelectedCountyName(null);
                      }}
                      size="small"
                      sx={{ bgcolor: "#f8fafc" }}
                    >
                      <X size={18} />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* ── ROW 1: Demographics | Managed Systems ── */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {/* Demographics */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                        border: "1px solid #e2e8f0",
                        height: "100%",
                      }}
                    >
                      <SectionLabel>Demographics</SectionLabel>
                      <Grid container spacing={2}>
                        <Grid size={6}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#94a3b8",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              fontSize: "0.6rem",
                              display: "block",
                            }}
                          >
                            Population (2022)
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 800,
                              color: "#0f172a",
                              lineHeight: 1.1,
                            }}
                          >
                            {selectedData.population?.toLocaleString() || "—"}
                          </Typography>
                        </Grid>
                        {selectedData.areaSqMiles && (
                          <Grid size={6}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#94a3b8",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                fontSize: "0.6rem",
                                display: "block",
                              }}
                            >
                              Square Miles
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 800,
                                color: "#0f172a",
                                lineHeight: 1.1,
                              }}
                            >
                              {Number(
                                selectedData.areaSqMiles,
                              ).toLocaleString()}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </Grid>

                  {/* Managed Systems */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                        border: "1px solid #e2e8f0",
                        height: "100%",
                      }}
                    >
                      <SectionLabel>Managed Systems</SectionLabel>
                      <Stack spacing={0.75}>
                        {selectedData.systems.length > 0 ? (
                          selectedData.systems.map((s: ManagedSystemRow, i: number) => (
                            <Stack
                              key={i}
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 600,
                                  color: "#1e293b",
                                  fontSize: "0.8rem",
                                  flex: 1,
                                  pr: 1,
                                }}
                              >
                                {s.name || s.system_type || "—"}
                              </Typography>
                              <Chip
                                label={s.system_type || "Unknown"}
                                size="small"
                                sx={{
                                  fontSize: "0.6rem",
                                  fontWeight: 700,
                                  height: 20,
                                  bgcolor: s.system_type
                                    ?.toLowerCase()
                                    .includes("public defender")
                                    ? "rgba(25,118,210,0.1)"
                                    : s.system_type
                                          ?.toLowerCase()
                                          .includes("mac") ||
                                        s.system_type
                                          ?.toLowerCase()
                                          .includes("managed")
                                      ? "rgba(139,92,246,0.1)"
                                      : s.system_type
                                            ?.toLowerCase()
                                            .includes("regional")
                                        ? "rgba(14,165,233,0.1)"
                                        : "rgba(0,0,0,0.05)",
                                  color: s.system_type
                                    ?.toLowerCase()
                                    .includes("public defender")
                                    ? "#1976d2"
                                    : s.system_type
                                          ?.toLowerCase()
                                          .includes("mac") ||
                                        s.system_type
                                          ?.toLowerCase()
                                          .includes("managed")
                                      ? "#8b5cf6"
                                      : s.system_type
                                            ?.toLowerCase()
                                            .includes("regional")
                                        ? "#0ea5e9"
                                        : "#475569",
                                  border: "none",
                                }}
                              />
                            </Stack>
                          ))
                        ) : (
                          <Typography
                            variant="body2"
                            sx={{ color: "#94a3b8", fontStyle: "italic" }}
                          >
                            No managed systems data
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* ── ROW 2: Expenditures ── */}
                <SectionLabel>Expenditures (FY2023)</SectionLabel>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {/* Comparison bars */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                        border: "1px solid #e2e8f0",
                        height: "100%",
                      }}
                    >
                      {(() => {
                        const county = selectedData.perCapita || 0;
                        const state = stateAvgPerCapita || 0;
                        const national = NATIONAL_AVG_PER_CAPITA;
                        const maxVal =
                          Math.max(county, state, national) * 1.15 || 100;
                        return (
                          <Stack spacing={1.5}>
                            <SpendBar
                              label="National"
                              value={national}
                              max={maxVal}
                              color="#94a3b8"
                            />
                            <SpendBar
                              label="State Avg"
                              value={state}
                              max={maxVal}
                              color="#0ea5e9"
                            />
                            <SpendBar
                              label="County"
                              value={county}
                              max={maxVal}
                              color="#1976d2"
                            />
                          </Stack>
                        );
                      })()}
                    </Box>
                  </Grid>

                  {/* % vs national */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                        border: "1px solid #e2e8f0",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {(() => {
                        const county = selectedData.perCapita || 0;
                        const national = NATIONAL_AVG_PER_CAPITA;
                        const diff =
                          national > 0
                            ? ((county - national) / national) * 100
                            : 0;
                        const isBelow = diff < 0;
                        return (
                          <Stack spacing={1}>
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              {isBelow ? (
                                <TrendingDown size={22} color="#ef4444" />
                              ) : (
                                <TrendingUp size={22} color="#22c55e" />
                              )}
                              <Typography
                                variant="h3"
                                sx={{
                                  fontWeight: 900,
                                  color: isBelow ? "#ef4444" : "#22c55e",
                                  lineHeight: 1,
                                }}
                              >
                                {Math.abs(diff).toFixed(0)}%
                              </Typography>
                            </Stack>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                color: "#1e293b",
                                fontSize: "0.75rem",
                              }}
                            >
                              {isBelow ? "below" : "above"} national average per
                              capita
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#64748b", lineHeight: 1.5 }}
                            >
                              {isBelow
                                ? "Underfunding indigent defense increases wrongful convictions, costly appeals, and jail overcrowding — costs that fall back on taxpayers."
                                : "Above-average investment in indigent defense is associated with fewer wrongful convictions and lower long-term system costs."}
                            </Typography>
                          </Stack>
                        );
                      })()}
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* ── ROW 3: Court Activity ── */}
                <SectionLabel>Court Activity ({selectedYear})</SectionLabel>
                <Grid container spacing={1.5} sx={{ mb: 2 }}>
                  {/* Felony counts */}
                  <Grid size={{ xs: 6, md: 3 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "rgba(239,68,68,0.04)",
                        borderRadius: 2,
                        border: "1px solid rgba(239,68,68,0.15)",
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          color: "#ef4444",
                          fontWeight: 800,
                          fontSize: "0.55rem",
                          letterSpacing: "0.08em",
                          display: "block",
                          mb: 1,
                        }}
                      >
                        Felony
                      </Typography>
                      <Stack spacing={1}>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748b",
                              fontWeight: 700,
                              fontSize: "0.58rem",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Disposed
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, lineHeight: 1 }}
                          >
                            {selectedData.courtStats?.total_disposed_felonies?.toLocaleString() ??
                              "—"}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748b",
                              fontWeight: 700,
                              fontSize: "0.58rem",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Convictions
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            {selectedData.courtStats?.total_felony_convictions?.toLocaleString() ??
                              "—"}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748b",
                              fontWeight: 700,
                              fontSize: "0.58rem",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Dismissals
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            {selectedData.courtStats?.total_felony_dismissals?.toLocaleString() ??
                              "—"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  {/* Misdemeanor counts */}
                  <Grid size={{ xs: 6, md: 3 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "rgba(245,158,11,0.04)",
                        borderRadius: 2,
                        border: "1px solid rgba(245,158,11,0.15)",
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          color: "#d97706",
                          fontWeight: 800,
                          fontSize: "0.55rem",
                          letterSpacing: "0.08em",
                          display: "block",
                          mb: 1,
                        }}
                      >
                        Misdemeanor
                      </Typography>
                      <Stack spacing={1}>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748b",
                              fontWeight: 700,
                              fontSize: "0.58rem",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Disposed
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, lineHeight: 1 }}
                          >
                            {selectedData.courtStats?.total_disposed_misdemeanors?.toLocaleString() ??
                              "—"}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748b",
                              fontWeight: 700,
                              fontSize: "0.58rem",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Convictions
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            {selectedData.courtStats?.total_misdemeanor_convictions?.toLocaleString() ??
                              "—"}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748b",
                              fontWeight: 700,
                              fontSize: "0.58rem",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Dismissals
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            {selectedData.courtStats?.total_misdemeanor_dismissals?.toLocaleString() ??
                              "—"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  {/* Felony rates */}
                  <Grid size={{ xs: 6, md: 3 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "rgba(239,68,68,0.04)",
                        borderRadius: 2,
                        border: "1px solid rgba(239,68,68,0.15)",
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          color: "#ef4444",
                          fontWeight: 800,
                          fontSize: "0.55rem",
                          letterSpacing: "0.08em",
                          display: "block",
                          mb: 1,
                        }}
                      >
                        Felony Rates
                      </Typography>
                      <Stack spacing={1}>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748b",
                              fontWeight: 700,
                              fontSize: "0.58rem",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Conv. Rate
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 800 }}>
                            {pct(
                              selectedData.courtStats?.total_felony_convictions,
                              selectedData.courtStats?.total_disposed_felonies,
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748b",
                              fontWeight: 700,
                              fontSize: "0.58rem",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Dismissal Rate
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 800 }}>
                            {pct(
                              selectedData.courtStats?.total_felony_dismissals,
                              selectedData.courtStats?.total_disposed_felonies,
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Tooltip title="Cases paid / New cases filed" arrow>
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "#64748b",
                                  fontWeight: 700,
                                  fontSize: "0.58rem",
                                  textTransform: "uppercase",
                                  display: "block",
                                }}
                              >
                                Appt. Rate
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 800 }}
                              >
                                {selectedData.courtStats
                                  ?.felony_appointment_rate != null
                                  ? `${(selectedData.courtStats.felony_appointment_rate * 100).toFixed(1)}%`
                                  : pct(
                                      selectedData.courtStats
                                        ?.felony_cases_paid,
                                      selectedData.courtStats
                                        ?.felony_new_cases_filed,
                                    )}
                              </Typography>
                            </Box>
                          </Tooltip>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  {/* Misdemeanor rates */}
                  <Grid size={{ xs: 6, md: 3 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "rgba(245,158,11,0.04)",
                        borderRadius: 2,
                        border: "1px solid rgba(245,158,11,0.15)",
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          color: "#d97706",
                          fontWeight: 800,
                          fontSize: "0.55rem",
                          letterSpacing: "0.08em",
                          display: "block",
                          mb: 1,
                        }}
                      >
                        Misd. Rates
                      </Typography>
                      <Stack spacing={1}>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748b",
                              fontWeight: 700,
                              fontSize: "0.58rem",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Conv. Rate
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 800 }}>
                            {pct(
                              selectedData.courtStats
                                ?.total_misdemeanor_convictions,
                              selectedData.courtStats
                                ?.total_disposed_misdemeanors,
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748b",
                              fontWeight: 700,
                              fontSize: "0.58rem",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Dismissal Rate
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 800 }}>
                            {pct(
                              selectedData.courtStats
                                ?.total_misdemeanor_dismissals,
                              selectedData.courtStats
                                ?.total_disposed_misdemeanors,
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Tooltip title="Cases paid / New cases filed" arrow>
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "#64748b",
                                  fontWeight: 700,
                                  fontSize: "0.58rem",
                                  textTransform: "uppercase",
                                  display: "block",
                                }}
                              >
                                Appt. Rate
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 800 }}
                              >
                                {selectedData.courtStats
                                  ?.misdemeanor_appointment_rate != null
                                  ? `${(selectedData.courtStats.misdemeanor_appointment_rate * 100).toFixed(1)}%`
                                  : pct(
                                      selectedData.courtStats
                                        ?.misdemeanor_cases_paid,
                                      selectedData.courtStats
                                        ?.misdemeanor_new_cases_filed,
                                    )}
                              </Typography>
                            </Box>
                          </Tooltip>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* ── ROW 4: Attorney Caseloads ── */}
                <SectionLabel>Attorney Caseloads ({selectedYear})</SectionLabel>
                <Grid container spacing={2}>
                  {/* Table + standards */}
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                    >
                      {/* Attorney table */}
                      <Box
                        sx={{
                          flex: 1,
                          border: "1px solid #e2e8f0",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ bgcolor: "#f8fafc" }}>
                              <TableCell
                                sx={{
                                  fontWeight: 800,
                                  fontSize: "0.62rem",
                                  textTransform: "uppercase",
                                  color: "#64748b",
                                  py: 1,
                                  borderBottom: "1px solid #e2e8f0",
                                }}
                              >
                                Bar #
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{
                                  fontWeight: 800,
                                  fontSize: "0.62rem",
                                  textTransform: "uppercase",
                                  color: "#64748b",
                                  py: 1,
                                  borderBottom: "1px solid #e2e8f0",
                                }}
                              >
                                Cases Paid
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{
                                  fontWeight: 800,
                                  fontSize: "0.62rem",
                                  textTransform: "uppercase",
                                  color: "#64748b",
                                  py: 1,
                                  borderBottom: "1px solid #e2e8f0",
                                }}
                              >
                                3yr Avg
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedData.topAttorneys.length > 0 ? (
                              selectedData.topAttorneys.map(
                                (a: AttorneyRow, i: number) => {
                                  const cases = a.total_cases_reported || 0;
                                  const barNum = String(a.bar_number ?? "—");
                                  const avg =
                                    selectedData.threeYearAvgMap[barNum];
                                  const overLimit =
                                    cases > CASELOAD_STANDARDS.felony;
                                  return (
                                    <TableRow
                                      key={i}
                                      sx={{
                                        "&:last-child td": { border: 0 },
                                        bgcolor: overLimit
                                          ? "rgba(239,68,68,0.03)"
                                          : undefined,
                                      }}
                                    >
                                      <TableCell
                                        sx={{
                                          fontWeight: 700,
                                          fontSize: "0.75rem",
                                          py: 0.75,
                                          fontFamily: "monospace",
                                        }}
                                      >
                                        {barNum}
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        sx={{
                                          fontWeight: 700,
                                          fontSize: "0.75rem",
                                          py: 0.75,
                                          color: overLimit
                                            ? "#ef4444"
                                            : "#0f172a",
                                        }}
                                      >
                                        {cases.toLocaleString()}
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        sx={{
                                          fontWeight: 600,
                                          fontSize: "0.75rem",
                                          py: 0.75,
                                          color: "#64748b",
                                        }}
                                      >
                                        {avg != null
                                          ? avg.toLocaleString()
                                          : "—"}
                                      </TableCell>
                                    </TableRow>
                                  );
                                },
                              )
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={3}
                                  sx={{
                                    textAlign: "center",
                                    color: "#94a3b8",
                                    fontStyle: "italic",
                                    py: 2.5,
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  No attorney data for {selectedYear}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </Box>

                      {/* Standards box */}
                      <Box
                        sx={{
                          p: 1.5,
                          bgcolor: "rgba(99,102,241,0.05)",
                          border: "1px solid rgba(99,102,241,0.2)",
                          borderRadius: 2,
                          minWidth: 100,
                          flexShrink: 0,
                        }}
                      >
                        <Typography
                          variant="overline"
                          sx={{
                            color: "#6366f1",
                            fontWeight: 800,
                            fontSize: "0.55rem",
                            letterSpacing: "0.08em",
                            display: "block",
                            mb: 1,
                          }}
                        >
                          ABA Standards
                        </Typography>
                        <Stack spacing={1}>
                          <Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#64748b",
                                fontWeight: 700,
                                fontSize: "0.58rem",
                                textTransform: "uppercase",
                                display: "block",
                              }}
                            >
                              Felony
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 800, color: "#4338ca" }}
                            >
                              {CASELOAD_STANDARDS.felony}/yr
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#64748b",
                                fontWeight: 700,
                                fontSize: "0.58rem",
                                textTransform: "uppercase",
                                display: "block",
                              }}
                            >
                              Misd.
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 800, color: "#4338ca" }}
                            >
                              {CASELOAD_STANDARDS.misdemeanor}/yr
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                  </Grid>

                  {/* 150+ case count */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        p: 2.5,
                        bgcolor:
                          selectedData.highCaseloadCount > 0
                            ? "rgba(239,68,68,0.05)"
                            : "rgba(34,197,94,0.05)",
                        borderRadius: 2,
                        border: `1px solid ${selectedData.highCaseloadCount > 0 ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"}`,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 900,
                          color:
                            selectedData.highCaseloadCount > 0
                              ? "#ef4444"
                              : "#22c55e",
                          lineHeight: 1,
                        }}
                      >
                        {selectedData.highCaseloadCount}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "#1e293b",
                          mt: 0.75,
                          fontSize: "0.8rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {selectedData.highCaseloadCount === 1
                          ? "attorney"
                          : "attorneys"}{" "}
                        disposed
                        <br />
                        150+ cases in {selectedYear}
                      </Typography>
                      {selectedData.topAttorneys.length === 0 && (
                        <Typography
                          variant="caption"
                          sx={{ color: "#94a3b8", mt: 1, fontSize: "0.65rem" }}
                        >
                          (attorney data unavailable)
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          ) : (
            <Box
              sx={{
                py: 8,
                border: "2px dashed #e2e8f0",
                borderRadius: 4,
                textAlign: "center",
                bgcolor: "#fcfcfc",
              }}
            >
              <Typography sx={{ color: "#94a3b8", fontWeight: 500 }}>
                Select a county on the map to view data
              </Typography>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
