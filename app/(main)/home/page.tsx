"use client";

import { Box } from "@mui/material";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import Search from "@/app/components/ui/search";
import { useState, useEffect } from "react";
import { fetchAllMusicCardData } from "@/app/lib/processMusicCardData";
import { MusicCardData } from "@/app/components/MusicCard/types";
import MusicTable from "@/app/components/ui/MusicTable";
import MusicCard from "@/app/components/ui/MusicCard";
import { useDebouncedCallback } from "use-debounce";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Page() {
  const [query, setQuery] = useState("");
  const [allMusicData, setAllMusicData] = useState<MusicCardData[]>([]);
  const [filteredData, setFilteredData] = useState<MusicCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md breakpoint or smaller

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Debounced search handler
  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setFilteredData(allMusicData);
      return;
    }
    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = allMusicData.filter((music) => {
      const title = music.music_title?.toLowerCase() || "";
      const artist = music.original_artist?.toLowerCase() || "";
      const tags = music.tags?.map((tag) => tag?.toLowerCase() || "") || [];

      return (
        title.includes(lowercaseQuery) ||
        artist.includes(lowercaseQuery) ||
        tags.some((tag) => tag.includes(lowercaseQuery))
      );
    });
    setFilteredData(filtered);
  }, 200);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <Box sx={{ p: 1 }}>
      <Search placeholder="搜索你想听的歌曲 点击可以复制点歌" onSearch={handleSearch} />
      {isMobile ? (
        <MusicCard data={filteredData} />
      ) : (
        <MusicTable data={filteredData} />
      )}
    </Box>
  );
}
