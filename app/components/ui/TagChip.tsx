"use client";

import { Chip, Box, Divider } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAllTags } from "@/app/lib/processMusicCardData";

interface TagChipProps {
  tag?: string; // Make tag optional for standalone usage
}

export default function TagChip({ tag }: TagChipProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<string[]>([]);
  const query = searchParams.get("q") || "";

  // Fetch tags when component mounts
  useEffect(() => {
    fetchAllTags().then((tags) => setTags(tags));
  }, []);

  const handleClick = (clickedTag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", clickedTag);
    router.push(`?${params.toString()}`);
  };

  // If tag prop is provided, render single chip
  if (tag) {
    return (
      <Box>
        <Divider>点击标签，快速筛选</Divider>
        <Box sx={{ display: "flex", flexWrap: "wrap", p: 1 }} role="listbox">
          <Chip
            label={tag}
            onClick={() => handleClick(tag)}
            sx={{ cursor: "pointer" }}
            variant={tag === query ? "outlined" : "filled"}
          />
        </Box>
        <Divider sx={{ my: 1 }} />
      </Box>
    );
  }

  // If no tag prop, render all tags
  return (
    <Box>
      <Divider>点击标签，快速筛选</Divider>
      <Box sx={{ display: "flex", flexWrap: "wrap", p: 1 }} role="listbox">
        {tags.map((t) => (
          <Chip
            key={t}
            label={t}
            onClick={() => handleClick(t)}
            sx={{ cursor: "pointer", m: 0.5 }}
            variant={t === query ? "outlined" : "filled"}
          />
        ))}
      </Box>
      <Divider sx={{ my: 1 }} />
    </Box>
  );
}
