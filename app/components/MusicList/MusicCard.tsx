"use client";

import {
  Card,
  CardContent,
  // CardMedia, // No longer directly used, Image from next/image will be used
  Typography,
  Chip,
  Box,
  // Removed Button, Select, MenuItem, FormControl, InputLabel, Pagination
  CircularProgress, // Added for loading more
} from "@mui/material";
import Image from "next/image";
import { useCopyToClipboard } from "@/app/lib/copyToClipboard";
import { useState, useEffect } from "react"; // Added useEffect
import CardSkeleton from "./CardSkeleton";
import { useMusicData } from "@/app/hooks/useMusicData";
import { useInView } from "react-intersection-observer"; // Added

export default function MusicCard() {
  const [animatingCards, setAnimatingCards] = useState<Set<string>>(new Set());
  const {
    musicData,
    loadMore,
    hasMore,
    initialLoading,
    loadingMore,
    pageSize, // Keep pageSize to determine number of skeletons
    // error, // Can be used to display error messages
  } = useMusicData();
  const copyToClipboard = useCopyToClipboard();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMore && !loadingMore && !initialLoading) {
      loadMore();
    }
  }, [inView, hasMore, loadMore, loadingMore, initialLoading]);

  // Show skeleton if initialLoading and no data yet
  if (initialLoading && musicData.length === 0) {
    return (
      <>
        <Box sx={{ padding: { xs: 1, sm: 2 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 1,
            }}
          >
            {[...Array(pageSize)].map((_, index) => (
              <CardSkeleton key={index} isCardVariant />
            ))}
          </Box>
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ padding: { xs: 1, sm: 2 } }}>
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
        {musicData.map((music) => (
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
            <Box sx={{
              width: 140,
              height: 140,
              flexShrink: 0,
              alignSelf: "center",
              position: 'relative' // Required for next/image with layout fill or fixed sizes if needed for styling control
            }}>
              <Image
                src={music.image_url || "/placeholder.png"}
                alt={music.music_title}
                width={140}
                height={140}
                style={{ objectFit: "cover" }} // Or use objectFit="cover" directly if preferred & supported
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <CardContent sx={{ flexGrow: 1 }}>
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

      {/* Intersection Observer Trigger & Loading Indicators */}
      <Box
        ref={ref}
        sx={{
          height: 80, // Increased height to make it a more reliable trigger and hold spinner
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2
        }}
      >
        {loadingMore && <CircularProgress />}
        {!loadingMore && !hasMore && musicData.length > 0 && (
          <Typography variant="body2" color="textSecondary">
            You've reached the end.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
