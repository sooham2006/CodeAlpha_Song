import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen fixed inset-0 bg-gradient-to-br from-emerald-50 to-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8 w-20 h-20 mx-auto">
          <div className="absolute inset-0 w-20 h-20 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 m-0.5 border-4 border-transparent border-r-emerald-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-0 w-12 h-12 m-1 border-2 border-transparent border-b-emerald-300 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
        </div>
        <h2 className="text-3xl font-light text-gray-800 tracking-wide mb-2">SKINCARE</h2>
        <p className="text-sm text-gray-600 animate-pulse">Loading premium experience...</p>
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;