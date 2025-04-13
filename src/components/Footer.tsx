"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "#E2F0EA",
        padding: "24px 0",
        marginTop: 0,
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Link href="/" passHref>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
              >
                Texas Defense Data
              </Typography>
            </Link>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                fontSize: "0.85rem",
                mb: 0.5,
              }}
            >
              Making indigent defense data accessible to all.
            </Typography>
          </Grid>

          {/* Links Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/about" passHref>
                <MuiLink
                  sx={{
                    opacity: 0.9,
                    textDecoration: "none",
                    display: "block",
                    fontSize: "0.9rem",
                    transition: "opacity 0.2s ease",
                    "&:hover": {
                      opacity: 1,
                      textDecoration: "underline",
                    },
                  }}
                >
                  About Us
                </MuiLink>
              </Link>
              <Link href="/data" passHref>
                <MuiLink
                  sx={{
                    opacity: 0.9,
                    textDecoration: "none",
                    display: "block",
                    fontSize: "0.9rem",
                    transition: "opacity 0.2s ease",
                    "&:hover": {
                      opacity: 1,
                      textDecoration: "underline",
                    },
                  }}
                >
                  Data
                </MuiLink>
              </Link>
              <Link href="/contact" passHref>
                <MuiLink
                  sx={{
                    opacity: 0.9,
                    textDecoration: "none",
                    display: "block",
                    fontSize: "0.9rem",
                    transition: "opacity 0.2s ease",
                    "&:hover": {
                      opacity: 1,
                      textDecoration: "underline",
                    },
                  }}
                >
                  Contact
                </MuiLink>
              </Link>
            </Stack>
          </Grid>

          {/* Contact Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                textAlign: { md: "right" },
                display: "flex",
                flexDirection: "column",
                justifyContent: { md: "flex-end" },
                paddingTop: { md: "1rem" },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "common.white",
                  opacity: 0.9,
                  fontSize: "0.85rem",
                  mb: 0.5,
                }}
              >
                © {new Date().getFullYear()} Texas Defense Data
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "common.white",
                  opacity: 0.9,
                  fontSize: "0.85rem",
                  mb: 0.5,
                }}
              >
                All rights reserved.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
