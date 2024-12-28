"use client";
import {
  Paper,
  Button,
  Box,
  Container,
  Stack,
  useScrollTrigger,
} from "@mui/material";
import { useState, useMemo, useCallback, useEffect, memo } from "react";
import { buttonStyles } from "@/app/styles/buttonStyles";
import SearchInput from "@/app/components/SearchInput/SearchInput";
import { stickySearchStyle } from "@/app/components/SearchInput/searchInput";
import { MusicCardData } from "@/app/components/MusicCard/types";
import MusicCard from "@/app/components/MusicCard/MusicCard";
import { useInView } from "react-intersection-observer";
import { fetchAllMusicCardData } from "@/app/lib/processMusicCardData";
import MusicCardSkeleton from "@/app/components/MusicCard/Skeleton";

// 将 MusicCard 列表提取为单独的组件
const MusicCardList = memo(({ 
  musicData, 
  onMoreOptions 
}: { 
  musicData: MusicCardData[],
  onMoreOptions: (id: string) => void 
}) => {
  return (
    <Box>
      {musicData.map((music) => (
        <Box key={music.music_id} sx={{ mb: 2 }}>
          <MusicCard
            {...music}
            onDownload={() => console.log(`Download ${music.music_id}`)}
            onFavorite={() => console.log(`Favorite ${music.music_id}`)}
            onMoreOptions={() => onMoreOptions(music.music_id)}
          />
        </Box>
      ))}
    </Box>
  );
});

MusicCardList.displayName = 'MusicCardList';

export default function Home() {
  const trigger = useScrollTrigger();
  const [musicData, setMusicData] = useState<MusicCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const buttonTop = useMemo(() => {
    return trigger ? 10 : 74; // 74 = AppBar height (64) + 10
  }, [trigger]);

    // Initial data loading
    useEffect(() => {
      const fetchData = async () => {
        const startTime = performance.now();
        try {
          setLoading(true);
          const data = await fetchAllMusicCardData(Number.MAX_SAFE_INTEGER, 1);
          setMusicData(data);
        } catch (err) {
          setError("Failed to load music data");
          console.error("Error loading music data:", err);
        } finally {
          setLoading(false);
          console.log('Initial data loading took:', performance.now() - startTime, 'ms');
        }
      };
  
      fetchData();
    }, []);

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
      <Box sx={{ p: 2, minHeight:'100vh'}}>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MusicCardSkeleton key={index} />
          ))
        ) : (
          <MusicCardList 
            musicData={musicData}
            onMoreOptions={() => console.log('More options')}
          />
        )}
      </Box>
    </Container>
  );
}
