import { createTheme, PaletteColorOptions } from "@mui/material/styles";
import materialTheme from "./material-theme.json";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const { light: lightColors, dark: darkColors } = materialTheme.schemes;

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: {
      main: string;
      onTertiary: string;
      tertiaryContainer: string;
      onTertiaryContainer: string;
      tertiaryFixed: string;
      onTertiaryFixed: string;
      tertiaryFixedDim: string;
      onTertiaryFixedVariant: string;
    };

    surface: {
      main: string;
      onSurface: string;
      surfaceContainer: string;
      surfaceVariant: string;
      onSurfaceVariant: string;
      inverseSurface: string;
      inverseOnSurface: string;
      surfaceDim: string;
      surfaceBright: string;
      surfaceContainerLowest: string;
      surfaceContainerLow: string;
      surfaceContainerHigh: string;
      surfaceContainerHighest: string;
      surfaceTint: string;
    };

    md3_other: {
      background: string;
      onBackground: string;
      outline: string;
      outlineVariant: string;
      shadow: string;
      scrim: string;
    };
  }

  interface PaletteOptions {
    tertiary?: {
      main: string;
      onTertiary: string;
      tertiaryContainer: string;
      onTertiaryContainer: string;
      tertiaryFixed: string;
      onTertiaryFixed: string;
      tertiaryFixedDim: string;
      onTertiaryFixedVariant: string;
    };

    surface?: {
      main: string;
      onSurface: string;
      surfaceContainer: string;
      surfaceVariant: string;
      onSurfaceVariant: string;
      inverseSurface: string;
      inverseOnSurface: string;
      surfaceDim: string;
      surfaceBright: string;
      surfaceContainerLowest: string;
      surfaceContainerLow: string;
      surfaceContainerHigh: string;
      surfaceContainerHighest: string;
      surfaceTint: string;
    };

    md3_other: {
      background: string;
      onBackground: string;
      outline: string;
      outlineVariant: string;
      shadow: string;
      scrim: string;
    };
  }

  interface PaletteColor {
    onPrimary?: string;
    primaryContainer?: string;
    onPrimaryContainer?: string;
    inversePrimary?: string;
    primaryFixed?: string;
    onPrimaryFixed?: string;
    primaryFixedDim?: string;
    onPrimaryFixedVariant?: string;
    onSecondary?: string;
    secondaryContainer?: string;
    onSecondaryContainer?: string;
    secondaryFixed?: string;
    onSecondaryFixed?: string;
    secondaryFixedDim?: string;
    onSecondaryFixedVariant?: string;
    onTertiary?: string;
    tertiaryContainer?: string;
    onTertiaryContainer?: string;
    tertiaryFixed?: string;
    onTertiaryFixed?: string;
    tertiaryFixedDim?: string;
    onTertiaryFixedVariant?: string;
    onSurface?: string;
    surfaceContainer?: string;
    onSurfaceVariant?: string;
    surfaceVariant?: string;
    inverseSurface?: string;
    inverseOnSurface?: string;
    surfaceDim?: string;
    surfaceBright?: string;
    surfaceContainerLowest?: string;
    surfaceContainerLow?: string;
    surfaceContainerHigh?: string;
    surfaceContainerHighest?: string;
    surfaceTint?: string;
    onError?: string;
    errorContainer?: string;
    onErrorContainer?: string;
    outline?: string;
    outlineVariant?: string;
    shadow?: string;
    scrim?: string;
    background?: string;
    onBackground?: string;
  }

  interface SimplePaletteColorOptions {
    onPrimary?: string;
    primaryContainer?: string;
    onPrimaryContainer?: string;
    inversePrimary?: string;
    primaryFixed?: string;
    onPrimaryFixed?: string;
    primaryFixedDim?: string;
    onPrimaryFixedVariant?: string;
    onSecondary?: string;
    secondaryContainer?: string;
    onSecondaryContainer?: string;
    secondaryFixed?: string;
    onSecondaryFixed?: string;
    secondaryFixedDim?: string;
    onSecondaryFixedVariant?: string;
    onTertiary?: string;
    tertiaryContainer?: string;
    onTertiaryContainer?: string;
    tertiaryFixed?: string;
    onTertiaryFixed?: string;
    tertiaryFixedDim?: string;
    onTertiaryFixedVariant?: string;
    onSurface?: string;
    surfaceContainer?: string;
    onSurfaceVariant?: string;
    surfaceVariant?: string;
    inverseSurface?: string;
    inverseOnSurface?: string;
    surfaceDim?: string;
    surfaceBright?: string;
    surfaceContainerLowest?: string;
    surfaceContainerLow?: string;
    surfaceContainerHigh?: string;
    surfaceContainerHighest?: string;
    surfaceTint?: string;
    onError?: string;
    errorContainer?: string;
    onErrorContainer?: string;
    outline?: string;
    outlineVariant?: string;
    shadow?: string;
    scrim?: string;
    background?: string;
    onBackground?: string;
  }
}

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: lightColors.primary,
      light: lightColors.primaryContainer,
      dark: lightColors.onPrimaryContainer,
      contrastText: lightColors.onPrimary,
      onPrimary: lightColors.onPrimary,
      primaryContainer: lightColors.primaryContainer,
      onPrimaryContainer: lightColors.onPrimaryContainer,
      inversePrimary: lightColors.inversePrimary,
      primaryFixed: lightColors.primaryFixed,
      onPrimaryFixed: lightColors.onPrimaryFixed,
      primaryFixedDim: lightColors.primaryFixedDim,
      onPrimaryFixedVariant: lightColors.onPrimaryFixedVariant,
    },
    secondary: {
      main: lightColors.secondary,
      light: lightColors.secondaryContainer,
      dark: lightColors.onSecondaryContainer,
      contrastText: lightColors.onSecondary,
      onSecondary: lightColors.onSecondary,
      secondaryContainer: lightColors.secondaryContainer,
      onSecondaryContainer: lightColors.onSecondaryContainer,
      secondaryFixed: lightColors.secondaryFixed,
      onSecondaryFixed: lightColors.onSecondaryFixed,
      secondaryFixedDim: lightColors.secondaryFixedDim,
      onSecondaryFixedVariant: lightColors.onSecondaryFixedVariant,
    },
    tertiary: {
      main: lightColors.tertiary,
      onTertiary: lightColors.onTertiary,
      tertiaryContainer: lightColors.tertiaryContainer,
      onTertiaryContainer: lightColors.onTertiaryContainer,
      tertiaryFixed: lightColors.tertiaryFixed,
      onTertiaryFixed: lightColors.onTertiaryFixed,
      tertiaryFixedDim: lightColors.tertiaryFixedDim,
      onTertiaryFixedVariant: lightColors.onTertiaryFixedVariant,
    },
    surface: {
      main: lightColors.surface,
      onSurface: lightColors.onSurface,
      surfaceContainer: lightColors.surfaceContainer,
      surfaceVariant: lightColors.surfaceVariant,
      onSurfaceVariant: lightColors.onSurfaceVariant,
      inverseSurface: lightColors.inverseSurface,
      inverseOnSurface: lightColors.inverseOnSurface,
      surfaceDim: lightColors.surfaceDim,
      surfaceBright: lightColors.surfaceBright,
      surfaceContainerLowest: lightColors.surfaceContainerLowest,
      surfaceContainerLow: lightColors.surfaceContainerLow,
      surfaceContainerHigh: lightColors.surfaceContainerHigh,
      surfaceContainerHighest: lightColors.surfaceContainerHighest,
      surfaceTint: lightColors.surfaceTint,
    },
    error: {
      main: lightColors.error,
      light: lightColors.errorContainer,
      dark: lightColors.onErrorContainer,
      contrastText: lightColors.onError,
      onError: lightColors.onError,
      errorContainer: lightColors.errorContainer,
      onErrorContainer: lightColors.onErrorContainer,
    },
    md3_other: {
      outline: lightColors.outline,
      outlineVariant: lightColors.outlineVariant,
      shadow: lightColors.shadow,
      scrim: lightColors.scrim,
      background: lightColors.background,
      onBackground: lightColors.onBackground,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: lightColors.primary,
            "&:before": {
              borderBottomColor: lightColors.primary,
            },
            "&:hover:before": {
              borderBottomColor: lightColors.primary,
            },
            "&.Mui-focused:after": {
              borderBottomColor: lightColors.primary,
            },
          },
          "& .MuiInputLabel-root": {
            color: lightColors.primary,
            "&.Mui-focused": {
              color: lightColors.primary,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: lightColors.surfaceContainer,
          color: lightColors.onSurface,
          "&.MuiChip-filled": {
            backgroundColor: lightColors.secondaryContainer,
            color: lightColors.onSecondaryContainer,
          },
          "&.MuiChip-outlined": {
            borderColor: lightColors.outline,
            color: lightColors.onSurface,
          },
          "&.Mui-disabled": {
            opacity: 0.38,
          },
        },
        deleteIcon: {
          color: lightColors.onSurfaceVariant,
          "&:hover": {
            color: lightColors.onSurface,
          },
        },
        icon: {
          color: lightColors.primary,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: lightColors.primary,
          WebkitTapHighlightColor: "transparent",
          "&:hover": {
            backgroundColor: lightColors.inversePrimary,
          },
          "@media (hover: none)": {
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&:active": {
              backgroundColor: `${lightColors.inversePrimary}4D`,
            },
          },
          "&.Mui-disabled": {
            color: `${lightColors.onSurface}38`,
          },
          // // Standard variants
          // '&.MuiIconButton-colorPrimary': {
          //   color: lightColors.primary,
          //   '&:hover': {
          //     backgroundColor: `${lightColors.primary}14`,
          //   }
          // },
          // '&.MuiIconButton-colorSecondary': {
          //   color: lightColors.secondary,
          //   '&:hover': {
          //     backgroundColor: `${lightColors.secondary}14`,
          //   }
          // },
          // '&.MuiIconButton-colorError': {
          //   color: lightColors.error,
          //   '&:hover': {
          //     backgroundColor: `${lightColors.error}14`,
          //   }
          // }
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lightColors.outlineVariant,
          "&.MuiDivider-vertical": {
            borderColor: lightColors.outlineVariant,
          },
          "&.MuiDivider-middle": {
            borderColor: lightColors.outlineVariant,
          },
          "&.MuiDivider-light": {
            borderColor: `${lightColors.outlineVariant}3D`, // 24% opacity
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: lightColors.surfaceContainer,
        },
        rectangular: {
          borderRadius: "4px",
        },
        wave: {
          "&::after": {
            background: `linear-gradient(90deg, transparent, ${lightColors.surfaceContainerHigh}, transparent)`,
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: darkColors.primary,
      light: darkColors.primaryContainer,
      dark: darkColors.onPrimaryContainer,
      contrastText: darkColors.onPrimary,
      onPrimary: darkColors.onPrimary,
      primaryContainer: darkColors.primaryContainer,
      onPrimaryContainer: darkColors.onPrimaryContainer,
      inversePrimary: darkColors.inversePrimary,
      primaryFixed: darkColors.primaryFixed,
      onPrimaryFixed: darkColors.onPrimaryFixed,
      primaryFixedDim: darkColors.primaryFixedDim,
      onPrimaryFixedVariant: darkColors.onPrimaryFixedVariant,
    },
    secondary: {
      main: darkColors.secondary,
      light: darkColors.secondaryContainer,
      dark: darkColors.onSecondaryContainer,
      contrastText: darkColors.onSecondary,
      onSecondary: darkColors.onSecondary,
      secondaryContainer: darkColors.secondaryContainer,
      onSecondaryContainer: darkColors.onSecondaryContainer,
      secondaryFixed: darkColors.secondaryFixed,
      onSecondaryFixed: darkColors.onSecondaryFixed,
      secondaryFixedDim: darkColors.secondaryFixedDim,
      onSecondaryFixedVariant: darkColors.onSecondaryFixedVariant,
    },
    tertiary: {
      main: darkColors.tertiary,
      onTertiary: darkColors.onTertiary,
      tertiaryContainer: darkColors.tertiaryContainer,
      onTertiaryContainer: darkColors.onTertiaryContainer,
      tertiaryFixed: darkColors.tertiaryFixed,
      onTertiaryFixed: darkColors.onTertiaryFixed,
      tertiaryFixedDim: darkColors.tertiaryFixedDim,
      onTertiaryFixedVariant: darkColors.onTertiaryFixedVariant,
    },
    surface: {
      main: darkColors.surface,
      onSurface: darkColors.onSurface,
      surfaceContainer: darkColors.surfaceContainer,
      surfaceVariant: darkColors.surfaceVariant,
      onSurfaceVariant: darkColors.onSurfaceVariant,
      inverseSurface: darkColors.inverseSurface,
      inverseOnSurface: darkColors.inverseOnSurface,
      surfaceDim: darkColors.surfaceDim,
      surfaceBright: darkColors.surfaceBright,
      surfaceContainerLowest: darkColors.surfaceContainerLowest,
      surfaceContainerLow: darkColors.surfaceContainerLow,
      surfaceContainerHigh: darkColors.surfaceContainerHigh,
      surfaceContainerHighest: darkColors.surfaceContainerHighest,
      surfaceTint: darkColors.surfaceTint,
    },
    error: {
      main: darkColors.error,
      light: darkColors.errorContainer,
      dark: darkColors.onErrorContainer,
      contrastText: darkColors.onError,
      onError: darkColors.onError,
      errorContainer: darkColors.errorContainer,
      onErrorContainer: darkColors.onErrorContainer,
    },
    md3_other: {
      outline: darkColors.outline,
      outlineVariant: darkColors.outlineVariant,
      shadow: darkColors.shadow,
      scrim: darkColors.scrim,
      background: darkColors.background,
      onBackground: darkColors.onBackground,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: darkColors.primary,
            "&:before": {
              borderBottomColor: darkColors.primary,
            },
            "&:hover:before": {
              borderBottomColor: darkColors.primary,
            },
            "&.Mui-focused:after": {
              borderBottomColor: darkColors.primary,
            },
          },
          "& .MuiInputLabel-root": {
            color: darkColors.primary,
            "&.Mui-focused": {
              color: darkColors.primary,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.surfaceContainer,
          color: darkColors.onSurface,
          "&.MuiChip-filled": {
            backgroundColor: darkColors.secondaryContainer,
            color: darkColors.onSecondaryContainer,
          },
          "&.MuiChip-outlined": {
            borderColor: darkColors.outline,
            color: darkColors.onSurface,
          },
          "&.Mui-disabled": {
            opacity: 0.38,
          },
        },
        deleteIcon: {
          color: darkColors.onSurfaceVariant,
          "&:hover": {
            color: darkColors.onSurface,
          },
        },
        icon: {
          color: darkColors.primary,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: darkColors.primary,
          WebkitTapHighlightColor: "transparent",
          "&:hover": {
            backgroundColor: darkColors.inversePrimary,
          },
          "@media (hover: none)": {
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&:active": {
              backgroundColor: `${darkColors.inversePrimary}4D`,
            },
          },
          "&.Mui-disabled": {
            color: `${darkColors.onSurface}38`,
          },
          // // Standard variants
          // '&.MuiIconButton-colorPrimary': {
          //   color: darkColors.primary,
          //   '&:hover': {
          //     backgroundColor: `${darkColors.primary}14`,
          //   }
          // },
          // '&.MuiIconButton-colorSecondary': {
          //   color: darkColors.secondary,
          //   '&:hover': {
          //     backgroundColor: `${darkColors.secondary}14`,
          //   }
          // },
          // '&.MuiIconButton-colorError': {
          //   color: darkColors.error,
          //   '&:hover': {
          //     backgroundColor: `${darkColors.error}14`,
          //   }
          // }
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: darkColors.outlineVariant,
          "&.MuiDivider-vertical": {
            borderColor: darkColors.outlineVariant,
          },
          "&.MuiDivider-middle": {
            borderColor: darkColors.outlineVariant,
          },
          "&.MuiDivider-light": {
            borderColor: `${darkColors.outlineVariant}3D`, // 24% opacity
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.surfaceContainer,
        },
        rectangular: {
          borderRadius: "4px",
        },
        wave: {
          "&::after": {
            background: `linear-gradient(90deg, transparent, ${darkColors.surfaceContainerHigh}, transparent)`,
          },
        },
      },
    },
  },
});
