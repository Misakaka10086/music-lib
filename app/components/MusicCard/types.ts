export type MusicCardProps = {
  music_id: string;
  image_url: string;
  music_title: string;
  original_artist: string;
  favorite: number;
  tags: string[];
  onDownload?: () => void;
  onFavorite?: () => void;
  onMoreOptions?: () => void;
};

export type ActionButtonsProps = {
  onDownload?: () => void;
  onFavorite?: () => void;
  onMoreOptions?: () => void;
  isMobile?: boolean;
}; 