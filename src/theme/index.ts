// Re-export everything from the theme
export { themeDefinition, type Theme } from "./definition";
export { default as theme } from "./mui";
export { default as ThemeRegistry } from "./ThemeRegistry";

// Note: The MUI theme is not exported here because it contains
// the "use client" directive and should be imported directly
// from "./mui" in client components

// Import themeDefinition for use in the helper function
import { themeDefinition } from "./definition";

// Export a helper function to access theme values in server components
export const getThemeValue = <T = unknown>(path: string): T | undefined => {
  const parts = path.split(".");
  let value: unknown = themeDefinition;

  for (const part of parts) {
    if (
      value &&
      typeof value === "object" &&
      part in (value as Record<string, unknown>)
    ) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return value as T;
};
