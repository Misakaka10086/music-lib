"use client";

import { Chip, Box, Divider } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAllTags } from "@/app/lib/processMusicCardData";

interface TagChipProps {
  tag?: string;
}

// 使用模块作用域变量缓存标签数据
let cachedTags: string[] | null = null;

export default function TagChip({ tag }: TagChipProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<string[]>([]);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (cachedTags) {
      setTags(cachedTags);
    } else {
      fetchAllTags().then((fetchedTags) => {
        cachedTags = fetchedTags;
        setTags(fetchedTags);
      });
    }
  }, []);

  const handleClick = (clickedTag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", clickedTag);
    router.push(`?${params.toString()}`);
  };

  const renderTagList = (tagsToRender: string[]) => (
    <Box>
      <Divider>点击标签，快速筛选</Divider>
      <Box sx={{ display: "flex", flexWrap: "wrap", p: 1 }} role="listbox">
        {tagsToRender.map((t) => (
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

  if (tag) {
    return renderTagList([tag]);
  }

  return renderTagList(tags);
}
