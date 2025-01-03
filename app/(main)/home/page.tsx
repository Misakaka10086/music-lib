"use client";

import { Box, Divider, styled } from "@mui/material";
import Search from "@/app/components/ui/search";
import { useState, useEffect } from "react";
import MusicTable from "@/app/components/MusicList/MusicTable";
import MusicCard from "@/app/components/MusicList/MusicCard";
import { useMediaQuery, useTheme } from "@mui/material";
import TagChip from "@/app/components/ui/TagChip";
import ClickEffect from "@/app/components/Effects/ClickEffect";
import FireflyBackground from "@/app/components/Effects/FireflyBackground";
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
      <ClickEffect />
      <FireflyBackground
        count={10}
        color="#E9FF97"
        minSize={1}
        maxSize={2}
        minSpeed={0.1}
        maxSpeed={0.25}
        glowSize={3}
        glowIntensity={0.5}
        curveIntensity={1.0}
        waveSpeed={0.001}
        speedVariation={0.3}
        accelerationFactor={0.06}
      />
      <Search placeholder="搜索你想听的歌曲 点击卡片复制点歌" />
      <TagChip />
      {isMobile ? <MusicCard /> : <MusicTable />}
    </Box>
  );
}
