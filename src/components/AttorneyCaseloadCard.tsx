"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface AttorneyCaseloadCardProps {
  year: number;
  attorneyName: string;
  caseload: number;
}

/**
 * Reusable card component displaying the highest caseload attorney for a given year.
 * Designed for quick scanning in a grid layout.
 */
const AttorneyCaseloadCard: React.FC<AttorneyCaseloadCardProps> = ({
  year,
  attorneyName,
  caseload,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ mb: 1, fontWeight: 600 }}
      >
        {year}
      </Typography>

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h3"
          component="div"
          color="primary"
          sx={{
            fontWeight: "bold",
            mb: 1,
            fontSize: { xs: "2rem", sm: "2.5rem" },
          }}
        >
          {caseload.toLocaleString()}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          cases
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: "auto",
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {attorneyName}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AttorneyCaseloadCard;
