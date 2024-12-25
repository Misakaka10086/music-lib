"use client";
import { Paper, Button, Box, Container, Stack, useScrollTrigger } from "@mui/material";
import { useState, useMemo } from "react";
import { buttonStyles } from "@/app/styles/buttonStyles";

export default function Home() {
  const trigger = useScrollTrigger();
  const buttonTop = useMemo(() => {
    return trigger ? 10 : 74;  // 74 = AppBar height (64) + 10
  }, [trigger]);

  return (
    <Container>
      <Button
        variant="contained"
        sx={{ 
          position: "sticky", 
          top: buttonTop,
          zIndex: 10,
          transition: 'top 0.3s',
          bgcolor: 'primary.primaryContainer',
          color: 'primary.onPrimaryContainer',
        }}
      >
        primary
      </Button>

      {Array(100)
        .fill(null)
        .map((_, index) => (
          <br key={index} />
        ))}
    </Container>
  );
}
