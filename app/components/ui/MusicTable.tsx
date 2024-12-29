import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid2 as Grid,
    Chip,
  } from "@mui/material";
  import { fetchFilteredMusicCardData } from "@/app/lib/processMusicCardData";
  import Image from "next/image";
  import {
    TitleTypography,
    ArtistTypography,
  } from "@/app/components/ui/TypographyWithTheme";


  export default async function MusicTable ({
    query,
  }: {
    query: string;
  }) {
    
    const musicData = await fetchFilteredMusicCardData(query);  
    return (
      <Box sx={{ padding: 2 }}>
        <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
          <Table sx={{ minWidth: 650 }} aria-label="music library table">
            <TableBody>
              {musicData.map((row) => (
                <TableRow key={row.music_id}>
                  <TableCell>
                    <Image
                      src={row.image_url}
                      alt={row.music_title}
                      width={50}
                      height={50}
                      style={{ objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Grid container>
                      <Grid size="grow">
                        <TitleTypography>{row.music_title}</TitleTypography>
                        <ArtistTypography>{row.original_artist}</ArtistTypography>
                      </Grid>
                    </Grid>
                  </TableCell>
  
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                      {row.tags.map((tag) => (
                        <Chip
                          key={`${row.music_id}-${tag}`}
                          label={tag}
                        />
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  