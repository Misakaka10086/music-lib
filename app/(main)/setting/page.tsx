"use client";
import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Button, Container, useScrollTrigger } from "@mui/material";
import MusicCard from "@/app/components/MusicCard/MusicCard";
import { fetchAllMusicCardData } from "@/app/lib/processMusicCardData";
import { useEffect, useState, useCallback, useMemo } from "react";
import { MusicCardData } from "@/app/components/MusicCard/types";
import MusicCardSkeleton from "@/app/components/MusicCard/Skeleton";
import { useInView } from "react-intersection-observer";
import { stickySearchStyle } from '@/app/components/SearchInput/searchInput';
import SearchInput from '@/app/components/SearchInput/SearchInput';
import EditMusicCard from "@/app/components/setting/EditMusicCard";

const PAGE_SIZE = 15; // Number of items to load per page

export default function SettingPage() {
  const { user, isLoading } = useUser();
  const [musicData, setMusicData] = useState<MusicCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreData = useCallback(async () => {
    if (!hasMore) return;
    
    setLoading(true);
    try {
      const newData = await fetchAllMusicCardData(PAGE_SIZE, page);

      setMusicData((prev) => [...prev, ...newData]);
      
      setPage((prev) => prev + 1);
      
      setHasMore(newData.length === PAGE_SIZE);
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

  if (error) {
    return <Box sx={{ p: 2, textAlign: "center", color: "error.main" }}>{error}</Box>;
  }
  const trigger = useScrollTrigger();
  const buttonTop = useMemo(() => {
    return trigger ? 10 : 74; // 74 = AppBar height (64) + 10
  }, [trigger]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMusicId, setSelectedMusicId] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllMusicCardData(PAGE_SIZE, 1);
      setMusicData(data);
    };
    fetchData();
  }, []);

  // Handle save callback
  const handleSave = (updatedData: MusicCardData) => {
    setMusicData((prevData) =>
      prevData.map((item) =>
        item.music_id === updatedData.music_id ? updatedData : item
      )
    );
    setModalOpen(false);
    setSelectedMusicId(null);
  };

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
        onMoreOptions={() => {
          setSelectedMusicId(music.music_id);
          setModalOpen(true);
        }}
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

  {selectedMusicId && (
    <EditMusicCard
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        setSelectedMusicId(null);
      }}
      music_id={selectedMusicId}
      onSave={handleSave}
    />
  )}
  </Container>
  );
}
