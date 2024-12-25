import { SxProps, Theme } from "@mui/material";

export const buttonStyles = {
  primary: {
    contained: {
      bgcolor: 'primary.primaryContainer',
      color: 'primary.onPrimaryContainer',
      '&:hover': {
        bgcolor: 'primary.main',
        color: 'primary.onPrimary',
      }
    },
    outlined: {
      color: 'primary.main',
      borderColor: 'primary.main',
      '&:hover': {
        bgcolor: 'primary.main',
        color: 'primary.onPrimary',
      }
    }
  },
  secondary: {
    contained: {
      bgcolor: 'secondary.secondaryContainer',
      color: 'secondary.onSecondaryContainer',
      '&:hover': {
        bgcolor: 'secondary.main',
        color: 'secondary.onSecondary',
      }
    },
    outlined: {
      color: 'secondary.main',
      borderColor: 'secondary.main',
      '&:hover': {
        bgcolor: 'secondary.main',
        color: 'secondary.onSecondary',
      }
    }
  },
  error: {
    contained: {
      bgcolor: 'error.errorContainer',
      color: 'error.onErrorContainer',
      '&:hover': {
        bgcolor: 'error.main',
        color: 'error.onError',
      }
    },
    outlined: {
      color: 'error.main',
      borderColor: 'error.main',
      '&:hover': {
        bgcolor: 'error.main',
        color: 'error.onError',
      }
    }
  },
  warning: {
    contained: {
      bgcolor: 'tertiary.main',
      color: 'tertiary.onTertiary',
      '&:hover': {
        bgcolor: 'tertiary.tertiaryContainer',
        color: 'tertiary.onTertiaryContainer',
      }
    },
    outlined: {
      color: 'tertiary.main',
      borderColor: 'tertiary.main',
      '&:hover': {
        bgcolor: 'tertiary.main',
        color: 'tertiary.onTertiary',
      }
    }
  }
}; 