"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";

const TableSkeleton = () => {
  // 模拟 5 行数据
  const rows = Array.from({ length: 15 });

  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
        <Table sx={{ minWidth: 650 }} aria-label="loading music library table">
          <TableBody>
            {rows.map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton
                    variant="rectangular"
                    width={50}
                    height={50}
                    sx={{ borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Box>
                    <Skeleton variant="text" width="80%" height={30} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        variant="rectangular"
                        width={60}
                        height={24}
                        sx={{ borderRadius: 16 }}
                      />
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableSkeleton; 