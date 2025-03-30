// Define the theme structure with actual values
export const themeDefinition = {
  palette: {
    primary: {
      // #082D2A - Dark green primary color
      main: "#082D2A",

      // #B1D4B9 - Lighter variant of primary color
      light: "#B1D4B9",

      // #0A2A22 - Darker variant of primary color
      dark: "#0A2A22",
    },
    secondary: {
      // #D95D39 - Orange secondary color
      main: "#D95D39",

      // #E79780 - Lighter variant of secondary color
      light: "#E79780",

      // #95361C - Darker variant of secondary color
      dark: "#95361C",
    },
    common: {
      // #FAFAF3 - White color
      white: "#FAFAF3",

      // #0f0f0f - Black color
      black: "#0f0f0f",
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

      // #FAFAF3 - Paper background color
      paper: "#FAFAF3",
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
