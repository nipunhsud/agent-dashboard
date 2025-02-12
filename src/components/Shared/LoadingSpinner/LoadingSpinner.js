import React from 'react';

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366f1]"></div>
    </div>
);

export default LoadingSpinner;