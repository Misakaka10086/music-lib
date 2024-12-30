import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Container,
} from "@mui/material";
import {
  fetchAllMusicCardData,
  fetchFilteredMusicCardData,
} from "@/app/lib/processMusicCardData";
import TestSkeleton from "@/app/components/ui/skeleton";
import { MusicCardData } from "@/app/components/MusicCard/types";
import { useCopyToClipboard } from "@/app/components/ui/copyToClipboard";

export default function MusicCard({ data }: { data: MusicCardData[] }) {
  const copyToClipboard = useCopyToClipboard();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 1,
      }}
      role="MusicCardContainer"
      aria-label="Music Card Container"
    >
      {data.map((music) => (
        <Card
          key={music.music_id}
          sx={{ display: "flex" }}
          onClick={() => {
            copyToClipboard(music.music_title);
          }}
          role="MusicCard"
          aria-label={music.music_title}
        >
          <CardMedia
            component="img"
            sx={{
              width: 140,
              height: 140,
              flexShrink: 0,
              objectFit: "cover",
              alignSelf: "center",
            }}
            image={music.image_url || "/placeholder.png"}
            alt={music.music_title}
          />
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {music.music_title}
              </Typography>
              <Typography variant="body2">{music.original_artist}</Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {music.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
