"use client";

import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";

export default function Contact() {
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
              Contact Us
            </Typography>
            <Typography variant="h5" component="p">
              Get in touch with the Texas Defense Data team
            </Typography>
          </Container>
        </Box>

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" component="h2" gutterBottom>
              Get In Touch
            </Typography>
            <Typography paragraph>
              We welcome inquiries from researchers, policymakers, journalists,
              and community members interested in our work. Whether you have
              questions about our data, want to collaborate on a project, or
              need assistance interpreting our findings, we&apos;re here to
              help.
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Email
              </Typography>
              <Typography paragraph>info@texasdefensedata.org</Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Social Media
              </Typography>
              <Typography paragraph>
                Follow us on Twitter: @TXDefenseData
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" component="h3" gutterBottom>
                Office
              </Typography>
              <Typography paragraph>
                Texas Defense Data
                <br />
                123 Main Street
                <br />
                Austin, TX 78701
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Send Us a Message
              </Typography>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      variant="outlined"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Join Our Mailing List
          </Typography>
          <Typography paragraph>
            Stay updated on our latest research, events, and opportunities to
            get involved. We send out a monthly newsletter with highlights from
            our work and updates on the state of public defense in Texas.
          </Typography>
          <Paper
            elevation={0}
            sx={{ p: 4, borderRadius: 2, bgcolor: "#F5F5F5" }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  placeholder="Enter your email address"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Subscribe
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  How can I use your data in my research?
                </Typography>
                <Typography paragraph>
                  All of our data is available for download on our Data page.
                  You are welcome to use it for research purposes with proper
                  attribution. If you need assistance with specific data
                  requests or have questions about methodology, please contact
                  us.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Do you offer presentations or workshops?
                </Typography>
                <Typography paragraph>
                  Yes, our team is available for presentations, workshops, and
                  training sessions on public defense data and its implications.
                  Please contact us with details about your event or
                  organization.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  How can I support your work?
                </Typography>
                <Typography paragraph>
                  We welcome support in various forms, from financial
                  contributions to volunteer time. If you&apos;re interested in
                  supporting our work, please contact us to discuss
                  opportunities.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  I&apos;m a journalist writing about public defense. Can you
                  provide a comment?
                </Typography>
                <Typography paragraph>
                  We&apos;re happy to speak with journalists about our work and
                  provide context or comments for stories about public defense.
                  Please contact us with your deadline and specific request.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </main>
  );
}
