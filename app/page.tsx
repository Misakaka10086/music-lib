"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Firefly from "./components/Firefly/Firefly";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import "@fontsource/italianno";
export default function Home() {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        backgroundColor:"#171216"
      }}
    >
      <Firefly />
      <Typography
        variant="body2"
        color="#ffbbef"
        fontFamily="Italianno"
        fontSize="8rem"
      >
        Welcome
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => router.push("/home")}
        sx={{
          backgroundColor: "#ffbbef",
          color: "black",
        }}
      >
        进入选歌台
      </Button>
    </Box>
  );
}
