import React from 'react';
import { Music, Heart, Share2 } from 'lucide-react';
import { Track } from '../types/music';

interface TrackInfoProps {
  track: Track | null;
}

export const TrackInfo: React.FC<TrackInfoProps> = ({ track }) => {
  if (!track) {
    return (
      <div className="text-center">
        <div className="relative group mb-8">
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-slate-600/30 shadow-2xl">
            <Music className="w-16 h-16 text-slate-400" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Ready to Play</h2>
        <p className="text-slate-400 text-lg">Select a track to begin your musical journey</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="relative group mb-8">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
        <img
          src={track.album_image || 'https://images.pexels.com/photos/1540403/pexels-photo-1540403.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={track.album_name}
          className="relative w-64 h-64 mx-auto rounded-3xl shadow-2xl object-cover ring-4 ring-white/10 transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = 'https://images.pexels.com/photos/1540403/pexels-photo-1540403.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl" />
        
        {/* Floating action buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
            <Heart className="w-5 h-5 text-white" />
          </button>
          <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-white leading-tight line-clamp-2">{track.name}</h2>
        <p className="text-xl text-purple-300 font-medium">{track.artist_name}</p>
        <p className="text-lg text-slate-400">{track.album_name}</p>
        
        {/* Track stats */}
        <div className="flex items-center justify-center space-x-6 pt-4">
          <div className="text-center">
            <div className="text-sm text-slate-500">Duration</div>
            <div className="text-white font-medium">
              {track.duration ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` : '--:--'}
            </div>
          </div>
          <div className="w-px h-8 bg-slate-600" />
          <div className="text-center">
            <div className="text-sm text-slate-500">Quality</div>
            <div className="text-white font-medium">HD</div>
          </div>
        </div>
      </div>
    </div>
  );
};