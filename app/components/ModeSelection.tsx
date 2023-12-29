import React from 'react';
import { motion } from 'framer-motion';
import { GameMode } from '../Shared/types';
import { PlayIcon } from '@heroicons/react/24/solid';

type ModeSelectionProps = {
  selectedMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
};

const modes = [
  { mode: 'challenge', label: 'Challenge' },
  { mode: 'memory', label: 'Memory' },
  { mode: 'score', label: 'Scoring' },
];

const ModeSelection: React.FC<ModeSelectionProps> = ({ selectedMode, onSelectMode }) => {
  const buttonVariants = {
    rest: { scale: 1 },
    tap: { scale: 0.9 }, // Adjust the scale factor as needed
  };

  return (
    <div className="flex m-2 gap-2 m-5">
      {modes.map(({ mode, label }) => (
        <motion.button
          key={mode}
          className={`${selectedMode === mode ? 'bg-blue-500 text-white' : ''
            } text-sm px-2 py-1 rounded cursor-pointer flex items-center`}
          onClick={() => onSelectMode(mode as GameMode)}
          variants={buttonVariants}
          whileTap="tap"
        >
          {label}
          <PlayIcon className="w-5 h-5 text-white-500 " role="button" />
        </motion.button>
      ))}
    </div>
  );
};

export default ModeSelection;
