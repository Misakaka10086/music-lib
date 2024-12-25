"use client";
import {
  Paper,
  Button,
  Box,
  Container,
  Stack,
  useScrollTrigger,
} from "@mui/material";
import { useState, useMemo } from "react";
import { buttonStyles } from "@/app/styles/buttonStyles";
import SearchInput from "@/app/components/SearchInput/SearchInput";
import { stickySearchStyle } from "@/app/components/SearchInput/searchInput";
export default function Home() {
  const trigger = useScrollTrigger();
  const buttonTop = useMemo(() => {
    return trigger ? 10 : 74; // 74 = AppBar height (64) + 10
  }, [trigger]);

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
      {Array(100)
        .fill(null)
        .map((_, index) => (
          <Button
            key={index}
            sx={{
              height: 10,
              width: 10,
              bgcolor: "primary.primaryContainer",
              p: 1,
              m: 1,
            }}
          >
            0000
          </Button>
        ))}
    </Container>
  );
}
