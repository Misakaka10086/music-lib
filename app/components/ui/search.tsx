'use client';

import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
  placeholder: string;
}

export default function Search({ placeholder }: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false); // 是否处于输入法组合输入状态
  const inputRef = useRef<HTMLInputElement>(null);

  // 初始化输入框内容
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setInputValue(query);
  }, [searchParams]);

  const updateSearchParam = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  }, 200);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!isComposing) {
      updateSearchParam(value);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    // 使用 e.target.value 获取完整输入结果，而不是追加 e.data
    const value = (e.target as HTMLInputElement).value;
    setInputValue(value);
    updateSearchParam(value);
  };

  const handleClear = () => {
    setInputValue("");
    updateSearchParam("");
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
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "primary.main" }} />
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
