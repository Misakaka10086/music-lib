import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Container,
} from "@mui/material";
import { fetchAllMusicCardData, fetchFilteredMusicCardData } from "@/app/lib/processMusicCardData";
import TestSkeleton from "@/app/components/ui/skeleton";
import CopyToClipboardButton from "@/app/components/ui/copyToClipboardButton";

export default async function MusicCard({
  query,
}: {
  query: string;
}) {

  const musicData = await fetchFilteredMusicCardData(query);

  return (
      <Box
        sx={{
          p: 2,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 2,
        }}
      >
        {musicData.map((music) => (
          <CopyToClipboardButton key={music.music_id} textToCopy={music.music_title}>
            <Card sx={{ display: "flex"}}>
              <CardMedia
                component="img"
                sx={{
                  width: 140,
                  height: 140,
                  flexShrink: 0,
                  objectFit: "cover",
                  alignSelf: "center",
                }}
                image="/Untitled-1.png"
                alt={music.music_title}
              />
              <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {music.music_title}
                  </Typography>
                  <Typography variant="body2">
                    {music.original_artist}
                  </Typography>
                  <Box
                    sx={{ mt: 1, display: "flex", gap: 0.5, flexWrap: "wrap" }}
                  >
                    {music.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </CopyToClipboardButton>
        ))}
      </Box>
  );
}