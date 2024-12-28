import { useState, useEffect, useCallback, useMemo, memo } from "react";
import {
  Modal,
  Box,
  Button,
  Badge,
  Avatar,
  TextField,
  Chip,
} from "@mui/material";
import {
  fetchMusicCardDataByMusicId,
  updateMusicCardDataByMusicId,
  deleteMusicCardDataByMusicId,
} from "@/app/lib/processMusicCardData";

const EditMusicCard = memo(({ open, onClose, music_id, onSave }) => {
  const [currentTags, setCurrentTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [musicData, setMusicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log('EditMusicCard actual render time:', endTime - startTime, 'ms');
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (!music_id) return;
    
    console.time('EditMusicCard:fetchData');
    setLoading(true);
    
    try {
      const data = await fetchMusicCardDataByMusicId(music_id);
      if (!data) return;

      console.time('EditMusicCard:processData');
      const plainData = {
        music_id: data.music_id,
        music_title: data.music_title || "",
        original_artist: data.original_artist || "",
        tags: Array.isArray(data.tags) ? [...data.tags] : [],
        image_url: data.image_url || null,
        favorite: Boolean(data.favorite)
      };

      const updateState = () => {
        setMusicData(plainData);
        setCurrentTags(plainData.tags);
        setTitle(plainData.music_title || "");
        setArtist(plainData.original_artist || "");
        setLoading(false);
      };
      
      requestAnimationFrame(updateState);
      
      console.timeEnd('EditMusicCard:processData');
    } catch (error) {
      console.error("Error fetching music data:", error);
      setLoading(false);
    } finally {
      console.timeEnd('EditMusicCard:fetchData');
    }
  }, [music_id]);

  useEffect(() => {
    if (open && music_id) {
      console.time('EditMusicCard:effect');
      fetchData();
      console.timeEnd('EditMusicCard:effect');
    }
  }, [open, music_id, fetchData]);

  const handleCloseInternal = useCallback(() => {
    console.time('EditMusicCard:close');
    onClose();
    console.timeEnd('EditMusicCard:close');
  }, [onClose]);

  const modalStyle = useMemo(() => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "secondary.container",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  }), []);

  const handleAddTag = useCallback(() => {
    if (newTag.trim() && !currentTags.includes(newTag)) {
      setCurrentTags(prev => [...prev, newTag]);
      setNewTag("");
    }
  }, [newTag, currentTags]);

  const handleRemoveTag = useCallback((tagToRemove) => {
    setCurrentTags(prev => prev.filter(tag => tag !== tagToRemove));
  }, []);

  const handleSave = async () => {
    try {
      if (!musicData || !title.trim() || !artist.trim()) {
        console.error("Invalid data:", { musicData, title, artist });
        return;
      }

      const updatedData = {
        music_id: musicData.music_id,
        music_title: title,
        original_artist: artist,
        tags: currentTags,
        image_url: musicData.image_url || null,
        favorite: Boolean(musicData.favorite)
      };

      const result = await updateMusicCardDataByMusicId(updatedData);
      if (!result) {
        throw new Error("Update operation returned falsy result");
      }

      onSave({
        ...updatedData,
        success: true
      });
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!musicData) {
        console.error("No music data to delete");
        return;
      }
      const result = await deleteMusicCardDataByMusicId(musicData.music_id);
      if (!result) {
        throw new Error("Delete operation returned falsy result");
      }
      onClose();
      onSave({ 
        deleted: true, 
        music_id: musicData.music_id,
        success: true
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading || !musicData) {
    return null;
  }

  return (
    <Modal open={open} onClose={handleCloseInternal}>
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Badge
            badgeContent={musicData.favorite}
            color="error"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Avatar src={musicData.image_url} sx={{ width: 60, height: 60 }} />
          </Badge>
          <Button
            variant="contained"
            sx={{ bgcolor: "secondary.fixed", color: "secondary.onFixed" }}
          >
            Upload Image
          </Button>
        </Box>

        <TextField
          label="Title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "secondary.onContainer !important",
              },
              "&:hover fieldset": {
                borderColor: "secondary.onContainer !important",
              },
              "&.Mui-focused fieldset": {
                borderColor: "secondary.onContainer !important",
              },
            },
          }}
        />

        <TextField
          label="Artist"
          value={artist || ""}
          onChange={(e) => setArtist(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "secondary.onContainer !important",
              },
              "&:hover fieldset": {
                borderColor: "secondary.onContainer !important",
              },
              "&.Mui-focused fieldset": {
                borderColor: "secondary.onContainer !important",
              },
            },
          }}
        />

        <Box sx={{ mt: 2 }}>
          {currentTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.secondary.fixedDim + " !important",
                color: (theme) =>
                  theme.palette.secondary.onFixedVariant + " !important",
                '& .MuiChip-deleteIcon': {
                  color: (theme) => theme.palette.secondary.onFixedVariant
                }
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <TextField
            label="New Tag"
            value={newTag || ""}
            onChange={(e) => setNewTag(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "secondary.onContainer !important",
                },
                "&:hover fieldset": {
                  borderColor: "secondary.onContainer !important",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "secondary.onContainer !important",
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddTag}
            sx={{
              bgcolor: (theme) => theme.palette.secondary.fixed,
              color: (theme) => theme.palette.secondary.onFixed,
            }}
          >
            Add
          </Button>
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: (theme) => theme.palette.error.container,
              color: (theme) => theme.palette.error.onContainer,
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                bgcolor: (theme) => theme.palette.primary.container,
                color: (theme) => theme.palette.primary.onContainer,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
});

EditMusicCard.displayName = 'EditMusicCard';

export default EditMusicCard;
