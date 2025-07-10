export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  album_image: string;
  audio: string;
  audiodownload: string;
  duration: number;
  position: number;
}

export interface Album {
  id: string;
  name: string;
  artist_name: string;
  image: string;
  releasedate: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
}

export interface JamendoResponse<T> {
  headers: {
    status: string;
    code: number;
    error_message: string;
    warnings: string;
    results_count: number;
  };
  results: T[];
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  queue: Track[];
  currentIndex: number;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
}