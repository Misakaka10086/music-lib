import { Box, Container, Typography, Link, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import "@fontsource/italianno";
export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.surface.surfaceContainer,
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
          </Stack>

          {/* Center section */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="body2"
              color="primary.main"
              fontFamily="Italianno"
              fontSize="2rem"
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
