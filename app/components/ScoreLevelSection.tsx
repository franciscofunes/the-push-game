import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScoreLevelSectionProps } from '../Shared/interfaces';
import { HeartIcon } from '@heroicons/react/24/outline';

const ScoreLevelSection: React.FC<ScoreLevelSectionProps> = ({ score, level, lives }) => {
  const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);

  useEffect(() => {
    if (lives <= 0) {
      // Show "Game Over" message when lives reach 0
      setGameOverMessage("Game Over - You Lose");

      // Refresh the browser after a delay (e.g., 2 seconds)
      setTimeout(() => {
        window.location.reload();
      },100);
    } 
  }, [lives]);

  return (
    <motion.div
      className="text-center text-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p>
        Score:{score}
      </p>
      <p>
        Level:{level}
      </p>
      <motion.div
        className="flex gap-1 items-center justify-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>
          {lives}
        </p>
        <p>x</p>
        <HeartIcon className='w-5 h-5 text-red-500'/>
      </motion.div>
      {gameOverMessage && (
        <motion.p
          className="text-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {gameOverMessage}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ScoreLevelSection;
