"use client";

import React from "react";
import { Card, CardContent, Box, Skeleton } from "@mui/material";

interface CardSkeletonProps {
  count?: number; // 设置骨架的数量
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ count = 12 }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 1,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} sx={{ display: "flex" }}>
          <Skeleton
            variant="rectangular"
            sx={{ width: 140, height: 140, flexShrink: 0, alignSelf: "center" }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <CardContent>
              <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
              <Box sx={{ mt: 1, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {Array.from({ length: 3 }).map((_, chipIndex) => (
                  <Skeleton
                    key={chipIndex}
                    variant="rounded"
                    width={60}
                    height={24}
                    sx={{ borderRadius: 12 }}
                  />
                ))}
              </Box>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default CardSkeleton;
