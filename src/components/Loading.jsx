import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="w-32 h-32 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
