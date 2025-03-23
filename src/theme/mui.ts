"use client";
import { createTheme } from "@mui/material/styles";
import { themeDefinition } from "./definition";

// Create a theme instance for MUI components
const theme = createTheme({
  palette: themeDefinition.palette,
  typography: themeDefinition.typography,
  breakpoints: themeDefinition.breakpoints,
  spacing: themeDefinition.spacingBase,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: themeDefinition.palette.grey[300],
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: themeDefinition.palette.grey[100],
          },
        },
      },
    },
  },
});

export default theme;
