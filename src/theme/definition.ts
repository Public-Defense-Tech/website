// Define the theme structure with actual values
export const themeDefinition = {
  palette: {
    primary: {
      // #1A3A32 - Dark green primary color
      main: "#1A3A32",

      // #2A4A42 - Lighter variant of primary color
      light: "#2A4A42",

      // #0A2A22 - Darker variant of primary color
      dark: "#0A2A22",
    },
    secondary: {
      // #D15B3E - Orange secondary color
      main: "#D15B3E",

      // #E16B4E - Lighter variant of secondary color
      light: "#E16B4E",

      // #C14B2E - Darker variant of secondary color
      dark: "#C14B2E",
    },
    common: {
      // #FFFFFF - White color
      white: "#FFFFFF",

      // #000000 - Black color
      black: "#000000",
    },
    grey: {
      // #F5F5F5 - Very light grey
      100: "#F5F5F5",

      // #EEEEEE - Light grey
      200: "#EEEEEE",

      // #E0E0E0 - Grey
      300: "#E0E0E0",

      // #BDBDBD - Medium grey
      400: "#BDBDBD",

      // #9E9E9E - Medium-dark grey
      500: "#9E9E9E",

      // #757575 - Dark grey
      600: "#757575",

      // #616161 - Very dark grey
      700: "#616161",

      // #424242 - Almost black grey
      800: "#424242",

      // #212121 - Nearly black
      900: "#212121",
    },
    text: {
      // #333333 - Primary text color
      primary: "#333333",

      // #666666 - Secondary text color
      secondary: "#666666",
    },
    background: {
      // #FFFFFF - Default background color
      default: "#FFFFFF",

      // #FFFFFF - Paper background color
      paper: "#FFFFFF",
    },
    // Add error, warning, info, and success colors for MUI compatibility
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
    // Add common typography variants for MUI
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  // Define spacing as a base value (8px) that will be converted to a function in the MUI theme
  spacingBase: 8,
  // Add breakpoints for responsive design
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
} as const;

// Export the theme type inferred from the actual theme definition
export type Theme = typeof themeDefinition;
