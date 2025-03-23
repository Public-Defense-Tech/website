"use client";
import { createTheme } from "@mui/material/styles";
import { EB_Garamond as EB_Garamond_Font } from "next/font/google";
import { themeDefinition } from "./definition";

// Load Google Font (EB Garamond)
const ebGaramond = EB_Garamond_Font({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Create the MUI theme
const theme = createTheme({
  palette: themeDefinition.palette,
  typography: {
    fontFamily: "Standard Book, Arial, sans-serif", // Default body font
    h1: {
      fontFamily: ebGaramond.style.fontFamily, // Google Font for headers
    },
    h2: {
      fontFamily: ebGaramond.style.fontFamily,
    },
    h3: {
      fontFamily: ebGaramond.style.fontFamily,
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
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "@font-face": [
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
