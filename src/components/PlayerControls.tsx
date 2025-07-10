import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1,
  Volume2,
  VolumeX,
  Heart
} from 'lucide-react';
import { PlayerState } from '../types/music';

interface PlayerControlsProps {
  playerState: PlayerState;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  playerState,
  onTogglePlay,
  onPrevious,
  onNext,
  onToggleShuffle,
  onToggleRepeat,
  onToggleMute,
  onVolumeChange
}) => {
  const { isPlaying, isShuffled, repeatMode, volume, isMuted, isLoading } = playerState;

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return <Repeat1 className="w-5 h-5" />;
      case 'all':
        return <Repeat className="w-5 h-5" />;
      default:
        return <Repeat className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={onPrevious}
          className="p-3 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-110"
          title="Previous"
        >
          <SkipBack className="w-7 h-7" />
        </button>

        <button
          onClick={onTogglePlay}
          disabled={isLoading}
          className="relative p-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-purple-500/50"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isLoading ? (
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
          
          {/* Pulse effect when playing */}
          {isPlaying && !isLoading && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-20" />
          )}
        </button>

        <button
          onClick={onNext}
          className="p-3 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-110"
          title="Next"
        >
          <SkipForward className="w-7 h-7" />
        </button>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleShuffle}
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isShuffled 
                ? 'text-purple-400 bg-purple-400/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
            title="Shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>
          
          <button
            onClick={onToggleRepeat}
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
              repeatMode !== 'none' 
                ? 'text-purple-400 bg-purple-400/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
            title="Repeat"
          >
            {getRepeatIcon()}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full text-slate-400 hover:text-pink-400 hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-110"
            title="Like"
          >
            <Heart className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleMute}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-110"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            
            <div className="w-24 group">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer volume-slider"
                  title="Volume"
                />
                <div 
                  className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg pointer-events-none transition-all duration-150"
                  style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};