"use client";

import { Box, Tab, Tabs } from "@mui/material";
import MusicCRUD from "@/app/components/setting/MusicCRUD";
import StreamerCRUD from "@/app/components/setting/StreamerCRUD";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Page() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="setting tabs">
          <Tab label="Music Management" {...a11yProps(0)} />
          <Tab label="Streamer Management" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MusicCRUD />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <StreamerCRUD />
      </CustomTabPanel>
    </Box>
  );
}


