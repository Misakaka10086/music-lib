"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import {
  fetchAllMusicCardData,
} from "@/app/lib/processMusicCardData";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import { MusicCardData } from "@/app/components/MusicCard/types";
import { useCopyToClipboard } from "@/app/components/ui/copyToClipboard";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MusicCard() {
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

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 1,
      }}
      role="MusicCardContainer"
      aria-label="Music Card Container"
    >
      {filteredData.map((music) => (
        <Card
          key={music.music_id}
          sx={{ display: "flex" }}
          onClick={() => {
            copyToClipboard(music.music_title);
          }}
          role="MusicCard"
          aria-label={music.music_title}
        >
          <CardMedia
            component="img"
            sx={{
              width: 140,
              height: 140,
              flexShrink: 0,
              objectFit: "cover",
              alignSelf: "center",
            }}
            image={music.image_url || "/placeholder.png"}
            alt={music.music_title}
          />
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {music.music_title}
              </Typography>
              <Typography variant="body2">{music.original_artist}</Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {music.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
