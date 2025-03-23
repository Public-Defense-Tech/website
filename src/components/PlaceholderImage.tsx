"use client";

import React from "react";
import { Box } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface PlaceholderImageProps {
  width?: string | number;
  height?: string | number;
  fontSize?: string;
  opacity?: number;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width = "100%",
  height = "200px",
  fontSize = "3rem",
  opacity = 0.2,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey.100",
        borderRadius: 1,
        width,
        height,
      }}
    >
      <ImageIcon sx={{ fontSize, opacity }} />
    </Box>
  );
};

export default PlaceholderImage;
