import { useState, useRef, useEffect, useCallback } from 'react';
import { Track, PlayerState } from '../types/music';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isLoading: false,
    queue: [],
    currentIndex: 0,
    isShuffled: false,
    repeatMode: 'none'
  });

  const updateTime = useCallback(() => {
    const audio = audioRef.current;
    setPlayerState(prev => ({
      ...prev,
      currentTime: audio.currentTime,
      duration: audio.duration || 0
    }));
  }, []);

  const handleEnded = useCallback(() => {
    const { repeatMode, currentIndex, queue } = playerState;
    
    if (repeatMode === 'one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
    
    if (repeatMode === 'all' || currentIndex < queue.length - 1) {
      playNext();
    } else {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [playerState.repeatMode, playerState.currentIndex, playerState.queue]);

  useEffect(() => {
    const audio = audioRef.current;
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', () => setPlayerState(prev => ({ ...prev, isLoading: true })));
    audio.addEventListener('loadeddata', () => setPlayerState(prev => ({ ...prev, isLoading: false })));
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [updateTime, handleEnded]);

  const loadTrack = useCallback((track: Track) => {
    const audio = audioRef.current;
    audio.src = track.audio;
    audio.load();
    
    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      isLoading: true
    }));
  }, []);

  const play = useCallback(async () => {
    try {
      await audioRef.current.play();
      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current.pause();
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    if (playerState.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [playerState.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    audioRef.current.currentTime = time;
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    audioRef.current.volume = clampedVolume;
    setPlayerState(prev => ({ 
      ...prev, 
      volume: clampedVolume,
      isMuted: clampedVolume === 0
    }));
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (playerState.isMuted) {
      audio.volume = playerState.volume;
      setPlayerState(prev => ({ ...prev, isMuted: false }));
    } else {
      audio.volume = 0;
      setPlayerState(prev => ({ ...prev, isMuted: true }));
    }
  }, [playerState.isMuted, playerState.volume]);

  const setQueue = useCallback((tracks: Track[], startIndex = 0) => {
    setPlayerState(prev => ({
      ...prev,
      queue: tracks,
      currentIndex: startIndex
    }));
    
    if (tracks[startIndex]) {
      loadTrack(tracks[startIndex]);
    }
  }, [loadTrack]);

  const playNext = useCallback(() => {
    const { queue, currentIndex, isShuffled } = playerState;
    
    if (queue.length === 0) return;
    
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }
    
    setPlayerState(prev => ({ ...prev, currentIndex: nextIndex }));
    loadTrack(queue[nextIndex]);
    play();
  }, [playerState, loadTrack, play]);

  const playPrevious = useCallback(() => {
    const { queue, currentIndex } = playerState;
    
    if (queue.length === 0) return;
    
    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    setPlayerState(prev => ({ ...prev, currentIndex: prevIndex }));
    loadTrack(queue[prevIndex]);
    play();
  }, [playerState, loadTrack, play]);

  const toggleShuffle = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isShuffled: !prev.isShuffled }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlayerState(prev => {
      const modes: PlayerState['repeatMode'][] = ['none', 'one', 'all'];
      const currentModeIndex = modes.indexOf(prev.repeatMode);
      const nextMode = modes[(currentModeIndex + 1) % modes.length];
      return { ...prev, repeatMode: nextMode };
    });
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setPlayerState(prev => ({
      ...prev,
      queue: [...prev.queue, track]
    }));
  }, []);

  const removeFromQueue = useCallback((index: number) => {
    setPlayerState(prev => {
      const newQueue = prev.queue.filter((_, i) => i !== index);
      const newIndex = index <= prev.currentIndex ? Math.max(0, prev.currentIndex - 1) : prev.currentIndex;
      return {
        ...prev,
        queue: newQueue,
        currentIndex: newIndex
      };
    });
  }, []);

  return {
    playerState,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    setQueue,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    removeFromQueue,
    loadTrack
  };
};