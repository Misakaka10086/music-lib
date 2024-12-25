"use client";
import { Paper, Button } from "@mui/material";
import { useState } from "react";
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Paper elevation={3} sx={{ p: 2, overflow: "auto" }}>
      {/* <Button variant="contained" color="primary" onClick={() => setIsDarkMode(!isDarkMode)}>
        Click me
      </Button> */}
      <Button
        variant="contained"
        color="primary"
        sx={{ position: "sticky", top: 50, zIndex: 1 }}
      >
        Click me
      </Button>
      <Button> Click me </Button>
      <Button> Click me </Button>
      <Button> Click me </Button>
      {Array(100)
        .fill(null)
        .map((_, index) => (
          <br key={index} />
        ))}
    </Paper>
  );
}
