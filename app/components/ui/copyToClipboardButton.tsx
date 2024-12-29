"use client";

import React from "react";
import { useSnackbar } from "notistack";

interface CopyToClipboardButtonProps {
  textToCopy: string;
  children: React.ReactNode;
}

const fallbackCopyToClipboard = (text: string) => {
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

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  textToCopy,
  children,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  textToCopy = "点歌 " + textToCopy;
  const handleClick = async () => {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log(`Copied "${textToCopy}" to clipboard!`);
        })
        .catch((err) => {
          console.error("Failed to copy text using clipboard API:", err);
          fallbackCopyToClipboard(textToCopy); // 使用备用方案
        });
    } else {
      fallbackCopyToClipboard(textToCopy); // 使用备用方案
    }
    enqueueSnackbar(textToCopy + "   | 已复制到剪贴板", { variant: "success" });
  };
  return <div onClick={handleClick}>{children}</div>;
};

export default CopyToClipboardButton;
