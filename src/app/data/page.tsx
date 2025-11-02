"use client";

import React from "react";
import Link from "@/components/Link";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";
import HeroImageSection from "@/components/HeroImageSection";
import AttorneyCaseloadCards from "@/components/AttorneyCaseloadCards";

export default function Data() {
  return (
    <main>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* Hero Section */}
        <HeroImageSection
          title="Texas Defense Data"
          subtitle="Explore public defense data to understand disparities and drive reform"
          imageSrc={{
            mobile: "/images/leaves-tall.jpg",
            desktop: "/images/leaves-wide.jpg",
          }}
          imageAlt="Natural leaves background"
        />

        {/* Introduction */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Data Overview
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto" }}
          >
            Our data provides insights into various aspects of the public
            defense system in Texas, including caseloads, outcomes, attorney
            assignments, and more. Explore the visualizations below to
            understand the challenges faced by public defenders and their
            clients.
          </Typography>
        </Box>

        {/* Attorney Workload - Year by Year Cards */}
        <Box sx={{ mb: 8 }}>
          <AttorneyCaseloadCards />
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Future Visualizations Section - Placeholder Structure */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Attorney-Level Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Detailed case assignments and dispositions by attorney. (Coming
            soon)
          </Typography>

          {/* Placeholder for future table/card visualizations */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "grey.50",
              borderRadius: 2,
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Attorney case assignment tables will appear here
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Attorney Type Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Cases by attorney type (Public Defender, Appointed, Retained).
            (Coming soon)
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "grey.50",
              borderRadius: 2,
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Attorney type analysis cards will appear here
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Case Dispositions
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Dismissal rates and case outcomes by attorney. (Coming soon)
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "grey.50",
              borderRadius: 2,
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Disposition analysis tables will appear here
            </Typography>
          </Paper>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Methodology Link */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="body2" color="text.secondary">
            For information about our data collection and validation processes,{" "}
            <Link href="/about#methodology">
              learn more about our methodology
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </main>
  );
}
