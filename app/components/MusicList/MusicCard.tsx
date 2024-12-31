"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { fetchAllMusicCardData } from "@/app/lib/processMusicCardData";
import { MusicCardData } from "@/app/components/MusicList/types";
import { useCopyToClipboard } from "@/app/lib/copyToClipboard";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import CardSkeleton from "./CardSkeleton";
import Fuse from "fuse.js";

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
      } catch (error) {
        console.error("Error fetching music data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Initialize Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(allMusicData, {
      keys: ["music_title", "original_artist", "tags"],
      threshold: 0.3, // Adjust threshold as needed
    });
  }, [allMusicData]);

  // Filter data based on search query
  useEffect(() => {
    const query = searchParams.get("q")?.toLowerCase() || "";
    if (!query.trim()) {
      setFilteredData(allMusicData);
      return;
    }

    // Split the query into individual words
    const queryWords = query.split(/\s+/).filter(word => word.trim() !== '');

    if (queryWords.length === 0) {
      setFilteredData(allMusicData);
      return;
    }

    // Search for each word
    const resultsByWord = queryWords.map(word =>
      fuse.search(word).map(result => result.item)
    );

    // Find the intersection of the results
    let intersection = allMusicData;
    resultsByWord.forEach(results => {
      intersection = intersection.filter(item => results.includes(item));
    });

    setFilteredData(intersection);

  }, [searchParams, fuse]);

  if (loading) {
    return <CardSkeleton />;
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
