"use client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Container,
  ThemeProvider,
  Button,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { lightTheme, darkTheme } from "../theme";
import { useState } from "react";
import { Footer } from "@/app/components/Footer/Footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar
          position="static"
          
        >
          <Toolbar>
            <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
              <Brightness4Icon
                sx={{
                  color: isDarkMode ? "primary.main" : "primary.contrastText",
                }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{  backgroundColor: "background.default",display: "flex",flexGrow: 1, }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
