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
import {
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";

export default function MusicTable() {
  const {
    musicData, // Renamed from filteredData
    loading,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
  } = useMusicData();
  const copyToClipboard = useCopyToClipboard();

  const handleRowClick = useCallback(
    (musicTitle: string) => {
      copyToClipboard(musicTitle);
    },
    [copyToClipboard]
  );

  if (loading && musicData.length === 0) { // Show skeleton if loading and no data yet
    return <TableSkeleton />;
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // MUI's SelectChangeEvent is a bit tricky with generics for the direct event.target.value
  const handlePageSizeChange = (event: any) => {
    const newPageSize = parseInt(event.target.value as string, 10);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to page 1 when page size changes
  };

  return (
    <Box sx={{ padding: 2 }} position="relative">
      <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
        <Table sx={{ minWidth: 650 }} aria-label="music library table">
          <TableBody>
            {musicData.map((row) => (
              <TableRow
                key={row.music_id}
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
      {/* Pagination Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          flexWrap: "wrap", // Allow wrapping on smaller screens
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="page-size-select-label">Items/Page</InputLabel>
          <Select
            labelId="page-size-select-label"
            id="page-size-select"
            value={pageSize.toString()}
            label="Items/Page"
            onChange={handlePageSizeChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: { xs: 2, md: 0 } }} // Add margin top on extra small screens
        />

        <Typography variant="body2" sx={{ m: 1, minWidth: 100, textAlign: 'right' }}>
          Page {currentPage} of {totalPages}
        </Typography>
      </Box>
    </Box>
  );
}
