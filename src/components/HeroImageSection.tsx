"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Image from "next/image";

interface HeroImageSectionProps {
  title: string;
  subtitle: string;
  imageSrc: {
    mobile: string;
    desktop: string;
  };
  imageAlt: string;
}

const HeroImageSection: React.FC<HeroImageSectionProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "300px", md: "400px" },
        borderRadius: "8px",
        overflow: "hidden",
        mb: "4rem",
      }}
    >
      {/* Desktop Image */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Image
          src={imageSrc.desktop}
          alt={imageAlt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(min-width: 900px) 1200px, 100vw"
          priority
        />
      </Box>

      {/* Mobile Image */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Image
          src={imageSrc.mobile}
          alt={imageAlt}
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
        />
      </Box>

      {/* Content Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay for text readability
          zIndex: 1,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="p">
              {subtitle}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroImageSection;
