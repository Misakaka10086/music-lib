'use client';

import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useRef, ChangeEvent } from "react";

interface SearchProps {
  placeholder: string;
  onSearch?: (query: string) => void;
}

export default function Search({ placeholder, onSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  return (
    <Box
      component="div"
      role="search"
      aria-label="Search songs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <TextField
          inputRef={inputRef}
          fullWidth
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: inputValue && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear} size="small">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
              type: "text",
              inputMode: "text",
              autoComplete: "off",
              role: "textbox",
            },
          }}
        />
      </Box>
    </Box>
  );
}
