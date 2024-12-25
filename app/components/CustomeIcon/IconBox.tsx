// BilibiliIconBox.tsx
import React from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';

interface BilibiliIconBoxProps {
  sx?: SxProps<Theme>;
}
const BilibiliIconBox: React.FC<BilibiliIconBoxProps> = ({ sx }) => {
  return (
    <Box
      className="icon"
      sx={{ 
        ...sx, // 合并传递的sx属性
        userSelect: "none" 
      }}
      aria-label="bilibili icon"
    >
      &#xe6b4;
    </Box>
  );
};

const TikTokIconBox: React.FC<BilibiliIconBoxProps> = ({ sx }) => {
    return (
      <Box
        className="icon"
        sx={{ 
          ...sx, // 合并传递的sx属性
          userSelect: "none" 
        }}
        aria-label="bilibili icon"
      >
        &#xecdc;
      </Box>
    );
  };

  export { BilibiliIconBox, TikTokIconBox };