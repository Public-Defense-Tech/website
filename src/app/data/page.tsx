"use client";

import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Tabs,
  Tab,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";

export default function Data() {
  return (
    <main>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            backgroundImage: "url('/images/leaves-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "common.white",
            py: 12,
            textAlign: "center",
            mb: 8,
            borderRadius: 2,
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h3" component="h1" gutterBottom>
              Texas Defense Data
            </Typography>
            <Typography variant="h5" component="p">
              Explore public defense data to understand disparities and drive
              reform
            </Typography>
          </Container>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Data Overview
          </Typography>
          <Typography paragraph>
            Our data provides insights into various aspects of the public
            defense system in Texas, including caseloads, outcomes, attorney
            assignments, and more. By exploring this data, you can gain a better
            understanding of the challenges faced by public defenders and their
            clients, as well as identify opportunities for improvement.
          </Typography>
          <Typography paragraph>
            We present our data in multiple formats to accommodate different
            needs and preferences. You can explore interactive visualizations,
            download raw data for your own analysis, or read our reports that
            provide context and interpretation of the findings.
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Paper sx={{ p: 2, mb: 4 }}>
            <Tabs value={0} aria-label="data categories">
              <Tab label="All Data" />
              <Tab label="Caseloads" />
              <Tab label="Outcomes" />
              <Tab label="Demographics" />
              <Tab label="Resources" />
            </Tabs>
          </Paper>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "primary.main",
                  color: "common.white",
                  p: 4,
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography variant="h5" component="h3" gutterBottom>
                  Caseloads in{" "}
                  <Link href="/texas" style={{ color: "white" }}>
                    Texas
                  </Link>
                </Typography>
                <Typography paragraph>
                  Whether someone accused of a crime hires an attorney or is
                  appointed one depends on a lot of factors. The accused may
                  have more money and resources to afford an attorney. For
                  instance, if more people arrested for driving while
                  intoxicated charges tend to have a higher income compared to
                  people charged with other types of crimes, then we would see a
                  higher proportion of folks accused of DWIs retaining their own
                  attorney.
                </Typography>
                <Link href="/data/caseloads" passHref>
                  <MuiLink
                    sx={{
                      color: "common.white",
                      display: "inline-flex",
                      alignItems: "center",
                      mt: 2,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    → Explore Caseload Data
                  </MuiLink>
                </Link>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "grey.100",
                  p: 4,
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography variant="h5" component="h3" gutterBottom>
                  Outcomes in{" "}
                  <Link href="/texas" passHref>
                    <MuiLink sx={{ color: "primary.main" }}>Texas</MuiLink>
                  </Link>
                </Typography>
                <Typography paragraph>
                  Whether someone accused of a crime hires an attorney or is
                  appointed one depends on a lot of factors. The accused may
                  have more money and resources to afford an attorney. For
                  instance, if more people arrested for driving while
                  intoxicated charges tend to have a higher income compared to
                  people charged with other types of crimes, then we would see a
                  higher proportion of folks accused of DWIs retaining their own
                  attorney.
                </Typography>
                <Link href="/data/outcomes" passHref>
                  <MuiLink
                    sx={{
                      color: "primary.main",
                      display: "inline-flex",
                      alignItems: "center",
                      mt: 2,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    → Explore Outcome Data
                  </MuiLink>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Data Methodology
          </Typography>
          <Typography paragraph>
            Our data is collected from various sources, including court records,
            public defender offices, and government agencies. We employ rigorous
            validation processes to ensure the accuracy and reliability of our
            data, including cross-referencing multiple sources, conducting
            consistency checks, and regularly updating our datasets.
          </Typography>
          <Button variant="outlined" component={Link} href="/about#methodology">
            Learn More About Our Methodology
          </Button>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Data Downloads
          </Typography>
          <Typography paragraph>
            We provide access to our raw data for researchers, policymakers, and
            other interested parties. All data is anonymized to protect the
            privacy of individuals while still providing valuable insights into
            systemic patterns.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: 2, bgcolor: "#F5F5F5" }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  Caseload Data (2023)
                </Typography>
                <Typography variant="body2" paragraph>
                  CSV file containing caseload data for all counties in Texas
                  for the year 2023.
                </Typography>
                <Button variant="contained" color="secondary" size="small">
                  Download CSV
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: 2, bgcolor: "#F5F5F5" }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  Outcome Data (2023)
                </Typography>
                <Typography variant="body2" paragraph>
                  CSV file containing case outcome data for all counties in
                  Texas for the year 2023.
                </Typography>
                <Button variant="contained" color="secondary" size="small">
                  Download CSV
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: 2, bgcolor: "#F5F5F5" }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  Complete Dataset (2021-2023)
                </Typography>
                <Typography variant="body2" paragraph>
                  ZIP file containing all data collected from 2021 to 2023,
                  including caseloads, outcomes, and more.
                </Typography>
                <Button variant="contained" color="secondary" size="small">
                  Download ZIP
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Data Visualizations
          </Typography>
          <Typography paragraph>
            Our interactive visualizations allow you to explore the data in a
            more intuitive way. You can filter by county, year, case type, and
            more to gain insights into specific aspects of the public defense
            system in Texas.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Caseload Visualization (Interactive chart will be displayed
                  here)
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Outcome Visualization (Interactive chart will be displayed
                  here)
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </main>
  );
}
