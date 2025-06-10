"use client";
// import Image from "next/image"; // Unused import
import styles from "./page.module.css";
// import Firefly from "./components/Firefly/Firefly"; // This component seems unused here, was it meant to be FireflyBackground?
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import "@fontsource/italianno";
// import SwirlBackground from "./components/SwirlBackground"; // Lazy loaded
// import ClickEffect from "./components/Effects/ClickEffect"; // Lazy loaded
import dynamic from "next/dynamic";

const SwirlBackground = dynamic(() => import("./components/SwirlBackground"), { ssr: false });
const ClickEffect = dynamic(() => import("./components/Effects/ClickEffect"), { ssr: false });


export default function Home() {
  const router = useRouter();
  return (
    <>
      <SwirlBackground />
      <ClickEffect />
      {/* The Firefly component import was present but Firefly itself was not used in the JSX.
          If FireflyBackground was intended, it's not used on this page per the original code.
          Keeping JSX as it was. */}
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
