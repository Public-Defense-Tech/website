"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import AttorneyCaseloadCard from "./AttorneyCaseloadCard";

interface YearlyCaseload {
  year: number;
  attorneyName: string;
  caseload: number;
}

/**
 * Component displaying attorney caseload cards for years 2020-2025.
 * Shows the highest caseload attorney for each year in a responsive grid.
 */
const AttorneyCaseloadCards: React.FC = () => {
  const [data, setData] = useState<YearlyCaseload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/attorney-caseload-by-year");
        if (!response.ok) {
          throw new Error("Failed to fetch attorney caseload data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (data.length === 0) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No data available
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h3" gutterBottom align="center">
        Highest Attorney Caseload by Year
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {data.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.year}>
            <AttorneyCaseloadCard
              year={item.year}
              attorneyName={item.attorneyName}
              caseload={item.caseload}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AttorneyCaseloadCards;
