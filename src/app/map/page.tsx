"use client";

import { Box, Typography, Container, Stack } from "@mui/material";
import TexasMap from "@/components/TexasMap";

export default function MapPage() {
  return (
    <Box 
      component="main" 
      sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        bgcolor: '#ffffff', 
        pt: 8, 
        pb: 10 
      }}
    >
      {/* Container maxWidth="lg" (~1200px) keeps the whole block from hugging the screen edges */}
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 850, mx: 'auto' }}>
          
          {/* Header: Left-aligned TO THE MAP */}
          <Stack spacing={0.5} sx={{ mb: 5, borderLeft: '4px solid #1976d2', pl: 3 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 800, 
                color: '#0f172a', 
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}
            >
              Texas Defense Data
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#64748b', 
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Explore County-Level Data
            </Typography>
          </Stack>

          {/* The Map and Info Card */}
          <TexasMap />
        </Box>
      </Container>
    </Box>
  );
}