"use client";

import { Box, Divider, styled } from "@mui/material";
import Search from "@/app/components/ui/search";
import { useState, useEffect } from "react";
import MusicTable from "@/app/components/MusicList/MusicTable";
import MusicCard from "@/app/components/MusicList/MusicCard";
import { useMediaQuery, useTheme } from "@mui/material";
import TagChip from "@/app/components/ui/TagChip";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ p: 1 }}>
      <Search placeholder="搜索你想听的歌曲 点击卡片复制点歌" />
      <TagChip />
      {isMobile ? <MusicCard /> : <MusicTable />}
    </Box>
  );
}
