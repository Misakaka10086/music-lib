"use client";

import React, { memo } from "react";
import {
  Box,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
  Divider,
  Paper,
} from "@mui/material";
import Image from "next/image";
import Grid from "@mui/material/Grid2";
import { styled, darken } from "@mui/material/styles";
import ActionButtons from "./ActionButtons";
import { MusicCardProps } from "./types";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

// // NoSSR wrapper
// interface NoSSRProps {
//   children: React.ReactNode;
// }

// const NoSSR = dynamic<NoSSRProps>(
//   () => Promise.resolve(({ children }: NoSSRProps) => <>{children}</>),
//   { ssr: false }
// );

// Styled Components Types
interface StyledProps {
  isMobile?: boolean;
}

interface LayoutProps {
  tags: React.ReactNode;
  actionButtons: React.ReactNode;
}

// Styled Components
const CardBase = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<StyledProps>(({ theme, isMobile }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  ...(isMobile && {
    flexDirection: "column",
    alignItems: "stretch",
  }),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 60,
  height: 60,
  borderRadius: theme.shape.borderRadius / 2,
  overflow: "hidden",
  marginRight: theme.spacing(1),
}));

const TagsContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<StyledProps>(({ theme, isMobile }) => ({
  display: "flex",
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(isMobile ? 1 : 0),
  flexWrap: "wrap",
}));

// Layout Components
const DesktopLayout = memo(({ tags, actionButtons }: LayoutProps) => (
  <>
    <Grid
      size={{ xs: 12, md: 6 }}
      sx={{ marginLeft: "auto" }}
      aria-label="Tags"
      role="gridcell"
    >
      {tags}
    </Grid>
    <Grid size={{ xs: 12, md: 2 }} aria-label="Action Buttons" role="gridcell">
      {actionButtons}
    </Grid>
  </>
));

DesktopLayout.displayName = "DesktopLayout";

const MobileLayout = memo(({ tags, actionButtons }: LayoutProps) => (
  <>
    <Grid size={{ xs: 12, md: 5 }}>{tags}</Grid>
    <Grid size={{ xs: 12, md: 2 }}>{actionButtons}</Grid>
  </>
));

MobileLayout.displayName = "MobileLayout";

// Responsive Layout Component
const ResponsiveLayout = memo(({ tags, actionButtons }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobile ? (
    <MobileLayout tags={tags} actionButtons={actionButtons} />
  ) : (
    <DesktopLayout tags={tags} actionButtons={actionButtons} />
  );
});

ResponsiveLayout.displayName = "ResponsiveLayout";

// Error Boundary Component
class MusicCardErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={2} textAlign="center">
          <Typography color="error">Failed to load music card</Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Main Component
const MusicCard = memo(
  ({
    music_id,
    image_url,
    music_title,
    original_artist,
    favorite = 0,
    tags = [],
    onDownload,
    onFavorite,
    onMoreOptions,
  }: MusicCardProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const fallbackImage = "/images/fallback-music.jpg";

    const { enqueueSnackbar } = useSnackbar();

    const copyToClipboard = (text: string) => {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            console.log(`Copied "${text}" to clipboard!`);
          })
          .catch((err) => {
            console.error("Failed to copy text using clipboard API:", err);
            fallbackCopyToClipboard(text); // 使用备用方案
          });
      } else {
        fallbackCopyToClipboard(text); // 使用备用方案
      }
    };

    const fallbackCopyToClipboard = (text: string) => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        console.log(`Fallback: Copied "${text}" to clipboard!`);
      } catch (err) {
        console.error("Fallback: Failed to copy text:", err);
      }
      document.body.removeChild(textarea);
    };
    const handleClickVariant = (text: string) => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(text, { variant: "success" });
    };

    const renderTags = (
      <TagsContainer isMobile={isMobile}>
        {Array.isArray(tags) &&
          tags.map((tag) => (
            <Chip key={`${music_id}-${tag}`} label={tag} size="small" />
          ))}
      </TagsContainer>
    );

    const actionButtons = (
      <ActionButtons
        onDownload={onDownload}
        onFavorite={onFavorite}
        onMoreOptions={onMoreOptions}
        isMobile={isMobile}
      />
    );

    return (
      <Box
        component="article"
        aria-label={`Music: ${music_title}`}
        role="MusicCard"
        sx={{
          "&:hover": {
            backgroundColor: theme.palette.surface.container,
          },
        }}
        onClick={() => {
          copyToClipboard("点歌 " + music_title);
          handleClickVariant("点歌 " + music_title + "   | 已复制到剪贴板");
        }}
      >
        <CardBase isMobile={isMobile}>
          <Grid
            container
            alignItems="center"
            spacing={1}
            direction={isMobile ? "column" : "row"}
            sx={{ flexGrow: 1 }}
          >
            <Grid
              size={{ xs: 12, md: 3 }}
              alignItems="center"
              direction="row"
              container
              spacing={3}
            >
              <Grid size="auto">
                <ImageContainer>
                  <Image
                    // src={image_url || '/Untitled-1.png'}
                    src={"/Untitled-1.png"}
                    alt={`Cover for ${music_title}`}
                    width={60}
                    height={60}
                    priority={false}
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== fallbackImage) {
                        target.src = fallbackImage;
                      }
                    }}
                  />
                </ImageContainer>
              </Grid>
              <Grid size="grow">
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.primary.main }}
                  noWrap
                  component="h3"
                >
                  {music_title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.secondary.main }}
                  noWrap
                >
                  {original_artist}
                </Typography>
              </Grid>
            </Grid>

            <ResponsiveLayout tags={renderTags} actionButtons={actionButtons} />
          </Grid>
        </CardBase>
        <Divider />
      </Box>
    );
  }
);

MusicCard.displayName = "MusicCard";

// Export wrapped component with error boundary
export default function SafeMusicCard(props: MusicCardProps) {
  return (
    <MusicCardErrorBoundary>
      <MusicCard {...props} />
    </MusicCardErrorBoundary>
  );
}
