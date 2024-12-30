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
import { useCallback, useState, useEffect } from "react";
import { useCopyToClipboard } from "@/app/components/ui/copyToClipboard";
import { useSearchParams } from "next/navigation";
import { fetchAllMusicCardData } from "@/app/lib/processMusicCardData";
import TableSkeleton from "@/app/components/ui/TableSkeleton";

export default function MusicTable() {
  const [allMusicData, setAllMusicData] = useState<MusicCardData[]>([]);
  const [filteredData, setFilteredData] = useState<MusicCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const copyToClipboard = useCopyToClipboard();

  // Fetch all music data once when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllMusicCardData(Number.MAX_SAFE_INTEGER, 1);
        setAllMusicData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching music data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter data based on search query
  useEffect(() => {
    const query = searchParams.get("q")?.toLowerCase() || "";
    if (!query.trim()) {
      setFilteredData(allMusicData);
      return;
    }

    const filtered = allMusicData.filter((music) => {
      const title = music.music_title?.toLowerCase() || "";
      const artist = music.original_artist?.toLowerCase() || "";
      const tags = music.tags?.map((tag) => tag?.toLowerCase() || "") || [];

      return (
        title.includes(query) ||
        artist.includes(query) ||
        tags.some((tag) => tag.includes(query))
      );
    });
    setFilteredData(filtered);
  }, [searchParams, allMusicData]);

  const handleRowClick = useCallback((musicTitle: string) => {
    copyToClipboard(musicTitle);
  }, [copyToClipboard]);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
        <Table sx={{ minWidth: 650 }} aria-label="music library table">
          <TableBody>
            {filteredData.map((row) => (
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
    </Box>
  );
}
