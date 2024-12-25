"use client";
import { Paper, Button, Box, Container, Stack } from "@mui/material";
import { useState } from "react";
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        gap: 2,
        alignItems: "flex-start",
      }}
    >
      <Stack direction="column" spacing={2}>
      <Box>
        <Button variant="contained" color="primary">
          primary
        </Button>
      <Button variant="contained" color="secondary">
        secondary
      </Button>
      <Button variant="contained" color="error">
        error
      </Button>
      <Button variant="contained" color="warning">
        warning
        </Button>
      </Box>
      <Box>
        <Button variant="outlined" color="primary">
          primary
        </Button>
      <Button variant="outlined" color="secondary">
        secondary
      </Button>
      <Button variant="outlined" color="error">
        error
      </Button>
      <Button variant="outlined" color="warning">
        warning
        </Button>
      </Box>
      </Stack>
      {Array(100)
        .fill(null)
        .map((_, index) => (
          <br key={index} />
        ))}
    </Container>
  );
}
