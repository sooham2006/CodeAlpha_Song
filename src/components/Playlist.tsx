import React from 'react';
import { Play, Pause, X, Music, Clock, ListMusic } from 'lucide-react';
import { Track, PlayerState } from '../types/music';

interface PlaylistProps {
  playerState: PlayerState;
  onTrackSelect: (track: Track, index: number) => void;
  onRemoveFromQueue: (index: number) => void;
  onTogglePlay: () => void;
}

export const Playlist: React.FC<PlaylistProps> = ({
  playerState,
  onTrackSelect,
  onRemoveFromQueue,
  onTogglePlay
}) => {
  const { queue, currentIndex, currentTrack, isPlaying } = playerState;

  const formatDuration = (duration: number) => {
    if (!duration || isNaN(duration)) return '--:--';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const totalDuration = queue.reduce((total, track) => total + (track.duration || 0), 0);

  if (queue.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto">
            <Music className="w-12 h-12 text-slate-400" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Your Queue is Empty</h3>
        <p className="text-slate-400 text-lg">Discover and add music to start your playlist</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
            <ListMusic className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Now Playing</h3>
            <p className="text-slate-400">{queue.length} tracks • {Math.floor(totalDuration / 60)} min</p>
          </div>
        </div>
      </div>
      
      {/* Track List */}
      <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {queue.map((track, index) => {
          const isCurrentTrack = index === currentIndex;
          const isCurrentlyPlaying = isCurrentTrack && isPlaying;
          
          return (
            <div
              key={`${track.id}-${index}`}
              className={`group relative flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                isCurrentTrack
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 ring-2 ring-purple-500/30 shadow-lg'
                  : 'hover:bg-slate-800/50'
              }`}
              onClick={() => onTrackSelect(track, index)}
            >
              {/* Track Number / Playing Indicator */}
              <div className="flex-shrink-0 w-8 text-center mr-4">
                {isCurrentTrack ? (
                  <div className="flex items-center justify-center">
                    {isCurrentlyPlaying ? (
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-purple-400 rounded-full animate-pulse" />
                        <div className="w-1 h-4 bg-purple-400 rounded-full animate-pulse delay-75" />
                        <div className="w-1 h-4 bg-purple-400 rounded-full animate-pulse delay-150" />
                      </div>
                    ) : (
                      <Play className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                ) : (
                  <span className="text-slate-500 text-sm font-medium group-hover:hidden">
                    {index + 1}
                  </span>
                )}
                
                {!isCurrentTrack && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTrackSelect(track, index);
                    }}
                    className="hidden group-hover:flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </button>
                )}
              </div>

              {/* Album Art */}
              <div className="relative flex-shrink-0 mr-4">
                <img
                  src={track.album_image || 'https://images.pexels.com/photos/1540403/pexels-photo-1540403.jpeg?auto=compress&cs=tinysrgb&w=100'}
                  alt={track.album_name}
                  className="w-14 h-14 rounded-xl object-cover shadow-lg"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = 'https://images.pexels.com/photos/1540403/pexels-photo-1540403.jpeg?auto=compress&cs=tinysrgb&w=100';
                  }}
                />
                {isCurrentTrack && (
                  <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTogglePlay();
                      }}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
                    >
                      {isCurrentlyPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold text-base truncate transition-colors ${
                  isCurrentTrack ? 'text-purple-300' : 'text-white group-hover:text-purple-300'
                }`}>
                  {track.name}
                </h4>
                <p className="text-sm text-slate-400 truncate">{track.artist_name}</p>
              </div>

              {/* Duration & Actions */}
              <div className="flex items-center space-x-3 ml-4">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-sm">{formatDuration(track.duration)}</span>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromQueue(index);
                  }}
                  className="p-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100"
                  title="Remove from queue"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Gradient overlay for current track */}
              {isCurrentTrack && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};