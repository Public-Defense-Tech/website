"use client";

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Box, Paper, Typography, IconButton, Grid, 
  CircularProgress, Chip, Stack, Divider, Card, CardContent 
} from "@mui/material";
import { X, Scale, FileCheck, FileX, Calendar, DollarSign, Users } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// --- HELPERS ---
const cleanKey = (name: string) => name.toUpperCase().replace(/\s*COUNTY$/i, "").trim();

const getCountyColor = (systems: string[] = []) => {
  if (!systems || systems.length === 0) return "#f8fafc";
  if (systems.length > 1) return "#6366f1"; 
  const type = systems[0]?.toLowerCase() || "";
  if (type.includes("regional")) return "#0ea5e9";
  if (type.includes("public defender")) return "#1976d2";
  if (type.includes("managed assigned counsel") || type.includes("mac")) return "#8b5cf6";
  return "#94a3b8";
};

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <Card variant="outlined" sx={{ borderRadius: 3, height: '100%', bgcolor: '#ffffff' }}>
    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: 'action.hover', color: `${color}.main`, display: 'flex' }}>
          <Icon size={18} />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', textTransform: 'uppercase', fontSize: '0.55rem', lineHeight: 1 }}>
            {title}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
            {value?.toLocaleString() || '0'}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default function InteractiveTexasDashboard() {
  const [geoData, setGeoData] = useState<any>(null);
  const [systemMap, setSystemMap] = useState<Record<string, string[]> | null>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const selectedYear = 2024;

  const supabase = createClient();

  useEffect(() => {
    // Fetch Map Geometry and System Data
    async function initData() {
      const [geoRes, systemsRes] = await Promise.all([
        fetch("/texas-counties.json").then(res => res.json()),
        supabase.from("counties_managed_systems").select("county, system_type")
      ]);

      if (systemsRes.data) {
        const mapping: Record<string, string[]> = {};
        systemsRes.data.forEach(row => {
          const key = cleanKey(row.county);
          if (!mapping[key]) mapping[key] = [];
          if (row.system_type) mapping[key].push(row.system_type);
        });
        setSystemMap(mapping);
      }
      setGeoData(geoRes);
    }
    initData();
  }, []);

  const onCountyClick = async (feature: any) => {
    const rawName = feature.properties.NAME || feature.properties.name || "";
    const searchName = rawName.replace(/\s*County$/i, "").trim();
    setIsActionLoading(true);

    try {
      const [systemsRes, spendingRes, courtIdRes] = await Promise.all([
        supabase.from("counties_managed_systems").select("population, system_type").ilike("county", `%${searchName}%`),
        supabase.from("county_per_capita_spending").select("net_per_capita_spending, total_net_expenditure").ilike("County", `%${searchName}%`).maybeSingle(),
        supabase.from("counties").select("id").ilike("name", searchName).maybeSingle()
      ]);

      let courtActivity = null;
      if (courtIdRes.data?.id) {
        const { data } = await supabase
          .from('county_year_disposition_summary')
          .select('*')
          .eq('county_id', courtIdRes.data.id)
          .eq('year', selectedYear)
          .maybeSingle();
        courtActivity = data;
      }

      setSelectedData({
        county_name: `${searchName} County`,
        population: systemsRes.data?.[0]?.population || 0,
        systemTypes: Array.from(new Set(systemsRes.data?.map(s => s.system_type).filter(Boolean) || [])),
        perCapita: spendingRes.data?.net_per_capita_spending || 0,
        totalExpenditure: spendingRes.data?.total_net_expenditure || 0,
        courtStats: courtActivity
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const geojsonStyle = (feature: any) => {
    const key = cleanKey(feature.properties.NAME || feature.properties.name || "");
    const systems = systemMap ? systemMap[key] : [];
    return {
      fillColor: getCountyColor(systems),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  };

  if (!geoData || !systemMap) return <CircularProgress sx={{ m: 'auto' }} />;

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* LEGEND (Simplified) */}
      <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ px: 1 }}>
        {[{ label: "Public Defender", color: "#1976d2" }, { label: "Regional PD", color: "#0ea5e9" }, { label: "MAC", color: "#8b5cf6" }].map((item) => (
          <Stack key={item.label} direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: item.color }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>{item.label}</Typography>
          </Stack>
        ))}
      </Stack>

      {/* MAP CONTAINER */}
      <Paper sx={{ height: 500, width: '100%', borderRadius: 4, overflow: 'hidden', position: 'relative', border: '1px solid #e2e8f0' }}>
        <MapContainer 
          center={[31.9686, -99.9018]} 
          zoom={6} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON 
            data={geoData} 
            style={geojsonStyle}
            eventHandlers={{
              click: (e) => onCountyClick(e.propagatedFrom.feature)
            }}
          />
        </MapContainer>
        {isActionLoading && <CircularProgress size={24} sx={{ position: 'absolute', top: 20, right: 20, zIndex: 1000 }} />}
      </Paper>

      {/* DATA DISPLAY */}
      {selectedData && (
        <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0' }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>{selectedData.county_name}</Typography>
            <IconButton onClick={() => setSelectedData(null)}><X size={18} /></IconButton>
          </Stack>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 3 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b' }}>POPULATION</Typography>
                  <Typography variant="h6">{selectedData.population?.toLocaleString()}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b' }}>SYSTEMS</Typography>
                  <Stack direction="row" spacing={0.5} mt={1}>
                    {selectedData.systemTypes.map((t: string) => <Chip key={t} label={t} size="small" />)}
                  </Stack>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'rgba(34, 197, 94, 0.05)', borderRadius: 3 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#166534' }}>TOTAL EXPENDITURE</Typography>
                  <Typography variant="h6" color="#14532d">${selectedData.totalExpenditure?.toLocaleString()}</Typography>
                  <Typography variant="caption" display="block">Per Capita: ${selectedData.perCapita?.toFixed(2)}</Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ p: 2, bgcolor: '#f1f5f9', borderRadius: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 800 }}>Court Activity ({selectedYear})</Typography>
                <Grid container spacing={1}>
                  {/* Felony Row */}
                  <Grid item xs={4}><StatCard title="Felony Disposed" value={selectedData.courtStats?.total_disposed_felonies} icon={Scale} color="primary" /></Grid>
                  <Grid item xs={4}><StatCard title="Felony Convictions" value={selectedData.courtStats?.total_felony_convictions} icon={FileX} color="error" /></Grid>
                  <Grid item xs={4}><StatCard title="Felony Dismissals" value={selectedData.courtStats?.total_felony_dismissals} icon={FileCheck} color="success" /></Grid>
                  {/* Misdemeanor Row */}
                  <Grid item xs={4}><StatCard title="Misd. Disposed" value={selectedData.courtStats?.total_disposed_misdemeanors} icon={Scale} color="primary" /></Grid>
                  <Grid item xs={4}><StatCard title="Misd. Convictions" value={selectedData.courtStats?.total_misdemeanor_convictions} icon={FileX} color="error" /></Grid>
                  <Grid item xs={4}><StatCard title="Misd. Dismissals" value={selectedData.courtStats?.total_misdemeanor_dismissals} icon={FileCheck} color="success" /></Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}