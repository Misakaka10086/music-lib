"use client";
import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Button } from "@mui/material";
import MusicCard from "@/app/components/MusicCard/MusicCard";
import fetchAllMusicCardData from "@/app/lib/fetchMusicCardData";
import { useEffect, useState, useCallback } from "react";
import { MusicCardData } from "@/app/components/MusicCard/types";
import MusicCardSkeleton from "@/app/components/MusicCard/Skeleton";
import { useInView } from "react-intersection-observer";

const PAGE_SIZE = 5; // Number of items to load per page

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
      const data = await fetchAllMusicCardData();
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

  if (error) {
    return <Box sx={{ p: 2, textAlign: "center", color: "error.main" }}>{error}</Box>;
  }

  return (
    <Box sx={{ p: 2, overflow: "auto" }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {user && (
          <>
            <Box sx={{ mr: 2 }}>
              Welcome, {user.name || user.email}
            </Box>
            <Button 
              variant="outlined" 
              color="primary" 
              href="/api/auth/logout"
              size="small"
            >
              Logout
            </Button>
          </>
        )}
      </Box>

      {musicData.map((music, index) => (
        <MusicCard
          key={`${music.music_id}-${index}`}
          {...music}
          onDownload={() => console.log(`Download ${music.music_id}`)}
          onFavorite={() => console.log(`Favorite ${music.music_id}`)}
          onMoreOptions={() => console.log(`More options for ${music.music_id}`)}
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
  );
}
