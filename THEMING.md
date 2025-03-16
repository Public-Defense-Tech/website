# Theming in Texas Defense Data

This document explains our approach to theming in the Texas Defense Data project, which uses Next.js, MUI, and Pigment CSS.

## Theme Architecture

We use a single source of truth for our theme with a dual-implementation approach:

1. **Theme Definition**: Defined in `src/theme/definition.ts`
2. **Server-side Theme (Pigment CSS)**: Used in `next.config.ts`
3. **Client-side Theme (MUI)**: Used in `src/theme/mui.ts`

### Single Source of Truth

We maintain a single source of truth for our theme values in `src/theme/definition.ts`. This ensures that:

- All theme values are defined in one place
- Types are automatically inferred from the actual values
- Changes only need to be made in one place

## Theme Definition

The theme definition is in `src/theme/definition.ts`:

```typescript
export const themeDefinition = {
  palette: {
    primary: {
      // #1A3A32 - Dark green primary color
      main: "#1A3A32",
      // ... other color definitions
    },
    // ... other palette sections
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
  // Define spacing as a number for better compatibility with MUI
  spacing: 8,
} as const;

// Export the theme type inferred from the actual theme definition
export type Theme = typeof themeDefinition;
```

This file:

- Defines all theme values
- Exports the theme type inferred from the actual values
- Serves as the single source of truth for the theme
- Includes color previews in comments for better developer experience

## Server-side Theme (Pigment CSS)

The server-side theme is used in `next.config.ts`:

```typescript
import { themeDefinition } from "./src/theme";

export default withPigment(nextConfig, {
  transformLibraries: ["@mui/material"],
  theme: extendTheme(themeDefinition),
});
```

This:

- Imports the theme definition from `src/theme/index.ts` (which re-exports from definition.ts)
- Generates CSS variables at build time
- Transforms MUI components to use Pigment CSS

## Client-side Theme (MUI)

The client-side theme is defined in `src/theme/mui.ts`:

```typescript
"use client";
import { createTheme } from "@mui/material/styles";
import { themeDefinition } from "./definition";

const theme = createTheme({
  palette: themeDefinition.palette,
  typography: themeDefinition.typography,
  spacing: themeDefinition.spacing,
  // MUI-specific component overrides
  components: {
    // ...
  },
});

export default theme;
```

This:

- Uses the same theme definition
- Adapts it to MUI's expected format
- Provides a JavaScript theme object for client-side components
- Adds MUI-specific component overrides
- Includes the `"use client"` directive for client-side rendering

## Theme Structure

Our theme is organized into the following files:

- `src/theme/definition.ts`: Contains the theme definition and type
- `src/theme/mui.ts`: Contains the MUI theme with the `"use client"` directive
- `src/theme/index.ts`: Re-exports the theme definition and type

This separation allows us to:

- Use the theme definition in both client and server contexts
- Keep the `"use client"` directive only in files that need it
- Maintain a clean and organized theme structure

## Using the Theme in Components

### In Pigment CSS Components

Use the `css` function from Pigment CSS:

```typescript
import { css } from "@pigment-css/react";
import type { Theme } from "../theme";

const styles = css(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  // For spacing, use the value directly
  padding: `${theme.spacing * 2}px`,
}));
```

### In MUI Components

Use the `sx` prop:

```typescript
<Box
  sx={{
    backgroundColor: "primary.main",
    color: "common.white",
    // MUI automatically applies the spacing
    padding: 2,
  }}
>
  Content
</Box>
```

### Importing the MUI Theme

When you need to use the MUI theme directly in a client component:

```typescript
import theme from "../theme/mui";

// Use the theme in your component
```

## Type Safety

We use TypeScript to ensure type safety when working with our theme:

- The `Theme` type is automatically inferred from the actual theme definition
- This ensures that we're using theme values correctly in our components
- It provides strong typing with exact values rather than generic strings

## Best Practices

1. **Single source of truth**: Make all theme changes in `src/theme/definition.ts`
2. **Type safety**: Use the imported `Theme` type for type checking
3. **Component-specific styles**: Keep component-specific styles within the component files
4. **Global styles**: Use the theme for global styles like colors, typography, and spacing
5. **Color previews**: Use the comment format `// #HEXCODE - Description` for color previews
6. **Client-side imports**: Import the MUI theme directly from `src/theme/mui` in client components
7. **Spacing usage**:
   - In MUI components, use numbers directly (e.g., `padding: 2`)
   - In Pigment CSS, use the value with units (e.g., `padding: \`\${theme.spacing \* 2}px\``)

## Troubleshooting

If you encounter issues with the theme:

1. Check that the theme definition in `src/theme/definition.ts` is correct
2. Ensure that you're importing the `Theme` type from the correct location
3. For MUI components, use the `sx` prop with theme values
4. For Pigment CSS components, use the `css` function with the theme parameter
5. If you get errors about the `"use client"` directive, make sure you're importing from the correct location:
   - For server components: `import { themeDefinition, type Theme } from "../theme";`
   - For client components: `import theme from "../theme/mui";`
6. If you get errors about spacing:
   - Make sure `spacing` is defined as a number in `src/theme/definition.ts`
   - In MUI components, use numbers directly (e.g., `padding: 2`)
   - In Pigment CSS, use the value with units (e.g., `padding: \`\${theme.spacing \* 2}px\``)
