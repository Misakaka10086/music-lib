"use client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  ThemeProvider,
  Button,
  Container,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { lightTheme, darkTheme } from "../theme";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Footer } from "@/app/components/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh",bgcolor: theme.palette.background.default }}>
        <AppBar>
          <Toolbar>
            <IconButton onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle dark mode">
              <Brightness4Icon sx={{ color: theme.palette.primary.contrastText }} />
            </IconButton>
            <Button component={Link} href="/home" sx={{ color: theme.palette.primary.contrastText }}>
              Home
            </Button>
            <Button component={Link} href="/setting" sx={{ color: theme.palette.primary.contrastText }}>
              Setting
            </Button>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ flexGrow: 1, pt:10 }}>
          {children}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
