"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createMusicRecord,
  readMusicRecord,
  updateMusicRecord,
  deleteMusicRecord,
  listMusicRecords,
} from "@/app/lib/data_edit";
import { MusicCardData } from "@/app/components/MusicList/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";

interface MusicCRUDProps {
  // Add any props if needed
}

export default function MusicCRUD({}: MusicCRUDProps) {
  const [musicList, setMusicList] = useState<MusicCardData[]>([]);
  const [formData, setFormData] = useState<MusicCardData>({
    music_id: "",
    image_url: "",
    music_title: "",
    original_artist: "",
    favorite: 0,
    tags: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Load all music records on mount
  useEffect(() => {
    loadMusicRecords();
  }, []);

  const loadMusicRecords = async () => {
    const records = await listMusicRecords();
    setMusicList(records);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const incrementFavorite = () => {
    setFormData((prev) => ({
      ...prev,
      favorite: (prev.favorite || 0) + 1,
    }));
  };

  const decrementFavorite = () => {
    setFormData((prev) => ({
      ...prev,
      favorite: Math.max((prev.favorite || 0) - 1, 0),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateMusicRecord(formData);
      } else {
        const { music_id, ...newRecord } = formData;
        await createMusicRecord(newRecord);
      }
      resetForm();
      loadMusicRecords();
    } catch (error) {
      console.error("Error saving music record:", error);
    }
  };

  const handleEdit = async (musicId: string) => {
    const record = await readMusicRecord(musicId);
    if (record) {
      setFormData(record);
      setIsEditing(true);
    }
  };

  const handleDelete = async (musicId: string) => {
    await deleteMusicRecord(musicId);
    loadMusicRecords();
  };

  const resetForm = () => {
    setFormData({
      music_id: "",
      image_url: "",
      music_title: "",
      original_artist: "",
      favorite: 0,
      tags: [],
    });
    setNewTag("");
    setIsEditing(false);
  };

  const handleSearch = () => {
    const filtered = musicList.filter(
      (music) =>
        music.music_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        music.original_artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMusicList(filtered);
  };

  const resetSearch = () => {
    loadMusicRecords();
    setSearchQuery("");
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Form Section */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Music Title"
            name="music_title"
            value={formData.music_title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Original Artist"
            name="original_artist"
            value={formData.original_artist}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Image URL"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          {/* Favorite Field */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={decrementFavorite}
              disabled={formData.favorite === 0}
            >
              <FavoriteBorderIcon />
            </IconButton>
            <Typography variant="body1">
              Favorites: {formData.favorite}
            </Typography>
            <IconButton onClick={incrementFavorite}>
              <FavoriteIcon color="error" />
            </IconButton>
          </Box>
        </Box>

        {/* Tags Field */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Tags
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={addTag}
              disabled={!newTag.trim()}
            >
              Add
            </Button>
            <TextField
              label="New Tag"
              value={newTag}
              onChange={handleTagChange}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              fullWidth
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, ml: 2 }}>
              {formData.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Form Actions */}
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            {isEditing ? "Update" : "Create"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            size="large"
            onClick={resetForm}
          >
            Reset
          </Button>
        </Box>
      </Box>

      {/* Search Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Chip
          label={`Total: ${musicList.length}`}
          color="primary"
          variant="outlined"
        />
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          fullWidth
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button variant="outlined" onClick={resetSearch}>
          Reset
        </Button>
      </Box>

      {/* List Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Favorite</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {musicList.map((music) => (
              <TableRow key={music.music_id}>
                <TableCell>{music.music_title}</TableCell>
                <TableCell>{music.original_artist}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FavoriteIcon
                      color={music.favorite > 0 ? "error" : "disabled"}
                    />
                    <Typography variant="body2">{music.favorite}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    {music.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(music.music_id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(music.music_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
