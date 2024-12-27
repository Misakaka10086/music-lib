import { useState, useEffect } from 'react';
import { Modal, Box, Button, Badge, Avatar, TextField, Chip } from '@mui/material';
import { fetchMusicCardDataByMusicId, updateMusicCardDataByMusicId } from '@/app/lib/fetchMusicCardData';

const EditMusicCard = ({ open, onClose, music_id, onSave }) => {
  const [currentTags, setCurrentTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [musicData, setMusicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  // Fetch music data when music_id changes
  useEffect(() => {
    if (music_id) {
      const fetchData = async () => {
        try {
          const data = await fetchMusicCardDataByMusicId(music_id);
          if (data) {
            setMusicData(data);
            setCurrentTags(data.tags);
          }
        } catch (error) {
          console.error("Error fetching music data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [music_id]);

  // Update state when musicData changes
  useEffect(() => {
    if (musicData) {
      setTitle(musicData.music_title);
      setArtist(musicData.original_artist);
    }
  }, [musicData]);

  const handleAddTag = () => {
    if (newTag.trim() && !currentTags.includes(newTag)) {
      setCurrentTags([...currentTags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setCurrentTags(currentTags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = async () => {
    try {
      if (!musicData || !title.trim() || !artist.trim()) {
        console.error("Invalid data:", { musicData, title, artist });
        return;
      }

      const updatedData = {
        ...musicData,
        music_title: title,
        original_artist: artist,
        tags: currentTags,
      };

      const result = await updateMusicCardDataByMusicId(updatedData);
      if (!result) {
        throw new Error("Update operation returned falsy result");
      }

      onSave(updatedData);
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading || !musicData) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Badge
            badgeContent={musicData.favorite}
            color="error"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Avatar src={musicData.image_url} sx={{ width: 60, height: 60 }} />
          </Badge>
          <Button variant="contained" color="primary">
            Upload Image
          </Button>
        </Box>

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Box sx={{ mt: 2 }}>
          {currentTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <TextField
            label="New Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleAddTag}>
            Add
          </Button>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditMusicCard;
