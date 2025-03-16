"use client";

import React from "react";
import { AppBar, Toolbar, Container, Stack } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
        boxShadow: "none",
        padding: "0.5rem 0",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link
            href="/"
            style={{
              fontWeight: 600,
              fontSize: "1.25rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            Texas Defense Data
          </Link>

          <Stack direction="row" spacing={3}>
            <Link
              href="/about"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              About
            </Link>
            <Link
              href="/data"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              Data
            </Link>
            <Link
              href="/resources"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              Resources
            </Link>
            <Link
              href="/contact"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              Contact
            </Link>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
