"use client";

import React, { useState, useEffect, useMemo } from "react";
import type { FeatureCollection } from "geojson";
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
  Card,
  CardContent,
} from "@mui/material";
import {
  X,
  Scale,
  FileCheck,
  FileX,
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const TEXAS_TOPO_JSON = "/texas-counties.json";

// --- HELPERS ---
const getCountyName = (properties: any): string => {
  return (
    properties.NAME ||
    properties.name ||
    properties.CNTY_NM ||
    properties.COUNTY ||
    ""
  )
    .toString()
    .trim();
};

const cleanKey = (name: string) =>
  name
    .toUpperCase()
    .replace(/\s*COUNTY$/i, "")
    .trim();

const getCountyColor = (systems: any[]) => {
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

// --- SUB-COMPONENT: STAT CARD ---
const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <Card
    variant="outlined"
    sx={{ borderRadius: 3, height: "100%", bgcolor: "#ffffff" }}
  >
    <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            p: 0.8,
            borderRadius: 2,
            bgcolor: "action.hover",
            color: `${color}.main`,
            display: "flex",
          }}
        >
          <Icon size={18} />
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              color: "text.secondary",
              display: "block",
              textTransform: "uppercase",
              fontSize: "0.55rem",
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 800, lineHeight: 1.2 }}
          >
            {value?.toLocaleString() || "0"}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default function InteractiveTexasDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [systemMap, setSystemMap] = useState<Record<string, string[]> | null>(null);
  const [texasGeo, setTexasGeo] = useState<FeatureCollection | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    setIsMounted(true);
    let cancelled = false;

    async function initMap() {
      setGeoError(null);
      try {
        const [systemsOutcome, geoOutcome] = await Promise.allSettled([
          supabase.from("counties_managed_systems").select("county, system_type"),
          fetch(TEXAS_TOPO_JSON),
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
      } catch (err) {
        if (!cancelled) setGeoError("An unexpected error occurred.");
      }
    }

    initMap();
    return () => { cancelled = true; };
  }, [supabase]);

  const handleCountyClick = async (geo: any) => {
    const rawName = getCountyName(geo.properties);
    if (!rawName) return;
    setIsActionLoading(true);
    const searchName = rawName.replace(/\s*County$/i, "").trim();

    try {
      const [systemsRes, spendingRes, courtIdRes] = await Promise.all([
        supabase.from("counties_managed_systems").select("population, system_type").ilike("county", `%${searchName}%`),
        supabase.from("county_per_capita_spending").select("net_per_capita_spending, total_net_expenditure").ilike("County", `%${searchName}%`).maybeSingle(),
        supabase.from("counties").select("id").ilike("name", searchName).maybeSingle(),
      ]);

      let courtActivity = null;
      if (courtIdRes.data?.id) {
        const { data } = await supabase.from("county_year_disposition_summary").select("*").eq("county_id", courtIdRes.data.id).eq("year", selectedYear).maybeSingle();
        courtActivity = data;
      }

      setSelectedData({
        county_name: `${searchName} County`,
        population: systemsRes.data?.[0]?.population || 0,
        systemTypes: Array.from(new Set(systemsRes.data?.map((s) => s.system_type).filter(Boolean) || [])),
        perCapita: spendingRes.data?.net_per_capita_spending || 0,
        totalExpenditure: spendingRes.data?.total_net_expenditure || 0,
        courtStats: courtActivity,
      });
    } catch (err) {
      console.error("Selection error:", err);
    } finally {
      setIsActionLoading(false);
    }
  };

  if (!isMounted) {
    return <Box sx={{ height: 600, display: "flex", alignItems: "center", justifyContent: "center" }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
      {/* LEGEND */}
      <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ px: 1 }}>
        {[
          { label: "Public Defender", color: "#1976d2" },
          { label: "Regional PD", color: "#0ea5e9" },
          { label: "Managed Assigned Counsel", color: "#8b5cf6" },
          { label: "Multiple Systems", color: "#6366f1" },
          { label: "Traditional", color: "#f8fafc" },
        ].map((item) => (
          <Stack key={item.label} direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: item.color, border: "1px solid #cbd5e1" }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#475569", fontSize: "0.65rem" }}>{item.label}</Typography>
          </Stack>
        ))}
      </Stack>

      {/* MAP */}
      <Paper elevation={0} sx={{ position: "relative", borderRadius: 4, border: "1px solid #e2e8f0", bgcolor: "#ffffff", overflow: "hidden" }}>
        {geoError ? (
          <Box sx={{ height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography color="error">{geoError}</Typography>
          </Box>
        ) : !systemMap || !texasGeo ? (
          <Box sx={{ height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}><CircularProgress /></Box>
        ) : (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 2400, center: [-99.5, 31.2] } as any}
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
                  const isSelected = selectedData?.county_name?.includes(name.replace(/\s*County$/i, "").trim());
                  return (
                    <Geography
                      key={(geo as any).rsmKey || index}
                      geography={geo}
                      onClick={() => handleCountyClick(geo)}
                      style={{
                        default: { fill: isSelected ? "#0f172a" : getCountyColor(systems), stroke: "#cbd5e1", strokeWidth: 0.5, outline: "none" },
                        hover: { fill: "#0f172a", stroke: "#0f172a", strokeWidth: 1, outline: "none", cursor: "pointer" },
                        pressed: { fill: "#1e40af", outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        )}
        {isActionLoading && <CircularProgress size={24} sx={{ position: "absolute", top: 20, right: 20 }} />}
      </Paper>

      {/* INFO CARD & COURT STATS */}
      <Box sx={{ minHeight: 220 }}>
        <AnimatePresence mode="wait">
          {selectedData ? (
            <motion.div key={selectedData.county_name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a" }}>{selectedData.county_name}</Typography>
                  <IconButton onClick={() => setSelectedData(null)} size="small" sx={{ bgcolor: "#f8fafc" }}><X size={18} /></IconButton>
                </Stack>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1.5}>
                      <Box sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 3, border: "1px solid #f1f5f9" }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748b", display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}><Users size={14} /> 2022 POPULATION</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedData.population?.toLocaleString() || "N/A"}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748b", display: "block", mt: 1.5, mb: 1 }}>DELIVERY SYSTEMS</Typography>
                        <Stack direction="row" spacing={0.5} flexWrap="wrap">
                          {selectedData.systemTypes.map((t: any, i: number) => <Chip key={i} label={t} size="small" sx={{ fontSize: "0.65rem", fontWeight: 700, bgcolor: "white", border: "1px solid #e2e8f0" }} />)}
                        </Stack>
                      </Box>
                      <Box sx={{ p: 2, bgcolor: "rgba(34, 197, 94, 0.04)", borderRadius: 3, border: "1px solid rgba(34, 197, 94, 0.1)" }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: "#166534", display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}><DollarSign size={14} /> FY2023 TOTAL EXPENDITURE</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#14532d" }}>${new Intl.NumberFormat("en-US").format(selectedData.totalExpenditure || 0)}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: "#166534", display: "block", mt: 1.5 }}>NET PER CAPITA</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#14532d" }}>${selectedData.perCapita?.toFixed(2) || "0.00"}</Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ p: 2, height: "100%", bgcolor: "#f1f5f9", borderRadius: 3, border: "1px solid #e2e8f0" }}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                        <Calendar size={16} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Court Activity ({selectedYear})</Typography>
                      </Stack>
                      <Stack spacing={1.5}>
                        <Grid container spacing={1}>
                          <Grid size={4}><StatCard title="Felony Disposed" value={selectedData.courtStats?.total_disposed_felonies} icon={Scale} color="primary" /></Grid>
                          <Grid size={4}><StatCard title="Felony Convictions" value={selectedData.courtStats?.total_felony_convictions} icon={FileX} color="error" /></Grid>
                          <Grid size={4}><StatCard title="Felony Dismissals" value={selectedData.courtStats?.total_felony_dismissals} icon={FileCheck} color="success" /></Grid>
                        </Grid>
                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Grid container spacing={1}>
                          <Grid size={4}><StatCard title="Misd. Disposed" value={selectedData.courtStats?.total_disposed_misdemeanors} icon={Scale} color="primary" /></Grid>
                          <Grid size={4}><StatCard title="Misd. Convictions" value={selectedData.courtStats?.total_misdemeanor_convictions} icon={FileX} color="error" /></Grid>
                          <Grid size={4}><StatCard title="Misd. Dismissals" value={selectedData.courtStats?.total_misdemeanor_dismissals} icon={FileCheck} color="success" /></Grid>
                        </Grid>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          ) : (
            <Box sx={{ py: 8, border: "2px dashed #e2e8f0", borderRadius: 4, textAlign: "center", bgcolor: "#fcfcfc" }}>
              <Typography sx={{ color: "#94a3b8", fontWeight: 500 }}>Select a county on the map to view data</Typography>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}