import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { JamendoAPI } from '../services/jamendoApi';
import { Track, JamendoResponse } from '../types/music';
import { PlayerControls } from './PlayerControls';
import { ProgressBar } from './ProgressBar';
import { TrackInfo } from './TrackInfo';
import { Playlist } from './Playlist';
import { SearchResults } from './SearchResults';

export const MusicPlayer: React.FC = () => {
  const {
    playerState,
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
    loadTrack,
    play
  } = useAudioPlayer();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const jamendoApi = JamendoAPI.getInstance();

  // Load popular tracks on mount
  useEffect(() => {
    const loadInitialTracks = async () => {
      try {
        setIsInitialLoading(true);
        const response: JamendoResponse<Track> = await jamendoApi.getPopularTracks(10);
        if (response.results && response.results.length > 0) {
          setQueue(response.results, 0);
        }
      } catch (error) {
        console.error('Error loading initial tracks:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadInitialTracks();
  }, [setQueue]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response: JamendoResponse<Track> = await jamendoApi.searchTracks(query);
      setSearchResults(response.results || []);
    } catch (error) {
      console.error('Error searching tracks:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleTrackSelect = (track: Track, index?: number) => {
    if (index !== undefined) {
      // Playing from queue
      loadTrack(track);
      play();
    } else {
      // Playing from search results - add to queue and play
      const newQueue = [track, ...playerState.queue];
      setQueue(newQueue, 0);
      play();
    }
  };

  const handleAddToQueue = (track: Track) => {
    addToQueue(track);
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-gradient-to-r from-purple-400 to-pink-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-purple-400 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Harmony
          </h1>
          <p className="text-slate-400 text-lg">Initializing your musical journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 tracking-tight">
            Harmony
          </h1>
          <p className="text-slate-400 text-lg font-light">Your premium music experience</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
          {/* Left Panel - Track Info & Controls */}
          <div className="xl:col-span-4 space-y-8">
            {/* Track Info Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                <TrackInfo track={playerState.currentTrack} />
              </div>
            </div>

            {/* Controls Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl space-y-6">
                <ProgressBar
                  currentTime={playerState.currentTime}
                  duration={playerState.duration}
                  onSeek={seek}
                />
                
                <PlayerControls
                  playerState={playerState}
                  onTogglePlay={togglePlay}
                  onPrevious={playPrevious}
                  onNext={playNext}
                  onToggleShuffle={toggleShuffle}
                  onToggleRepeat={toggleRepeat}
                  onToggleMute={toggleMute}
                  onVolumeChange={setVolume}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Search & Playlist */}
          <div className="xl:col-span-8 space-y-8">
            {/* Search Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                <form onSubmit={handleSearchSubmit} className="flex items-center space-x-4">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Discover your next favorite song..."
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                  >
                    Search
                  </button>
                  {showSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowSearch(false);
                        setSearchResults([]);
                        setSearchQuery('');
                      }}
                      className="p-4 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-2xl transition-all duration-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Content Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl min-h-[500px]">
                {searchQuery && searchResults.length > 0 ? (
                  <SearchResults
                    tracks={searchResults}
                    onTrackSelect={handleTrackSelect}
                    onAddToQueue={handleAddToQueue}
                    isLoading={isSearching}
                  />
                ) : searchQuery && !isSearching ? (
                  <SearchResults
                    tracks={[]}
                    onTrackSelect={handleTrackSelect}
                    onAddToQueue={handleAddToQueue}
                    isLoading={false}
                  />
                ) : (
                  <Playlist
                    playerState={playerState}
                    onTrackSelect={handleTrackSelect}
                    onRemoveFromQueue={removeFromQueue}
                    onTogglePlay={togglePlay}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};