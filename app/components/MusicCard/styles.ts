import { Theme } from '@mui/material';

export const styles = {
  cardBase: {
    bgcolor: 'background.paper',
    borderRadius: 1,
    '&:hover': {
      bgcolor: (theme: Theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[800],
    },
  },
  desktopCard: {
    p: 2,
  },
  mobileCard: {
    px:1,
    py:0.5
  },
  imageContainer: {
    borderRadius: 1,
    overflow: 'hidden',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
    mr: 3,
  },
  mobileActions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    px: 2,
  },
  desktopActions: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    height: '100%',
  }
}; 