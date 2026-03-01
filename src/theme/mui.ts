"use client";
import { createTheme } from "@mui/material/styles";
import { themeDefinition } from "./definition";

// Create the MUI theme
const theme = createTheme({
  palette: themeDefinition.palette,
  typography: {
    fontFamily: "Standard Book, Arial, sans-serif", // Default body font
    h1: {
      fontFamily: "Geist, Arial, sans-serif",
      fontWeight:500,
    },
    h2: {
      fontFamily: "Geist, Arial, sans-serif",
      fontWeight:500,
    },
    h3: {
      fontFamily: "Geist, Arial, sans-serif",
      fontWeight:500,
    },
    h4: {
      fontFamily: "Standard Book, Arial, sans-serif",
      fontWeight: 400,
    },
    h5: {
      fontFamily: "Standard Book, Arial, sans-serif",
      fontWeight: 400,
    },
    body1: {
      fontFamily: "Standard Book, Arial, sans-serif",
      fontWeight: 400,
    },
    body2: {
      fontFamily: "Standard Book, Arial, sans-serif",
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: "Standard Book Italic, Arial, sans-serif",
      fontWeight: 400,
      fontStyle: "italic",
    },
    subtitle2: {
      fontFamily: "Standard Bold, Arial, sans-serif",
      fontWeight: 700,
    },
  },
  breakpoints: themeDefinition.breakpoints,
  spacing: themeDefinition.spacingBase,
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          variants: [
            {
              props: { variant: "contained" },
              style: {
                backgroundColor: themeDefinition.palette.secondary.main,
              },
            },
          ],
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "@font-face": [
            {
            fontFamily: "Geist", 
            fontWeight: 600,
            fontStyle: "normal", 
            },
            {
              fontFamily: "Standard Book",
              src: `url('/fonts/standard-book-webfont.woff2') format('woff2'),
                    url('/fonts/standard-book-webfont.woff') format('woff')`,
              fontWeight: 400,
              fontStyle: "normal",
              fontDisplay: "swap",
            },
            {
              fontFamily: "Standard Book Italic",
              src: `url('/fonts/standard-book-italic-webfont.woff2') format('woff2'),
                    url('/fonts/standard-book-italic-webfont.woff') format('woff')`,
              fontWeight: 400,
              fontStyle: "italic",
              fontDisplay: "swap",
            },
            {
              fontFamily: "Standard Bold",
              src: `url('/fonts/standard-bold-webfont.woff2') format('woff2'),
                    url('/fonts/standard-bold-webfont.woff') format('woff')`,
              fontWeight: 700,
              fontStyle: "normal",
              fontDisplay: "swap",
            },
          ],
        },
      },
    },
  },
});

export default theme;
