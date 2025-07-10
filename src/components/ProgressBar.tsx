import React from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek
}) => {
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  return (
    <div className="w-full space-y-4">
      <div
        className="relative h-3 bg-slate-700/50 rounded-full cursor-pointer group overflow-hidden"
        onClick={handleSeek}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Progress bar */}
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-150 shadow-lg"
          style={{ width: `${progress}%` }}
        />
        
        {/* Thumb */}
        <div
          className="absolute w-5 h-5 bg-white rounded-full shadow-xl transform -translate-x-1/2 -translate-y-1/2 top-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ring-4 ring-purple-500/30"
          style={{ left: `${progress}%` }}
        />
        
        {/* Shimmer effect */}
        <div 
          className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ left: `${Math.max(0, progress - 4)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-white font-medium">{formatTime(currentTime)}</span>
        <span className="text-slate-400">{formatTime(duration)}</span>
      </div>
    </div>
  );
};