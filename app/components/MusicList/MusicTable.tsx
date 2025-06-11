"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid2 as Grid,
  Chip,
} from "@mui/material";
import Image from "next/image";
import {
  TitleTypography,
  ArtistTypography,
} from "@/app/components/ui/TypographyWithTheme";
import { useCallback, useEffect } from "react";
import { useCopyToClipboard } from "@/app/lib/copyToClipboard";
import TableSkeleton from "@/app/components/MusicList/TableSkeleton";
import { useMusicData } from "@/app/hooks/useMusicData";
import { useInView } from "react-intersection-observer";
import {
  CircularProgress,
  Typography
  // Removed Pagination, Select, MenuItem, FormControl, InputLabel, Button
} from "@mui/material";

export default function MusicTable() {
  const {
    musicData,
    loadMore,
    hasMore,
    initialLoading,
    loadingMore,
    // error, // Can be used to display error messages if needed
  } = useMusicData();
  const copyToClipboard = useCopyToClipboard();

  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the element is visible
    triggerOnce: false, // Keep triggering as it enters/leaves
  });

  useEffect(() => {
    // Check for initialLoading to prevent firing loadMore on the first render cycle
    // if inView happens to be true immediately.
    if (inView && hasMore && !loadingMore && !initialLoading) {
      loadMore();
    }
  }, [inView, hasMore, loadMore, loadingMore, initialLoading]);

  const handleRowClick = useCallback(
    (musicTitle: string) => {
      copyToClipboard(musicTitle);
    },
    [copyToClipboard]
  );

  // Show skeleton if initialLoading and no data yet
  if (initialLoading && musicData.length === 0) {
    return <TableSkeleton />;
  }

  return (
    <Box sx={{ padding: 2 }} position="relative">
      <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
        <Table sx={{ minWidth: 650 }} aria-label="music library table">
          <TableBody>
            {musicData.map((row) => (
              <TableRow
                key={row.music_id} // Consider using a more unique key if music_id can repeat across different data sets, though unlikely here
                hover={true}
                onClick={() => handleRowClick(row.music_title)}
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.surface.container + " !important",
                  },
                }}
              >
                <TableCell>
                  <Image
                    src={row.image_url || "/placeholder.png"}
                    alt={row.music_title}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                  />
                </TableCell>
                <TableCell>
                  <Grid container>
                    <Grid size="grow">
                      <TitleTypography>{row.music_title}</TitleTypography>
                      <ArtistTypography>{row.original_artist}</ArtistTypography>
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {row.tags.map((tag) => (
                      <Chip key={`${row.music_id}-${tag}`} label={tag} />
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Intersection Observer Trigger */}
      <Box ref={ref} sx={{ height: 50, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        {loadingMore && <CircularProgress size={30} />}
        {!loadingMore && !hasMore && musicData.length > 0 && (
          <Typography variant="body2" color="textSecondary">
            You've reached the end.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
