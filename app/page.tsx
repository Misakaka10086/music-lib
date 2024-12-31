"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Firefly from "./components/Firefly/Firefly";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import "@fontsource/italianno";
import SwirlBackground from "./components/SwirlBackground";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <SwirlBackground />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          background: "transparent",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          variant="body2"
          color="#ffbbef"
          fontFamily="Italianno"
          fontSize="8rem"
          sx={{
            textShadow: "0 0 10px rgba(255, 187, 239, 0.5)",
          }}
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
    </>
  );
}
