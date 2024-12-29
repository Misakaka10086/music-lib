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
  Zoom,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import HandymanIcon from "@mui/icons-material/Handyman";
import { lightTheme, darkTheme } from "../theme";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Footer } from "@/app/components/Footer/Footer";
import { SnackbarProvider } from "notistack";
import Fab from "@mui/material/Fab";
import { BilibiliOutlined } from "@ant-design/icons";
import Tooltip from "@mui/material/Tooltip";
import "@fontsource/zcool-kuaile";

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

  const handleOpenBilibili = () => {
    // 深度链接打开 YouTube 应用
    const bilibiliDeepLink = "bilibili://live/27257241"; // 如果未安装会失败
    const bilibiliWebFallback = "https://live.bilibili.com/27257241";

    // 尝试打开深度链接，若失败则跳转到网页
    window.location.href = bilibiliDeepLink;

    // 备选方案：在一定延迟后跳转到 Web 页面
    setTimeout(() => {
      window.location.href = bilibiliWebFallback;
    }, 3000);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: theme.palette.md3_other.background,
          minHeight: "100vh",
          display: "flex", // 使用 Flexbox 布局
          flexDirection: "column", // 纵向排列内容
        }}
      >
        <HideOnScroll>
          <AppBar
            sx={{
              bgcolor: (theme) => theme.palette.primary.fixed,
            }}
          >
            <Toolbar>
              <IconButton
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label="Toggle dark mode"
              >
                <Brightness4Icon
                  sx={{ color: theme.palette.primary.onFixed }}
                />
              </IconButton>
              <Link
                href="/home"
                passHref
                style={{
                  textDecoration: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <IconButton
                  sx={{
                    color: theme.palette.primary.onFixed,
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <HomeIcon />
                </IconButton>
              </Link>
              <Link
                href="/setting"
                passHref
                style={{
                  textDecoration: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <IconButton
                  sx={{
                    color: theme.palette.primary.onFixed,
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </Link>
              <Link
                href="/experiment"
                passHref
                style={{
                  textDecoration: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <IconButton
                  sx={{
                    color: theme.palette.primary.onFixed,
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <HandymanIcon />
                </IconButton>
              </Link>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            "& > :not(style)": { m: 1 },
            zIndex: 1000,
          }}
        >
          <Tooltip
            title="去直播间"
            placement="left"
            slots={{
              transition: Zoom,
            }}
          >
            <Fab color="primary" aria-label="add" onClick={handleOpenBilibili}>
              <BilibiliOutlined style={{ fontSize: 32 }} />
            </Fab>
          </Tooltip>
        </Box>

        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Container component="main" sx={{ pt: 10 }}>
            {children}
          </Container>
        </SnackbarProvider>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
