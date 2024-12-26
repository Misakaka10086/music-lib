"use client";

import React from "react";
import {
  Box,
  Skeleton,
  Grid2 as Grid,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

const MusicCardSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box component="article" aria-label="Loading Music Card">
      <Box sx={{ p: 1.5 }}>
        <Grid
          container
          alignItems="center"
          spacing={1}
          direction={isMobile ? "column" : "row"}
          sx={{ flexGrow: 1 }}
        >
          <Grid size={{ xs: 12, md: 3 }} container spacing={3}>
            <Grid size="auto">
              <Skeleton
                variant="rectangular"
                width={60}
                height={60}
                sx={{
                  borderRadius: theme.shape.borderRadius / 2,
                  mr: 1,
                }}
              />
            </Grid>
            <Grid size="grow">
              <Skeleton
                animation="wave"
                height={24}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={20} width="60%" />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: "grow" }}>
            <Skeleton animation="wave" height={24} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Skeleton animation="wave" height={24} />
          </Grid>
        </Grid>
      </Box>
      <Skeleton animation="wave" height={1} />
    </Box>
  );
};

export default MusicCardSkeleton;