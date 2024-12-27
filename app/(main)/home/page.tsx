"use client";
import {
  Paper,
  Button,
  Box,
  Container,
  Stack,
  useScrollTrigger,
} from "@mui/material";
import { useState, useMemo, useCallback, useEffect } from "react";
import { buttonStyles } from "@/app/styles/buttonStyles";
import SearchInput from "@/app/components/SearchInput/SearchInput";
import { stickySearchStyle } from "@/app/components/SearchInput/searchInput";
import { MusicCardData } from "@/app/components/MusicCard/types";
import MusicCard from "@/app/components/MusicCard/MusicCard";
import { useInView } from "react-intersection-observer";
import { fetchAllMusicCardData } from "@/app/lib/fetchMusicCardData";
import MusicCardSkeleton from "@/app/components/MusicCard/Skeleton";

const PAGE_SIZE = 5; // Number of items to load per page

export default function Home() {
  const trigger = useScrollTrigger();
  const [musicData, setMusicData] = useState<MusicCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const buttonTop = useMemo(() => {
    return trigger ? 10 : 74; // 74 = AppBar height (64) + 10
  }, [trigger]);
  const loadMoreData = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const data = await fetchAllMusicCardData(PAGE_SIZE, page);
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const newData = data.slice(startIndex, endIndex);

      setMusicData((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
      setHasMore(endIndex < data.length);
    } catch (err) {
      console.error("Error fetching music data:", err);
      setError("Failed to load music data.");
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreData();
    }
  }, [inView, hasMore, loadMoreData]);
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
        {musicData.map((music, index) => (
          <MusicCard
            key={`${music.music_id}-${index}`}
            {...music}
            onDownload={() => console.log(`Download ${music.music_id}`)}
            onFavorite={() => console.log(`Favorite ${music.music_id}`)}
            onMoreOptions={() =>
              console.log(`More options for ${music.music_id}`)
            }
          />
        ))}

        {hasMore && (
          <Box ref={ref} sx={{ p: 2 }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <MusicCardSkeleton key={index} />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
