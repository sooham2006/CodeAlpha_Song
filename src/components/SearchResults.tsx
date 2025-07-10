import React from 'react';
import { Play, Plus, Search, Sparkles } from 'lucide-react';
import { Track } from '../types/music';

interface SearchResultsProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  onAddToQueue: (track: Track) => void;
  isLoading: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  tracks,
  onTrackSelect,
  onAddToQueue,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-purple-400 animate-pulse" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Searching the universe of music...</h3>
        <p className="text-slate-400">Finding the perfect tracks for you</p>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-12 h-12 text-slate-400" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No Results Found</h3>
        <p className="text-slate-400 text-lg">Try different keywords or explore our recommendations</p>
      </div>
    );
  }

  const formatDuration = (duration: number) => {
    if (!duration || isNaN(duration)) return '--:--';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
          <Search className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Search Results</h3>
          <p className="text-slate-400">{tracks.length} tracks found</p>
        </div>
      </div>
      
      {/* Results Grid */}
      <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="group relative flex items-center p-4 rounded-2xl hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
          >
            {/* Track Number */}
            <div className="flex-shrink-0 w-8 text-center mr-4">
              <span className="text-slate-500 text-sm font-medium group-hover:hidden">
                {index + 1}
              </span>
              <button
                onClick={() => onTrackSelect(track)}
                className="hidden group-hover:flex items-center justify-center p-1 rounded-full hover:bg-purple-500/20 transition-colors"
              >
                <Play className="w-4 h-4 text-purple-400 ml-0.5" />
              </button>
            </div>

            {/* Album Art */}
            <div className="flex-shrink-0 mr-4 relative group/image">
              <img
                src={track.album_image || 'https://images.pexels.com/photos/1540403/pexels-photo-1540403.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={track.album_name}
                className="w-14 h-14 rounded-xl object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = 'https://images.pexels.com/photos/1540403/pexels-photo-1540403.jpeg?auto=compress&cs=tinysrgb&w=100';
                }}
              />
              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => onTrackSelect(track)}
                  className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors shadow-lg transform hover:scale-110"
                  title="Play now"
                >
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </button>
              </div>
            </div>

            {/* Track Info */}
            <div
              className="flex-1 min-w-0 cursor-pointer"
              onClick={() => onTrackSelect(track)}
            >
              <h4 className="font-semibold text-base text-white truncate group-hover:text-purple-300 transition-colors">
                {track.name}
              </h4>
              <p className="text-sm text-slate-400 truncate">{track.artist_name}</p>
            </div>

            {/* Duration & Actions */}
            <div className="flex items-center space-x-4 ml-4">
              <span className="text-sm text-slate-400 font-medium">
                {formatDuration(track.duration)}
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToQueue(track);
                }}
                className="p-2 rounded-full hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-200 opacity-0 group-hover:opacity-100 transform hover:scale-110"
                title="Add to queue"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};