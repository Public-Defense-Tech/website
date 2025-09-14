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
} from "@mui/material";
import Link from "next/link";

export default function Resources() {
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
              Resources
            </Typography>
            <Typography variant="h5" component="p">
              Tools, guides, and research to support public defense
            </Typography>
          </Container>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Resource Library
          </Typography>
          <Typography paragraph>
            Our resource library includes a variety of materials to support
            public defenders, researchers, policymakers, and community
            advocates. These resources are designed to help you understand and
            address the challenges facing the public defense system in Texas.
          </Typography>

          <Paper sx={{ p: 2, mb: 4 }}>
            <Tabs value={0} aria-label="resource categories">
              <Tab label="All Resources" />
              <Tab label="For Defenders" />
              <Tab label="For Researchers" />
              <Tab label="For Policymakers" />
              <Tab label="For Advocates" />
            </Tabs>
          </Paper>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={1}
                sx={{ borderRadius: 2, height: "100%", overflow: "hidden" }}
              >
                <Box
                  sx={{
                    height: 200,
                    bgcolor: "grey.300",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Resource Image
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Caseload Standards Guide
                  </Typography>
                  <Typography paragraph>
                    A comprehensive guide to understanding and implementing
                    caseload standards for public defenders, including best
                    practices and case studies.
                  </Typography>
                  <Button variant="outlined" color="secondary">
                    Download PDF
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={1}
                sx={{ borderRadius: 2, height: "100%", overflow: "hidden" }}
              >
                <Box
                  sx={{
                    height: 200,
                    bgcolor: "grey.300",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Resource Image
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Data Analysis Toolkit
                  </Typography>
                  <Typography paragraph>
                    Tools and templates for analyzing public defense data,
                    including spreadsheets, visualization tools, and statistical
                    analysis guides.
                  </Typography>
                  <Button variant="outlined" color="secondary">
                    Access Toolkit
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={1}
                sx={{ borderRadius: 2, height: "100%", overflow: "hidden" }}
              >
                <Box
                  sx={{
                    height: 200,
                    bgcolor: "grey.300",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Resource Image
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Policy Brief: Funding Reform
                  </Typography>
                  <Typography paragraph>
                    A policy brief outlining recommendations for reforming
                    public defense funding in Texas, based on our data analysis
                    and research.
                  </Typography>
                  <Button variant="outlined" color="secondary">
                    Download PDF
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Research Reports
          </Typography>
          <Typography paragraph>
            Our research reports provide in-depth analysis of various aspects of
            the public defense system in Texas. These reports are based on our
            data collection and analysis, as well as interviews with
            stakeholders and literature reviews.
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  The State of Public Defense in Texas: 2023 Report
                </Typography>
                <Typography paragraph>
                  A comprehensive overview of the public defense system in
                  Texas, including caseloads, outcomes, funding, and
                  recommendations for improvement.
                </Typography>
                <Button variant="outlined" color="secondary">
                  Read Report
                </Button>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Disparities in Public Defense: A Data-Driven Analysis
                </Typography>
                <Typography paragraph>
                  An analysis of disparities in public defense representation
                  and outcomes based on race, ethnicity, income, and geography.
                </Typography>
                <Button variant="outlined" color="secondary">
                  Read Report
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Training Materials
          </Typography>
          <Typography paragraph>
            We offer a variety of training materials for public defenders,
            researchers, policymakers, and advocates. These materials are
            designed to help you develop the skills and knowledge needed to
            effectively use data to improve the public defense system.
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={1}
                sx={{ p: 3, borderRadius: 2, height: "100%" }}
              >
                <Typography variant="h5" component="h3" gutterBottom>
                  Data Literacy Workshop
                </Typography>
                <Typography paragraph>
                  A workshop designed to help public defenders and advocates
                  develop the skills needed to understand and use data
                  effectively.
                </Typography>
                <Button variant="outlined" color="secondary">
                  Access Materials
                </Button>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={1}
                sx={{ p: 3, borderRadius: 2, height: "100%" }}
              >
                <Typography variant="h5" component="h3" gutterBottom>
                  Advocacy Training
                </Typography>
                <Typography paragraph>
                  Training materials for advocates working to improve the public
                  defense system, including messaging guides, coalition-building
                  strategies, and more.
                </Typography>
                <Button variant="outlined" color="secondary">
                  Access Materials
                </Button>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={1}
                sx={{ p: 3, borderRadius: 2, height: "100%" }}
              >
                <Typography variant="h5" component="h3" gutterBottom>
                  Policy Development Workshop
                </Typography>
                <Typography paragraph>
                  A workshop for policymakers and advocates focused on
                  developing evidence-based policies to improve the public
                  defense system.
                </Typography>
                <Button variant="outlined" color="secondary">
                  Access Materials
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            External Resources
          </Typography>
          <Typography paragraph>
            We&apos;ve compiled a list of external resources that may be helpful
            for those interested in public defense data and reform. These
            resources include organizations, publications, and tools that
            complement our work.
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Organizations
                </Typography>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>
                    <Typography paragraph>
                      <Link
                        href="https://www.nacdl.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        National Association of Criminal Defense Lawyers
                      </Link>{" "}
                      - Advocacy organization dedicated to ensuring justice and
                      due process for persons accused of crime.
                    </Typography>
                  </li>
                  <li>
                    <Typography paragraph>
                      <Link
                        href="https://www.nlada.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        National Legal Aid & Defender Association
                      </Link>{" "}
                      - America&apos;s oldest and largest nonprofit association
                      devoted to excellence in the delivery of legal services to
                      those who cannot afford counsel.
                    </Typography>
                  </li>
                  <li>
                    <Typography paragraph>
                      <Link
                        href="https://www.vera.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Vera Institute of Justice
                      </Link>{" "}
                      - Research and policy organization working to build and
                      improve justice systems that ensure fairness, promote
                      safety, and strengthen communities.
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  Publications
                </Typography>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>
                    <Typography paragraph>
                      <Link href="#" target="_blank" rel="noopener noreferrer">
                        Gideon at 60: The Right to Counsel in the 21st Century
                      </Link>{" "}
                      - A report examining the state of public defense 60 years
                      after the landmark Gideon v. Wainwright decision.
                    </Typography>
                  </li>
                  <li>
                    <Typography paragraph>
                      <Link href="#" target="_blank" rel="noopener noreferrer">
                        The State of Indigent Defense in the United States
                      </Link>{" "}
                      - A comprehensive report on the state of public defense
                      across the United States.
                    </Typography>
                  </li>
                  <li>
                    <Typography paragraph>
                      <Link href="#" target="_blank" rel="noopener noreferrer">
                        Data-Driven Criminal Justice Reform
                      </Link>{" "}
                      - A guide to using data to drive criminal justice reform
                      efforts.
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </main>
  );
}
