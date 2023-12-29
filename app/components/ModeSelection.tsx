import React from 'react';
import { motion } from 'framer-motion';
import { GameMode } from '../Shared/types';

type ModeSelectionProps = {
  selectedMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
};

const ModeSelection: React.FC<ModeSelectionProps> = ({ selectedMode, onSelectMode }) => {
  const buttonVariants = {
    rest: { scale: 1 },
    tap: { scale: 0.9 }, // Adjust the scale factor as needed
  };

  return (
    <div className="flex m-2 gap-2 m-5">
      <motion.button
        className={`${
          selectedMode === 'challenge' ? 'bg-blue-500 text-white' : ''
        } text-sm px-2 py-1 rounded cursor-pointer`}
        onClick={() => onSelectMode('memory' as GameMode)}
        variants={buttonVariants}
        whileTap="tap"
      >
        Challenge
      </motion.button>
      <motion.button
        className={`${
          selectedMode === 'memory' ? 'bg-blue-500 text-white' : ''
        } text-sm px-2 py-1 rounded cursor-pointer`}
        onClick={() => onSelectMode('memory' as GameMode)}
        variants={buttonVariants}
        whileTap="tap"
      >
        Memory
      </motion.button>
      <motion.button
        className={`${
          selectedMode === 'score' ? 'bg-blue-500 text-white' : ''
        } text-sm px-2 py-1 rounded cursor-pointer`}
        onClick={() => onSelectMode('score' as GameMode)}
        variants={buttonVariants}
        whileTap="tap"
      >
        Scoring
      </motion.button>
    </div>
  );
};

export default ModeSelection;
