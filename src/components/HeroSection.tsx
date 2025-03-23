import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  buttonText?: string;
  buttonHref?: string;
  containerSize?: "xs" | "sm" | "md" | "lg" | "xl";
  imageSrc?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  buttonText,
  buttonHref,
  containerSize = "md",
  imageSrc = "/images/leaves-bg.jpg", // Default image
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        color: "common.white",
        padding: "4rem 0",
        textAlign: "center",
        borderRadius: 0,
        overflow: "hidden",
        isolation: "isolate",
        marginBottom: "2rem",
      }}
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt="Background"
        fill
        priority
        style={{
          zIndex: -1,
          objectFit: "cover",
          objectPosition: "center",
        }}
        sizes="100vw"
      />

      {/* Dark overlay for better text readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: -1,
        }}
      />

      <Container maxWidth={containerSize}>
        <Box
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {title}
          </Typography>
          {buttonText && buttonHref && (
            <Link href={buttonHref} passHref>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<span>→</span>}
                size="large"
                sx={{
                  mt: 3,
                  padding: "0.75rem 1.5rem",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                  },
                }}
              >
                {buttonText}
              </Button>
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
