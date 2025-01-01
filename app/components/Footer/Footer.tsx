import { Box, Container, Typography, Link, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import { BilibiliIconBox, TikTokIconBox } from "@/app/components/CustomeIcon/IconBox";
import "@fontsource/italianno";
import Image from "next/image";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.surface.container,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left section */}
          <Stack spacing={2} direction="row">
            <GitHubIcon sx={{ color: "primary.main" }} />
            <YouTubeIcon sx={{ color: "primary.main" }} />
            <XIcon sx={{ color: "primary.main" }} />
            <BilibiliIconBox sx={{ color: "primary.main" }}/>
            <TikTokIconBox sx={{ color: "primary.main" }}/>
          </Stack>

          {/* Center section */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="body2"
              color="primary.main"
              fontFamily="Italianno"
              fontSize="2.5rem"
              sx={{ userSelect: "none" }}
            >
              TangYuXiaoBao i
            </Typography>
          </Stack>
          <Stack></Stack>
        </Stack>
      </Container>
    </Box>
  );
};
