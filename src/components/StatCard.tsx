"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface StatCardProps {
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, description }) => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "common.white",
        p: 4,
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h1"
        component="div"
        sx={{
          fontSize: "8rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {value}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        {description}
      </Typography>
    </Box>
  );
};

export default StatCard;
