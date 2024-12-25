import React, { memo } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ActionButtonsProps } from './types';
import { styles } from './styles';

const ActionButtons = memo(({
  onDownload,
  onFavorite,
  onMoreOptions,
  isMobile
}: ActionButtonsProps) => {

  const buttons = (
    <>
      <Tooltip title="Download">
        <IconButton onClick={onDownload} aria-label="Download" >
          <DownloadIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add to favorites">
        <IconButton onClick={onFavorite} aria-label="Add to favorites" >
          <StarBorderIcon />
        </IconButton>
      </Tooltip>
      <IconButton onClick={onMoreOptions} aria-label="more options" >
        <MoreVertIcon />
      </IconButton>
    </>
  );

  if (isMobile) {
    return (
      <Box sx={styles.mobileActions}>
        {buttons}
      </Box>
    );
  }

  return (
    <Box sx={styles.desktopActions}>
      {buttons}
    </Box>
  );
});

ActionButtons.displayName = 'ActionButtons';

export default ActionButtons; 