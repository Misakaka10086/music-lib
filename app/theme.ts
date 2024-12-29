import { createTheme, PaletteColorOptions } from "@mui/material/styles";
import materialTheme from "./material-theme.json";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const { light: lightColors, dark: darkColors } = materialTheme.schemes;

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: {
      main: string;
      on: string;
      container: string;
      onContainer: string;
      fixed: string;
      onFixed: string;
      fixedDim: string;
      onFixedVariant: string;
    };

    surface: {
      main: string;
      onSurface: string;
      container: string;
      variant: string;
      onVariant: string;
      inverse: string;
      onInverse: string;
      dim: string;
      containerBright: string;
      containerLowest: string;
      containerLow: string;
      containerHigh: string;
      containerHighest: string;
      tint: string;
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
      on: string;
      container: string;
      onContainer: string;
      fixed: string;
      onFixed: string;
      fixedDim: string;
      onFixedVariant: string;
    };

    surface?: {
      main: string;
      onSurface: string;
      container: string;
      variant: string;
      onVariant: string;
      inverse: string;
      onInverse: string;
      dim: string;
      bright: string;
      containerLowest: string;
      containerLow: string;
      containerHigh: string;
      containerHighest: string;
      tint: string;
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
    on?: string;
    container?: string;
    onContainer?: string;
    inverse?: string;
    fixed?: string;
    onFixed?: string;
    fixedDim?: string;
    onFixedVariant?: string;
  }

  interface SimplePaletteColorOptions {
    on?: string;
    container?: string;
    onContainer?: string;
    inverse?: string;
    fixed?: string;
    onFixed?: string;
    fixedDim?: string;
    onFixedVariant?: string;
  }
}

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: lightColors.primary,
      light: lightColors.primaryContainer,
      dark: lightColors.onPrimaryContainer,
      contrastText: lightColors.onPrimary,
      on: lightColors.onPrimary,
      container: lightColors.primaryContainer,
      onContainer: lightColors.onPrimaryContainer,
      inverse: lightColors.inversePrimary,
      fixed: lightColors.primaryFixed,
      onFixed: lightColors.onPrimaryFixed,
      fixedDim: lightColors.primaryFixedDim,
      onFixedVariant: lightColors.onPrimaryFixedVariant,
    },
    secondary: {
      main: lightColors.secondary,
      light: lightColors.secondaryContainer,
      dark: lightColors.onSecondaryContainer,
      contrastText: lightColors.onSecondary,
      on: lightColors.onSecondary,
      container: lightColors.secondaryContainer,
      onContainer: lightColors.onSecondaryContainer,
      fixed: lightColors.secondaryFixed,
      onFixed: lightColors.onSecondaryFixed,
      fixedDim: lightColors.secondaryFixedDim,
      onFixedVariant: lightColors.onSecondaryFixedVariant,
    },
    tertiary: {
      main: lightColors.tertiary,
      on: lightColors.onTertiary,
      container: lightColors.tertiaryContainer,
      onContainer: lightColors.onTertiaryContainer,
      fixed: lightColors.tertiaryFixed,
      onFixed: lightColors.onTertiaryFixed,
      fixedDim: lightColors.tertiaryFixedDim,
      onFixedVariant: lightColors.onTertiaryFixedVariant,
    },
    surface: {
      main: lightColors.surface,
      onSurface: lightColors.onSurface,
      container: lightColors.surfaceContainer,
      variant: lightColors.surfaceVariant,
      onVariant: lightColors.onSurfaceVariant,
      inverse: lightColors.inverseSurface,
      onInverse: lightColors.inverseOnSurface,
      dim: lightColors.surfaceDim,
      bright: lightColors.surfaceBright,
      containerLowest: lightColors.surfaceContainerLowest,
      containerLow: lightColors.surfaceContainerLow,
      containerHigh: lightColors.surfaceContainerHigh,
      containerHighest: lightColors.surfaceContainerHighest,
      tint: lightColors.surfaceTint,
    },
    error: {
      main: lightColors.error,
      light: lightColors.errorContainer,
      dark: lightColors.onErrorContainer,
      contrastText: lightColors.onError,
      on: lightColors.onError,
      container: lightColors.errorContainer,
      onContainer: lightColors.onErrorContainer,
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
          fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
          "& .MuiInputBase-root": {
            fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
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
            fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
            color: lightColors.primary,
            "&.Mui-focused": {
              color: lightColors.primary,
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: lightColors.primary, // 未激活状态的颜色
            },
            '&:hover fieldset': {
              borderColor: lightColors.primary, // 悬停状态的颜色
            },
            '&.Mui-focused fieldset': {
              borderColor: lightColors.primary, // 激活状态的颜色
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
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
        label: {
          fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
          backgroundColor: lightColors.surfaceContainerHigh,
          color: lightColors.onSurface,
          fontSize: '1rem',
          borderRadius: '4px',
          padding: '8px 12px',
          boxShadow: `0px 2px 4px ${lightColors.shadow}`,
        },
        arrow: {
          color: lightColors.surfaceContainerHigh,
        },
        popper: {
          zIndex: 1500,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: lightColors.surfaceContainer,
          color: lightColors.onSurface,
          boxShadow: `0px 2px 4px ${lightColors.shadow}`,
          borderRadius: "12px", // 可选：设置卡片圆角
          padding: "16px",     // 可选：设置默认内边距
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
      on: darkColors.onPrimary,
      container: darkColors.primaryContainer,
      onContainer: darkColors.onPrimaryContainer,
      inverse: darkColors.inversePrimary,
      fixed: darkColors.primaryFixed,
      onFixed: darkColors.onPrimaryFixed,
      fixedDim: darkColors.primaryFixedDim,
      onFixedVariant: darkColors.onPrimaryFixedVariant,
    },
    secondary: {
      main: darkColors.secondary,
      light: darkColors.secondaryContainer,
      dark: darkColors.onSecondaryContainer,
      contrastText: darkColors.onSecondary,
      on: darkColors.onSecondary,
      container: darkColors.secondaryContainer,
      onContainer: darkColors.onSecondaryContainer,
      fixed: darkColors.secondaryFixed,
      onFixed: darkColors.onSecondaryFixed,
      fixedDim: darkColors.secondaryFixedDim,
      onFixedVariant: darkColors.onSecondaryFixedVariant,
    },
    tertiary: {
      main: darkColors.tertiary,
      on: darkColors.onTertiary,
      container: darkColors.tertiaryContainer,
      onContainer: darkColors.onTertiaryContainer,
      fixed: darkColors.tertiaryFixed,
      onFixed: darkColors.onTertiaryFixed,
      fixedDim: darkColors.tertiaryFixedDim,
      onFixedVariant: darkColors.onTertiaryFixedVariant,
    },
    surface: {
      main: darkColors.surface,
      onSurface: darkColors.onSurface,
      container: darkColors.surfaceContainer,
      variant: darkColors.surfaceVariant,
      onVariant: darkColors.onSurfaceVariant,
      inverse: darkColors.inverseSurface,
      onInverse: darkColors.inverseOnSurface,
      dim: darkColors.surfaceDim,
      bright: darkColors.surfaceBright,
      containerLowest: darkColors.surfaceContainerLowest,
      containerLow: darkColors.surfaceContainerLow,
      containerHigh: darkColors.surfaceContainerHigh,
      containerHighest: darkColors.surfaceContainerHighest,
      tint: darkColors.surfaceTint,
    },
    error: {
      main: darkColors.error,
      light: darkColors.errorContainer,
      dark: darkColors.onErrorContainer,
      contrastText: darkColors.onError,
      on: darkColors.onError,
      container: darkColors.errorContainer,
      onContainer: darkColors.onErrorContainer,
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
          fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
          "& .MuiInputBase-root": {
            fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
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
            fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
            color: darkColors.primary,
            "&.Mui-focused": {
              color: darkColors.primary,
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: darkColors.primary, // 未激活状态的颜色
            },
            '&:hover fieldset': {
              borderColor: darkColors.primary, // 悬停状态的颜色
            },
            '&.Mui-focused fieldset': {
              borderColor: darkColors.primary, // 激活状态的颜色
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
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
        label: {
          fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
          backgroundColor: darkColors.surfaceContainerHigh,
          color: darkColors.onSurface,
          fontSize: '1rem',
          borderRadius: '4px',
          padding: '8px 12px',
          boxShadow: `0px 2px 4px ${darkColors.shadow}`,
        },
        arrow: {
          color: darkColors.surfaceContainerHigh,
        },
        popper: {
          zIndex: 1500,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'ZCOOL KuaiLe', Arial, sans-serif",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.surfaceContainer,
          color: darkColors.onSecondaryContainer,
          boxShadow: `0px 2px 4px ${darkColors.shadow}`,
          borderRadius: "12px", // 可选：设置卡片圆角
          padding: "16px",     // 可选：设置默认内边距
        },
      },
    },
  },
});
