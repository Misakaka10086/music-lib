"use client";

import {
  Card,
  CardContent,
  // CardMedia, // No longer directly used, Image from next/image will be used
  Typography,
  Chip,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  // Typography, // Removed from second import block
} from "@mui/material";
import Image from "next/image"; // Import next/image
import { useCopyToClipboard } from "@/app/lib/copyToClipboard";
import { useState } from "react";
import CardSkeleton from "./CardSkeleton";
import { useMusicData } from "@/app/hooks/useMusicData";

export default function MusicCard() {
  const [animatingCards, setAnimatingCards] = useState<Set<string>>(new Set());
  const {
    musicData, // Renamed from filteredData
    loading,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
  } = useMusicData();
  const copyToClipboard = useCopyToClipboard();

  if (loading && musicData.length === 0) { // Show skeleton if loading and no data yet
    return (
      <>
        {/* Keep the outer box for layout consistency during skeleton display if needed */}
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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handlePageSizeChange = (event: any) => {
    const newPageSize = parseInt(event.target.value as string, 10);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to page 1
  };

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
      {/* Pagination Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingY: 2,
          paddingX: { xs: 0, sm: 1 }, // Less padding on X for mobile
          marginTop: 2,
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="card-page-size-select-label">Items/Page</InputLabel>
          <Select
            labelId="card-page-size-select-label"
            id="card-page-size-select"
            value={pageSize.toString()}
            label="Items/Page"
            onChange={handlePageSizeChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: { xs: 2, md: 0 } }}
        />

        <Typography variant="body2" sx={{ m: 1, minWidth: {xs: 'auto', md: 100}, textAlign: {xs: 'center', md: 'right'}, width: {xs: '100%', md: 'auto'} }}>
          Page {currentPage} of {totalPages}
        </Typography>
      </Box>
    </Box>
  );
}
