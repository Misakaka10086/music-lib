// components/MusicCardSkeleton.tsx
'use client';

import React, { memo } from 'react';
import { Box,  Skeleton, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styles } from './styles';

const MusicCardSkeleton = memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Box
        sx={{
          ...styles.cardBase,
          ...(isMobile ? styles.mobileCard : styles.desktopCard),
        }}
        role="article"
        aria-label="Loading Music"
      >
        <Grid container alignItems="center" spacing={2}>
          {/* Image Skeleton */}
          <Grid >
            <Box sx={styles.imageContainer}>
              <Skeleton variant="rectangular" width={40} height={40} />
            </Box>
          </Grid>

          {/* Title and Artist Skeletons */}
          <Grid   sx={{ minWidth: 0 }}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="60%" />
            <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} width="40%" />
          </Grid>

          {/* Desktop Tags Skeleton */}
          {!isMobile && (
            <Grid  sx={styles.tagsContainer}>
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={50} height={24} />
            </Grid>
          )}

          {/* Desktop Action Buttons Skeletons */}
          {!isMobile && (
            <Grid  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="circular" width={24} height={24} />
            </Grid>
          )}

          {/* Mobile Tags Skeleton */}
          {isMobile && (
            <Grid >
              <Box sx={styles.tagsContainer}>
                <Skeleton variant="rounded" width={50} height={20} />
                <Skeleton variant="rounded" width={40} height={20} />
              </Box>
            </Grid>
          )}

          {/* Mobile Action Buttons Skeletons */}
          {isMobile && (
            <Grid   sx={styles.mobileActions}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="circular" width={24} height={24} />
            </Grid>
          )}
        </Grid>
      </Box>
      {/* No Divider Skeleton needed as it's a simple line */}
      <Skeleton variant="rectangular" height={1} width="100%" />
    </Box>
  );
});

MusicCardSkeleton.displayName = 'MusicCardSkeleton';

export default MusicCardSkeleton;