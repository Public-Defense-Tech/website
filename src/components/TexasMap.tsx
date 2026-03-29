"use client";

import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Box, Paper, Typography, IconButton, Grid, 
  CircularProgress, Chip, Stack, Divider 
} from "@mui/material";
import { X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const TEXAS_TOPO_JSON = "/texas-counties.json";

const getCountyName = (properties: any): string => {
  return (properties.NAME || properties.name || properties.CNTY_NM || properties.COUNTY || "").toString().trim();
};

const cleanKey = (name: string) => name.toUpperCase().replace(/\s*COUNTY$/i, "").trim();

const getCountyColor = (systems: any[]) => {
  if (!systems || systems.length === 0) return "#f8fafc";
  if (systems.length > 1) return "#6366f1"; 
  const rawType = systems[0];
  if (!rawType || typeof rawType !== 'string') return "#f8fafc";
  const type = rawType.toLowerCase();
  if (type.includes("regional")) return "#0ea5e9";
  if (type.includes("public defender")) return "#1976d2";
  if (type.includes("managed assigned counsel") || type.includes("mac")) return "#8b5cf6";
  return "#94a3b8";
};

export default function InteractiveTexasMap() {
  const [selectedData, setSelectedData] = useState<any>(null);
  const [systemMap, setSystemMap] = useState<Record<string, string[]> | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    async function initMap() {
      const { data } = await supabase.from("counties_managed_systems").select("county, system_type");
      if (data) {
        const mapping: Record<string, string[]> = {};
        data.forEach(row => {
          const key = cleanKey(row.county);
          if (!mapping[key]) mapping[key] = [];
          if (row.system_type) mapping[key].push(row.system_type);
        });
        setSystemMap(mapping);
      } else {
        setSystemMap({});
      }
    }
    initMap();
  }, [supabase]);

  const handleCountyClick = async (geo: any) => {
    const rawName = getCountyName(geo.properties);
    if (!rawName) return;
    setIsActionLoading(true);
    const searchName = rawName.replace(/\s*County$/i, "").trim();

    try {
      const [systemsRes, spendingRes] = await Promise.all([
        supabase.from("counties_managed_systems").select("population, system_type").ilike("county", `%${searchName}%`),
        supabase.from("county_per_capita_spending").select("net_per_capita_spending, total_net_expenditure").ilike("County", `%${searchName}%`).maybeSingle()
      ]);

      const systemList = systemsRes.data ? Array.from(new Set(systemsRes.data.map(s => s.system_type).filter(Boolean))) : [];

      setSelectedData({
        county_name: `${searchName} County`,
        population: systemsRes.data?.[0]?.population || 0,
        systemTypes: systemList,
        perCapita: spendingRes.data?.net_per_capita_spending || 0,
        totalExpenditure: spendingRes.data?.total_net_expenditure || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      
      {/* LEGEND */}
      <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ px: 1 }}>
        {[
          { label: "Public Defender", color: "#1976d2" },
          { label: "Regional PD", color: "#0ea5e9" },
          { label: "Managed Assigned Counsel", color: "#8b5cf6" },
          { label: "Multiple Systems", color: "#6366f1" },
          { label: "Traditional", color: "#f8fafc" }
        ].map((item) => (
          <Stack key={item.label} direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: item.color, border: '1px solid #cbd5e1' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', fontSize: '0.65rem' }}>{item.label}</Typography>
          </Stack>
        ))}
      </Stack>

      {/* MAP */}
      <Paper elevation={0} sx={{ position: 'relative', borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#ffffff', overflow: 'hidden' }}>
        {!systemMap ? (
          <Box sx={{ height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>
        ) : (
          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 2400, center: [-99.5, 31.2] }} width={800} height={600} style={{ width: "100%", height: "auto" }}>
            <Geographies geography={TEXAS_TOPO_JSON}>
              {({ geographies }) => 
                geographies.map((geo) => {
                  const name = getCountyName(geo.properties);
                  const key = cleanKey(name);
                  const systems = systemMap[key] || [];
                  const fillColor = getCountyColor(systems);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleCountyClick(geo)}
                      style={{
                        default: { fill: fillColor, stroke: "#cbd5e1", strokeWidth: 0.5, outline: "none" },
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
        {isActionLoading && <CircularProgress size={24} sx={{ position: 'absolute', top: 20, right: 20 }} />}
      </Paper>

      {/* INFO CARD */}
      <Box sx={{ minHeight: 220 }}>
        <AnimatePresence mode="wait">
          {selectedData ? (
            <motion.div key={selectedData.county_name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>{selectedData.county_name}</Typography>
                  <IconButton onClick={() => setSelectedData(null)} size="small" sx={{ bgcolor: '#f8fafc' }}><X size={18} /></IconButton>
                </Stack>
                
                {/* DEMOGRAPHICS ROW */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ p: 2.5, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', display: 'block', mb: 0.5 }}>2022 POPULATION</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedData.population?.toLocaleString() || 'N/A'}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ p: 2.5, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9', height: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', display: 'block', mb: 1 }}>DELIVERY SYSTEMS (OCT. 2025)</Typography>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                        {selectedData.systemTypes.length > 0 ? (
                          selectedData.systemTypes.map((t: any, i: number) => (
                            <Chip key={i} label={t} size="small" sx={{ fontSize: '0.65rem', fontWeight: 700, bgcolor: 'white', border: '1px solid #e2e8f0' }} />
                          ))
                        ) : <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Traditional / Assigned Counsel</Typography>}
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>

                {/* FINANCIAL ROW (Separated container to force new line) */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ p: 2.5, bgcolor: 'rgba(34, 197, 94, 0.04)', borderRadius: 3, border: '1px solid rgba(34, 197, 94, 0.1)' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#166534', display: 'block', mb: 0.5 }}>FY2023 TOTAL NET EXPENDITURE</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#14532d' }}>
                        ${new Intl.NumberFormat('en-US').format(selectedData.totalExpenditure || 0)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ p: 2.5, bgcolor: 'rgba(34, 197, 94, 0.04)', borderRadius: 3, border: '1px solid rgba(34, 197, 94, 0.1)' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#166534', display: 'block', mb: 0.5 }}>FY2023 NET PER CAPITA</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#14532d' }}>
                        ${selectedData.perCapita?.toFixed(2) || '0.00'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          ) : (
            <Box sx={{ py: 8, border: '2px dashed #e2e8f0', borderRadius: 4, textAlign: 'center', bgcolor: '#fcfcfc' }}>
              <Typography sx={{ color: '#94a3b8', fontWeight: 500 }}>Select a county on the map to view indigent defense data</Typography>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}