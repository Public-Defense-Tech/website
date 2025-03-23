import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Texas Defense Data",
  subtitle = "The only site for publicly available indigent defense data.",
  primaryButtonText = "What is Texas Defense Data?",
  primaryButtonHref = "/about",
  secondaryButtonText = "Impacts of Public Defense Data",
  secondaryButtonHref = "/impact",
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
            "linear-gradient(to bottom, rgb(64 123 70 / 18%) 0%, rgba(0, 0, 0, 0.3) 100%);",
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box
          sx={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 1rem",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: 2,
              color: "#E2F0EA",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h2"
            component="p"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontWeight: 400,
              marginBottom: 4,
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            {subtitle}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              component={Link}
              href={primaryButtonHref}
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "rgba(255,255,255,0.5)",
                px: 3,
                py: 1,
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {primaryButtonText}
            </Button>
            <Button
              component={Link}
              href={secondaryButtonHref}
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "rgba(255,255,255,0.5)",
                px: 3,
                py: 1,
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {secondaryButtonText}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
