export type MusicCardData = {
  music_id: string;
  image_url: string;
  music_title: string;
  original_artist: string;
  favorite: number;
  tags: string[];
};

export type MusicCardProps = MusicCardData & {
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