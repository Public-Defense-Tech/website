import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  spacing?: number;
  marginTop?: number;
  marginBottom?: number;
  fullWidth?: boolean;
  noContainer?: boolean; // For sections that manage their own container
  noGrid?: boolean; // For sections that don't need a grid
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  spacing = 4,
  marginTop = 4,
  marginBottom = 4,
  fullWidth = false,
  noContainer = false,
  noGrid = false,
}) => {
  const content = noGrid ? (
    children
  ) : (
    <Grid container spacing={spacing}>
      {children}
    </Grid>
  );

  return (
    <Box sx={{ mt: marginTop, mb: marginBottom }}>
      {(title || subtitle) && (
        <Container maxWidth={fullWidth ? false : "lg"}>
          {title && (
            <Typography variant="h4" component="h2" gutterBottom>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {subtitle}
            </Typography>
          )}
        </Container>
      )}
      {noContainer ? (
        content
      ) : (
        <Container maxWidth={fullWidth ? false : "lg"}>{content}</Container>
      )}
    </Box>
  );
};

export default Section;
