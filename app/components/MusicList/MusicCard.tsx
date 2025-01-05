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
  const [animatingCards, setAnimatingCards] = useState<Set<string>>(new Set());
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

    // First, perform a search for the entire query string
    const exactSearchResults = fuse.search(query.trim()).map(result => result.item);

    // If the query contains multiple words, perform an intersection search
    const queryWords = query.trim().split(/\s+/).filter(word => word.trim() !== '');
    let intersectionResults: MusicCardData[] = [];

    if (queryWords.length > 1) {
      const resultsByWord = queryWords.map(word =>
        fuse.search(word).map(result => result.item)
      );

      intersectionResults = allMusicData.filter(item =>
        resultsByWord.every(results => results.includes(item))
      );
    }

    // Combine the results, prioritizing exact matches and avoiding duplicates
    const combinedResults = [
      ...exactSearchResults,
      ...intersectionResults.filter(item => !exactSearchResults.includes(item))
    ];

    setFilteredData(combinedResults);

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
        <div
          key={music.music_id}
          className={animatingCards.has(music.music_id) ? 'bounce-animation' : ''}
        >
          <Card
            sx={{ 
              display: "flex",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out"
            }}
            onClick={() => {
              copyToClipboard(music.music_title);
              setAnimatingCards(prev => {
                const newSet = new Set(prev);
                newSet.add(music.music_id);
                setTimeout(() => {
                  setAnimatingCards(current => {
                    const updatedSet = new Set(current);
                    updatedSet.delete(music.music_id);
                    return updatedSet;
                  });
                }, 800);
                return newSet;
              });
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
        </div>
      ))}
    </Box>
  );
}
