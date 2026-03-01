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
              fontWeight: 500,
              fontSize: "1.25rem",
              color: "#96BBDE",
              textDecoration: "none",
            }}
          >
            Texas Defense Data
          </Link>

          <Stack direction="row" spacing={4}>
            <Link
              href="/insights"
              style={{
                color: "#96BBDE",
                textDecoration: "none",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              Insights
            </Link>
            <Link
              href="/data"
              style={{
                color: "#96BBDE",
                textDecoration: "none",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              State Data
            </Link>
            <Link
              href="/projects"
              style={{
                color: "#96BBDE",
                textDecoration: "none",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              Projects
            </Link>
            <Link
              href="/about"
              style={{
                color: "#96BBDE",
                textDecoration: "none",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              About
            </Link>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
