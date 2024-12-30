"use client";

import { Box } from "@mui/material";
import Search from "@/app/components/ui/search";
import { useState, useEffect } from "react";
import MusicTable from "@/app/components/ui/MusicTable";
import MusicCard from "@/app/components/ui/MusicCard";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md breakpoint or smaller

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ p: 1 }}>
      <Search placeholder="搜索你想听的歌曲 点击卡片复制点歌" />
      {isMobile ? <MusicCard /> : <MusicTable />}
    </Box>
  );
}
