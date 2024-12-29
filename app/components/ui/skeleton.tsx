"use client";

import { Box, Skeleton } from "@mui/material";

const TestSkeleton = () => {
  return (
    <Box sx={{ p: 2, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
      {Array.from({ length: 15 }).map((_, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2 }}>
          <Skeleton
            variant="rectangular"
            width={140}
            height={140}
            sx={{ borderRadius: 1 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="60%" height={30} />
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Skeleton variant="rectangular" width={60} height={24} />
              <Skeleton variant="rectangular" width={60} height={24} />
              <Skeleton variant="rectangular" width={60} height={24} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TestSkeleton;