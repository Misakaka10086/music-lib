"use client";
import { Box, Container, CircularProgress } from "@mui/material";
import { useEffect, useState, useCallback, useRef, Suspense, useMemo, memo } from "react";
import { MusicCardData } from "@/app/components/MusicCard/types";
import MusicCardSkeleton from "@/app/components/MusicCard/Skeleton";
import { fetchAllMusicCardData } from "@/app/lib/processMusicCardData";
import MusicCard from "@/app/components/MusicCard/MusicCard";
import dynamic from "next/dynamic";

// 定义 EditMusicCard 组件的类型
type EditMusicCardType = React.ComponentType<{
  open: boolean;
  onClose: () => void;
  music_id: string;
  onSave: (updatedMusic: MusicCardData) => void;
}>;

// 预加载 EditMusicCard 组件
const EditMusicCard = dynamic(
  () => import("@/app/components/setting/EditMusicCard"),
  {
    loading: () => <Box display="flex" justifyContent="center"><CircularProgress /></Box>,
    ssr: false
  }
) as EditMusicCardType;

// 预加载函数
const preloadEditMusicCard = () => {
  const startTime = performance.now();
  import("@/app/components/setting/EditMusicCard").then(() => {
    const endTime = performance.now();
    console.log('Preload EditMusicCard time:', endTime - startTime, 'ms');
  });
};

// 在空闲时预加载
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadEditMusicCard);
  } else {
    setTimeout(preloadEditMusicCard, 1000);
  }
}

// 将 MusicCard 列表提取为单独的组件
const MusicCardList = memo(({ 
  musicData, 
  onMoreOptions 
}: { 
  musicData: MusicCardData[],
  onMoreOptions: (id: string) => void 
}) => {
  return (
    <Box>
      {musicData.map((music) => (
        <Box key={music.music_id} sx={{ mb: 2 }}>
          <MusicCard
            {...music}
            onDownload={() => console.log(`Download ${music.music_id}`)}
            onFavorite={() => console.log(`Favorite ${music.music_id}`)}
            onMoreOptions={() => onMoreOptions(music.music_id)}
          />
        </Box>
      ))}
    </Box>
  );
});

MusicCardList.displayName = 'MusicCardList';

export default function SettingPage() {
  const renderCount = useRef(0);
  const isFirstRender = useRef(true);
  const modalOpenTime = useRef<number | null>(null);

  // Basic states
  const [musicData, setMusicData] = useState<MusicCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMusicId, setSelectedMusicId] = useState<string | null>(null);

  // Event handlers with performance tracking
  const handleMoreOptions = useCallback((musicId: string) => {
    const startTime = performance.now();
    // 使用 requestAnimationFrame 批量更新状态
    requestAnimationFrame(() => {
      setSelectedMusicId(musicId);
      setEditModalOpen(true);
      modalOpenTime.current = performance.now();
      console.log('MoreOptions operation time:', performance.now() - startTime, 'ms');
    });
  }, []);

  const handleCloseEditModal = useCallback(() => {
    const startTime = performance.now();
    // 使用 requestAnimationFrame 批量更新状态
    requestAnimationFrame(() => {
      setEditModalOpen(false);
      setSelectedMusicId(null);
      if (modalOpenTime.current) {
        console.log('Modal was open for:', performance.now() - modalOpenTime.current, 'ms');
        modalOpenTime.current = null;
      }
      console.log('CloseEditModal operation time:', performance.now() - startTime, 'ms');
    });
  }, []);

  const handleSaveEdit = useCallback((updatedMusic: MusicCardData) => {
    const startTime = performance.now();
    setMusicData(prev => 
      prev.map(music => 
        music.music_id === updatedMusic.music_id ? updatedMusic : music
      )
    );
    console.log('SaveEdit operation time:', performance.now() - startTime, 'ms');
  }, []);

  // 监控渲染次数
  useEffect(() => {
    const startTime = performance.now();
    renderCount.current += 1;
    const currentRender = renderCount.current;
    
    return () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      console.log(`Render #${currentRender} took:`, performance.now() - startTime, 'ms');
    };
  });

  // Initial data loading
  useEffect(() => {
    const fetchData = async () => {
      const startTime = performance.now();
      try {
        setLoading(true);
        const data = await fetchAllMusicCardData(Number.MAX_SAFE_INTEGER, 1);
        setMusicData(data);
      } catch (err) {
        setError("Failed to load music data");
        console.error("Error loading music data:", err);
      } finally {
        setLoading(false);
        console.log('Initial data loading took:', performance.now() - startTime, 'ms');
      }
    };

    fetchData();
  }, []);

  // 使用 useMemo 缓存 EditMusicCard 组件
  const editMusicCardComponent = useMemo(() => {
    if (!editModalOpen || !selectedMusicId) return null;
    return (
      <EditMusicCard
        open={editModalOpen}
        onClose={handleCloseEditModal}
        music_id={selectedMusicId}
        onSave={handleSaveEdit}
      />
    );
  }, [editModalOpen, selectedMusicId, handleCloseEditModal, handleSaveEdit]);

  return (
    <Container>
      <Box sx={{ p: 2, minHeight:'100vh'}}>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MusicCardSkeleton key={index} />
          ))
        ) : (
          <MusicCardList 
            musicData={musicData}
            onMoreOptions={handleMoreOptions}
          />
        )}
      </Box>

      <Suspense fallback={<Box display="flex" justifyContent="center"><CircularProgress /></Box>}>
        {editMusicCardComponent}
      </Suspense>
    </Container>
  );
}
