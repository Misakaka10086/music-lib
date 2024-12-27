"use client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  ThemeProvider,
  Button,
  Container,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { lightTheme, darkTheme } from "../theme";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Footer } from "@/app/components/Footer/Footer";

interface Props {
  children: React.ReactElement;
}

export function HideOnScroll(props: Props) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: theme.palette.md3_other.background,
        }}
      >
        <HideOnScroll>
          <AppBar
            sx={{
              bgcolor: (theme) => theme.palette.primary.primaryFixed,
            }}
          >
            <Toolbar>
              <IconButton
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label="Toggle dark mode"
              >
                <Brightness4Icon
                  sx={{ color: theme.palette.primary.onPrimaryFixed }}
                />
              </IconButton>
              <Link href="/home" passHref style={{ textDecoration: "none", WebkitTapHighlightColor: 'transparent' }}>
                <IconButton
                  sx={{ 
                    color: theme.palette.primary.onPrimaryFixed,
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <HomeIcon />
                </IconButton>
              </Link>
              <Link href="/setting" passHref style={{ textDecoration: "none", WebkitTapHighlightColor: 'transparent' }}>
                <IconButton
                  sx={{ 
                    color: theme.palette.primary.onPrimaryFixed,
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </Link>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Container component="main" sx={{ pt: 10 }}>
          {children}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
