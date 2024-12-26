"use client";
import { Box } from "@mui/material";
import MusicCard from "@/app/components/MusicCard/MusicCard";
import fetchAllMusicCardData from "@/app/lib/fetchMusicCardData"; // Import the function
import { useEffect, useState } from "react";
import { MusicCardData } from "@/app/components/MusicCard/types";

export default function Home() {
  const [musicData, setMusicData] = useState<MusicCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMusicData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllMusicCardData();
        setMusicData(data);
      } catch (err) {
        console.error("Error fetching music data:", err);
        setError("Failed to load music data.");
      } finally {
        setLoading(false);
      }
    };

    loadMusicData();
  }, []);

  if (loading) {
    return <Box sx={{ p: 2, textAlign: "center" }}>Loading music data...</Box>;
  }

  if (error) {
    return <Box sx={{ p: 2, textAlign: "center", color: "error.main" }}>{error}</Box>;
  }

  return (
    <Box sx={{ p: 2, overflow: "auto" }}>
      {musicData.map((music) => (
        <MusicCard
          key={music.music_id}
          {...music}
          onDownload={() => console.log(`Download ${music.music_id}`)}
          onFavorite={() => console.log(`Favorite ${music.music_id}`)}
          onMoreOptions={() => console.log(`More options for ${music.music_id}`)}
        />
      ))}
    </Box>
  );
}
