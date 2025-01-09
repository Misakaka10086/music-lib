"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { useCopyToClipboard } from "@/app/lib/copyToClipboard";
import { useState } from "react";
import CardSkeleton from "./CardSkeleton";
import { useMusicData } from "@/app/hooks/useMusicData";

export default function MusicCard() {
  const [animatingCards, setAnimatingCards] = useState<Set<string>>(new Set());
  const { filteredData, loading } = useMusicData();
  const copyToClipboard = useCopyToClipboard();

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
      position="relative"
    >
      {filteredData.map((music) => (
        <div
          key={music.music_id}
          className={
            animatingCards.has(music.music_id) ? "bounce-animation" : ""
          }
        >
          <Card
            sx={{
              display: "flex",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
            }}
            onClick={() => {
              copyToClipboard(music.music_title);
              setAnimatingCards((prev) => {
                const newSet = new Set(prev);
                newSet.add(music.music_id);
                setTimeout(() => {
                  setAnimatingCards((current) => {
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
                <Box
                  sx={{ mt: 1, display: "flex", gap: 0.5, flexWrap: "wrap" }}
                >
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
