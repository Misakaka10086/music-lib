"use client";
import { useTheme, Typography } from "@mui/material";

export  function TitleTypography({ children }) {
  const theme = useTheme();
  const color = theme.palette.primary.main;

  return (
    <Typography variant="subtitle1" style={{ color }}>
      {children}
    </Typography>
  );
}
export  function ArtistTypography({ children }) {
  const theme = useTheme();
  const color = theme.palette.secondary.main;

  return (
    <Typography variant="body2" style={{ color }}>
      {children}
    </Typography>
  );
}