"use client";

import { useSnackbar } from "notistack";

export const fallbackCopyToClipboard = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    console.log(`Fallback: Copied "${text}" to clipboard!`);
  } catch (err) {
    console.error("Fallback: Failed to copy text:", err);
  }
  document.body.removeChild(textarea);
};

export const useCopyToClipboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const copyToClipboard = async (textToCopy: string) => {
    textToCopy = "点歌 " + textToCopy;
    
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(textToCopy);
        console.log(`Copied "${textToCopy}" to clipboard!`);
      } catch (err) {
        console.error("Failed to copy text using clipboard API:", err);
        fallbackCopyToClipboard(textToCopy);
      }
    } else {
      fallbackCopyToClipboard(textToCopy);
    }
    
    enqueueSnackbar(textToCopy + "   | 已复制到剪贴板", { variant: "success" });
  };

  return copyToClipboard;
};