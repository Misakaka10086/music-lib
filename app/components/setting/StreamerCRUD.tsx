"use client";

import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { createStreamerRecord, readStreamerRecord, updateStreamerRecord, deleteStreamerRecord, listStreamerRecords } from "@/app/lib/data_edit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface StreamerCRUDProps {
  // Add any props if needed
}

export default function StreamerCRUD({}: StreamerCRUDProps) {
  const [streamerList, setStreamerList] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    live_url: '',
    follower: 0
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadStreamerRecords();
  }, []);

  const loadStreamerRecords = async () => {
    const records = await listStreamerRecords();
    setStreamerList(records);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateStreamerRecord(formData);
      } else {
        const { id, ...newRecord } = formData;
        await createStreamerRecord(newRecord);
      }
      resetForm();
      loadStreamerRecords();
    } catch (error) {
      console.error("Error saving streamer record:", error);
    }
  };

  const handleEdit = async (id: string) => {
    const record = await readStreamerRecord(id);
    if (record) {
      setFormData(record);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteStreamerRecord(id);
    loadStreamerRecords();
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      live_url: '',
      follower: 0
    });
    setIsEditing(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Form Section */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Live URL"
          name="live_url"
          value={formData.live_url}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Follower Count"
          name="follower"
          type="number"
          value={formData.follower}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ mr: 2 }}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
          <Button type="button" variant="outlined" onClick={resetForm}>
            Reset
          </Button>
        </Box>
      </Box>

      {/* List Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Live URL</TableCell>
              <TableCell>Follower Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {streamerList.map((streamer) => (
              <TableRow key={streamer.id}>
                <TableCell>{streamer.name}</TableCell>
                <TableCell>{streamer.live_url}</TableCell>
                <TableCell>{streamer.follower}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(streamer.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(streamer.id)}>
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