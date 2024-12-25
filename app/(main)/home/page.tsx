"use client";
import {
  Paper,
  Button,
  Box,
  Container,
  Stack,
  useScrollTrigger,
} from "@mui/material";
import { useState, useMemo } from "react";
import { buttonStyles } from "@/app/styles/buttonStyles";
import SearchInput from "@/app/components/SearchInput/SearchInput";
import { stickySearchStyle } from "@/app/components/SearchInput/searchInput";

import MusicCard from "@/app/components/MusicCard/MusicCard";
// Mock data for testing
const mockMusicData = [
  {
    music_id: "1",
    image_url: "https://picsum.photos/100/100", // Using next.js logo as placeholder
    music_title: "Test Music 1",
    original_artist: "Artist 1",
    favorite: 0,
    tags: [
      "Pop",
      "Rock",
      "Rock1",
      "Rock2",
      "Rock3",
      "Rock4",
      "Rock5",
      "Rock6",
      "Rock7",
      "Rock8",
      "Rock9",
      "Rock10",
    ],
    onDownload: () => console.log("Download 1"),
    onFavorite: () => console.log("Favorite 1"),
    onMoreOptions: () => console.log("More 1"),
  },
  {
    music_id: "2",
    image_url: "https://picsum.photos/100/100", // Using vercel logo as placeholder
    music_title: "Test Music 2",
    original_artist: "Artist 2",
    favorite: 1,
    tags: ["Jazz", "Blues"],
    onDownload: () => console.log("Download 2"),
    onFavorite: () => console.log("Favorite 2"),
    onMoreOptions: () => console.log("More 2"),
  },
];

export default function Home() {
  const trigger = useScrollTrigger();
  const buttonTop = useMemo(() => {
    return trigger ? 10 : 74; // 74 = AppBar height (64) + 10
  }, [trigger]);

  return (
    <Container
      sx={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          ...stickySearchStyle(buttonTop),
          transition: "top 0.3s",
          borderRadius: "1000px",
        }}
      >
        <SearchInput />
      </Box>
      <Box sx={{ p: 2, overflow: "auto" }}>
        {mockMusicData.map((music) => (
          <MusicCard key={music.music_id} {...music} />
        ))}
        {mockMusicData.map((music) => (
          <MusicCard key={music.music_id} {...music} />
        ))}
      </Box>
    </Container>
  );
}
