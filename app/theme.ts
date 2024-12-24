import { createTheme } from "@mui/material/styles";
// Import color schemes from JSON
import materialTheme from "./material-theme.json";

// Get color schemes
const {
  light: lightColors,
  "light-high-contrast": lightHighContrast,
  "light-medium-contrast": lightMediumContrast,
  dark: darkColors,
  "dark-high-contrast": darkHighContrast,
  "dark-medium-contrast": darkMediumContrast,
} = materialTheme.schemes;



// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightColors.primary,
      light: lightColors.primaryContainer,
      dark: lightColors.onPrimaryContainer,
      contrastText: lightColors.onPrimary,
    },
    secondary: {
      main: lightColors.secondary,
      light: lightColors.secondaryContainer,
      dark: lightColors.onSecondaryContainer,
      contrastText: lightColors.onSecondary,
    },
    background: {
      default: lightColors.surface,
      paper: lightColors.surfaceContainer,
    },
    text: {
      primary: lightColors.onSurface,
      secondary: lightColors.onSurfaceVariant,
    },
    error: {
      main: lightColors.error,
      light: lightColors.errorContainer,
      dark: lightColors.onErrorContainer,
      contrastText: lightColors.onError,
    },
    warning: {
      main: lightColors.tertiary,
      light: lightColors.tertiaryContainer,
      dark: lightColors.onTertiaryContainer,
      contrastText: lightColors.onTertiary,
    },
    
  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: darkColors.primary,
      light: darkColors.primaryContainer,
      dark: darkColors.onPrimaryContainer,
      contrastText: darkColors.onPrimary,
    },
    secondary: {
      main: darkColors.secondary,
      light: darkColors.secondaryContainer,
      dark: darkColors.onSecondaryContainer,
      contrastText: darkColors.onSecondary,
    },
    background: {
      default: darkColors.surface,
      paper: darkColors.surfaceContainer,
    },
    text: {
      primary: darkColors.onSurface,
      secondary: darkColors.onSurfaceVariant,
    },
    error: {
      main: darkColors.error,
      light: darkColors.errorContainer,
      dark: darkColors.onErrorContainer,
      contrastText: darkColors.onError,
    },
    warning: {
      main: darkColors.tertiary,
      light: darkColors.tertiaryContainer,
      dark: darkColors.onTertiaryContainer,
      contrastText: darkColors.onTertiary,
    },
  },
});
