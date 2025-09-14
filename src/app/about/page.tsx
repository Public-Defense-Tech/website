"use client";

import { Container, Typography, Box, Grid, Paper } from "@mui/material";

export default function About() {
  return (
    <main>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            backgroundImage: "url('/images/leaves-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            py: "6rem",
            textAlign: "center",
            mb: "4rem",
            borderRadius: "8px",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h3" component="h1" gutterBottom>
              About Texas Defense Data
            </Typography>
            <Typography variant="h5" component="p">
              Making public defense data accessible to drive meaningful reform
            </Typography>
          </Container>
        </Box>

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Mission
            </Typography>
            <Typography paragraph>
              Texas Defense Data is dedicated to increasing transparency and
              accountability in the criminal justice system by making indigent
              defense data accessible to the public. We believe that data-driven
              insights can lead to more equitable outcomes for defendants and
              more efficient allocation of resources within the public defense
              system.
            </Typography>
            <Typography paragraph>
              By collecting, analyzing, and presenting data on public defense in
              Texas, we aim to highlight disparities, identify areas for
              improvement, and provide evidence-based recommendations for policy
              reform. Our goal is to contribute to a more just and fair legal
              system that serves all citizens, regardless of their economic
              status.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, bgcolor: "#F5F5F5", borderRadius: 2 }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Project Timeline
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  2021
                </Typography>
                <Typography variant="body2">
                  Project initiated with grant funding
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  2022
                </Typography>
                <Typography variant="body2">
                  Data collection and validation methodology established
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  2023
                </Typography>
                <Typography variant="body2">
                  First comprehensive dataset published
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  2024
                </Typography>
                <Typography variant="body2">
                  Interactive data tools launched
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Team
            </Typography>
            <Typography paragraph>
              Texas Defense Data is a collaborative project between legal
              professionals, data scientists, and community advocates. Our team
              brings together expertise from various disciplines to ensure that
              our data is accurate, comprehensive, and presented in a way that
              is accessible to both experts and the general public.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Legal Experts
              </Typography>
              <Typography paragraph>
                Our team includes former public defenders, criminal justice
                researchers, and legal scholars who provide context and insight
                into the data we collect.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Data Scientists
              </Typography>
              <Typography paragraph>
                Our data scientists ensure that our methodologies are sound, our
                analyses are rigorous, and our visualizations accurately
                represent the underlying data.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Community Advocates
              </Typography>
              <Typography paragraph>
                We work closely with community organizations to ensure that our
                work addresses the real needs and concerns of those most
                affected by the criminal justice system.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Methodology
            </Typography>
            <Typography paragraph>
              We are committed to transparency not only in the data we present
              but also in how we collect and analyze it. Our methodology is
              rigorous and designed to ensure that our findings are accurate,
              reliable, and useful for driving policy change.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Data Collection
              </Typography>
              <Typography paragraph>
                We collect data from various sources, including court records,
                public defender offices, and government agencies. All data is
                anonymized to protect the privacy of individuals while still
                providing valuable insights into systemic patterns.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" component="h3" gutterBottom>
                Data Analysis
              </Typography>
              <Typography paragraph>
                Our analysis is conducted using established statistical methods
                and is reviewed by experts in both data science and criminal
                justice to ensure accuracy and relevance.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Data Validation
              </Typography>
              <Typography paragraph>
                We employ rigorous validation processes to ensure the accuracy
                and reliability of our data. This includes cross-referencing
                multiple sources, conducting consistency checks, and regularly
                updating our datasets.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" component="h3" gutterBottom>
                Presentation
              </Typography>
              <Typography paragraph>
                We strive to present our data in ways that are accessible to a
                wide audience, from policymakers and researchers to community
                members and advocates. Our visualizations and explanations are
                designed to be clear, informative, and actionable.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
