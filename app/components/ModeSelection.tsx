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
          selectedMode === 'mission' ? 'bg-blue-500 text-white' : ''
        } text-sm px-2 py-1 rounded cursor-pointer`}
        onClick={() => onSelectMode('mission' as GameMode)}
        variants={buttonVariants}
        whileTap="tap"
      >
        Mission
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
          selectedMode === 'scoring' ? 'bg-blue-500 text-white' : ''
        } text-sm px-2 py-1 rounded cursor-pointer`}
        onClick={() => onSelectMode('scoring' as GameMode)}
        variants={buttonVariants}
        whileTap="tap"
      >
        Scoring
      </motion.button>
    </div>
  );
};

export default ModeSelection;
