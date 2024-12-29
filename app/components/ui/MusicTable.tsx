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
import { MusicCardData } from "@/app/components/MusicCard/types";
import { useCallback } from "react";
import { useCopyToClipboard } from "@/app/components/ui/copyToClipboard";

export default function MusicTable({ data }: { data: MusicCardData[] }) {
  const copyToClipboard = useCopyToClipboard();

  const handleRowClick = useCallback((musicTitle: string) => {
    copyToClipboard(musicTitle);
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
        <Table sx={{ minWidth: 650 }} aria-label="music library table">
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.music_id}
                hover={true}
                onClick={() => handleRowClick(row.music_title)}
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.surface.container + " !important",
                  },
                }}
              >
                <TableCell>
                  <Image
                    src={row.image_url}
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
    </Box>
  );
}
