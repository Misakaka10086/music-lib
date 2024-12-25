"use client";
/**
 * SearchInput Component
 *
 * A reusable search input component that provides a styled search field with clear functionality.
 *
 * @component
 *
 * Features:
 * - Responsive design that adapts to mobile and desktop views
 * - Clear button that appears when input has value
 * - Auto-focus after clearing
 * - Material-UI based styling
 * - Internationalization support
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const handleSearch = (value: string) => {
 *     console.log('Search value:', value);
 *   };
 *
 *   return <SearchInput onSearch={handleSearch} />;
 * };
 * ```
 *
 * @props {Function} onSearch - Optional callback function that receives the current input value.
 *                             Triggered on both input change and clear events.
 */

import { type ChangeEvent, useRef, useState } from "react";

import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

// Define props interface
interface SearchInputProps {
  onSearch?: (value: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

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
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <SearchIcon
        aria-hidden="true"
        sx={{ color: "primary.main" }}
      />
      <TextField
        inputRef={inputRef}
        label="搜索你想听的歌曲"
        variant="standard"
        sx={{
          width: isMobile ? "75%" : "50%",
          input: { color: "primary.onPrimaryContainer" },
          "& label": {
            color: "primary.main",
          },
          "& label.Mui-focused": {
            color: "primary.main",
          },
          // "& .MuiOutlinedInput-root": {
          //   "& fieldset": {
          //     borderColor: "red",
          //   },
          //   "&:hover fieldset": {
          //     borderColor: "red",
          //   },
          //   "&.Mui-focused fieldset": {
          //     borderColor: "red",
          //   },
          // },
          // "&:hover fieldset": {
          //   borderColor: "red",
          // },
          // "& .MuiInput-root": {
          //   color: "red",
          // },
          "& .MuiInput-underline:before": {
            borderBottomColor: "primary.main",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "primary.main",
          },

          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "primary.main", // hover时的颜色
          },
        }}
        value={inputValue}
        onChange={handleChange}
        slotProps={{
          input: {
            endAdornment: inputValue && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClear}
                  aria-label="clear"
                  sx={{ color: "warning.main" }}
                >
                  <DeleteIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchInput;
