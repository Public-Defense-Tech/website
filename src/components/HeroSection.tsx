import React from "react";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  leftText?: string;
  rightText?: string;
  ctaText?: string;
  ctaHref?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Texas Defense Data",
  subtitle = "The only site for publicly available indigent defense data.",
  leftText = "What is Texas Defense Data?",
  rightText = "Impacts of Public Defense Data",
  ctaText = "Explore the Data",
  ctaHref = "/data",
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        color: "common.white",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Background image */}
      <Image
        src="/images/prisoner.jpg"
        alt="Prison bars background"
        fill
        priority
        style={{
          zIndex: -2,
          objectFit: "cover",
          objectPosition: "center",
        }}
        sizes="100vw"
      />

      {/* Dark gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box
          sx={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 1rem",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "3rem", md: "5rem" },
              fontWeight: 400,
              color: "#E2F0EA",
              textAlign: "center",
              fontFamily: "var(--font-geist-sans)",
              letterSpacing: "-0.02em",
              mb: 2,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "center",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {subtitle}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 3, md: 4 },
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.75rem" },
                fontWeight: 400,
                color: "#E2F0EA",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              {leftText}
            </Typography>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: "rgba(255, 255, 255, 0.5)",
                height: "2rem",
                my: "auto",
              }}
            />

            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.75rem" },
                fontWeight: 400,
                color: "#E2F0EA",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              {rightText}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              component={Link}
              href={ctaHref}
              variant="contained"
              sx={{
                backgroundColor: "#C45D3E",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1.125rem",
                textTransform: "none",
                borderRadius: "2rem",
                "&:hover": {
                  backgroundColor: "#B54D2E",
                },
              }}
            >
              → {ctaText}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
