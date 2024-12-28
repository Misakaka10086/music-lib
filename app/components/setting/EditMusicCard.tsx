import { useState, useEffect, useCallback, useMemo, memo, useRef, useReducer } from "react";
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
import { MusicCardData } from "@/app/components/MusicCard/types";

export interface EditMusicCardProps {
  open: boolean;
  onClose: () => void;
  music_id: string;
  onSave: (updatedMusic: MusicCardData) => void;
}

const EditMusicCard = memo(({ open, onClose, music_id, onSave }: EditMusicCardProps) => {
  const mountTime = useRef(performance.now());
  const renderCount = useRef(0);
  const prevOpen = useRef(open);

  // 状态管理 - 使用 useReducer 替代多个 useState
  const [state, dispatch] = useReducer(reducer, {
    formData: {},
    loading: true,
    currentTags: [],
    newTag: ""
  });

  const { formData, loading, currentTags, newTag } = state;

  // 样式定义 - 移到组件外部
  const modalStyle = modalStyles;

  // 监控组件的生命周期和性能
  useEffect(() => {
    if (prevOpen.current !== open) {
      const action = open ? 'opening' : 'closing';
      console.log(`EditMusicCard ${action} at:`, performance.now() - mountTime.current, 'ms');
      prevOpen.current = open;
    }
  }, [open]);

  // 数据加载优化
  const fetchMusicData = useCallback(async () => {
    if (!music_id) return;
    
    const fetchStart = performance.now();
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await fetchMusicCardDataByMusicId(music_id);
      if (!data) return;

      // 使用单一的 dispatch 更新所有状态
      dispatch({ type: 'SET_DATA', payload: data });
      console.log('EditMusicCard fetch + update time:', performance.now() - fetchStart, 'ms');
    } catch (error) {
      console.error("Error fetching music data:", error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [music_id]);

  // 初始数据加载
  useEffect(() => {
    if (open && music_id) {
      fetchMusicData();
    }
  }, [open, music_id, fetchMusicData]);

  // 重置表单优化
  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  // 关闭处理优化
  const handleClose = useCallback(() => {
    const startTime = performance.now();
    onClose();
    resetForm();
    console.log('EditMusicCard close time:', performance.now() - startTime, 'ms');
  }, [onClose, resetForm]);

  // 表单处理函数
  const handleFieldChange = useCallback((field: keyof MusicCardData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value } });
  }, []);

  const handleNewTagChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NEW_TAG', payload: e.target.value });
  }, []);

  const handleAddTag = useCallback(() => {
    if (newTag.trim() && !currentTags.includes(newTag.trim())) {
      dispatch({ type: 'ADD_TAG', payload: newTag.trim() });
    }
  }, [newTag, currentTags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    dispatch({ type: 'REMOVE_TAG', payload: tagToRemove });
  }, []);

  const handleDelete = useCallback(async () => {
    if (!formData.music_id) return;

    const startTime = performance.now();
    try {
      const result = await deleteMusicCardDataByMusicId(formData.music_id);
      if (result) {
        onSave({
          ...formData,
          deleted: true,
        } as MusicCardData);
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting music data:", error);
    } finally {
      console.log('EditMusicCard delete operation took:', performance.now() - startTime, 'ms');
    }
  }, [formData, onSave, handleClose]);

  // 保存处理
  const handleSave = useCallback(async () => {
    if (!formData.music_id) return;

    const startTime = performance.now();
    try {
      const updatedData = {
        ...formData,
        tags: currentTags,
      } as MusicCardData;

      const result = await updateMusicCardDataByMusicId(updatedData);
      if (result) {
        onSave(updatedData);
        handleClose();
      }
    } catch (error) {
      console.error("Error saving music data:", error);
    } finally {
      console.log('EditMusicCard save operation took:', performance.now() - startTime, 'ms');
    }
  }, [formData, currentTags, onSave, handleClose]);

  if (loading) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-music-modal"
      keepMounted={false}
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Badge
            badgeContent={formData.favorite}
            color="error"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Avatar
              src={formData.image_url}
              sx={{ width: 60, height: 60 }}
              alt={formData.music_title}
            />
          </Badge>
        </Box>

        <TextField
          label="Title"
          value={formData.music_title || ""}
          onChange={(e) => handleFieldChange("music_title", e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Artist"
          value={formData.original_artist || ""}
          onChange={(e) => handleFieldChange("original_artist", e.target.value)}
          fullWidth
          margin="normal"
        />

        <Box sx={{ mt: 2 }}>
          {currentTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <TextField
            label="New Tag"
            value={newTag}
            onChange={handleNewTagChange}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddTag}
            disabled={!newTag.trim()}
          >
            Add
          </Button>
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!formData.music_title?.trim() || !formData.original_artist?.trim()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
});

// 将样式定义移到组件外部
const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
} as const;

// 定义 reducer
type State = {
  formData: Partial<MusicCardData>;
  loading: boolean;
  currentTags: string[];
  newTag: string;
};

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DATA'; payload: MusicCardData }
  | { type: 'UPDATE_FIELD'; payload: { field: keyof MusicCardData; value: string } }
  | { type: 'SET_NEW_TAG'; payload: string }
  | { type: 'ADD_TAG'; payload: string }
  | { type: 'REMOVE_TAG'; payload: string }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_DATA':
      return {
        ...state,
        formData: action.payload,
        currentTags: action.payload.tags || [],
        loading: false
      };
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.payload.field]: action.payload.value }
      };
    case 'SET_NEW_TAG':
      return {
        ...state,
        newTag: action.payload
      };
    case 'ADD_TAG':
      return {
        ...state,
        currentTags: [...state.currentTags, action.payload],
        newTag: ''
      };
    case 'REMOVE_TAG':
      return {
        ...state,
        currentTags: state.currentTags.filter(tag => tag !== action.payload)
      };
    case 'RESET':
      return {
        formData: {},
        loading: true,
        currentTags: [],
        newTag: ''
      };
    default:
      return state;
  }
}

EditMusicCard.displayName = "EditMusicCard";

export default EditMusicCard as React.ComponentType<EditMusicCardProps>; 