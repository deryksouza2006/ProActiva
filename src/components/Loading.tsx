import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-proactiva-purple border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-gray-600">Carregando ProActiva...</p>
      </div>
    </div>
  );
};

export default Loading;
