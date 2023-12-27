"use client"
import React from 'react';

interface LeverProps {
  onExecutePattern: () => void;
}

const Lever: React.FC<LeverProps> = ({ onExecutePattern }) => {
  return (
    <div className="flex justify-center items-center">
      {/* You can customize the lever UI here */}
      <button
        className="mt-4 text-white text-base px-4 py-2 bg-blue-500 rounded cursor-pointer"
        onClick={onExecutePattern}
      >
        Execute Pattern
      </button>
    </div>
  );
};

export default Lever;
