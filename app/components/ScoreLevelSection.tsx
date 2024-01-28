'use client'
import { HeartIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { ScoreLevelSectionProps } from '../Shared/interfaces';
import { addNewScore } from '../Shared/utils';
import Modal from './Modal';


const ScoreLevelSection: React.FC<ScoreLevelSectionProps> = ({ score, level, lives }) => {
  const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (lives <= 0) {
      // Show "Game Over" message when lives reach 0
      setGameOverMessage("Game Over - You Lose");

      // Open the modal
      setIsModalOpen(true);
    }
  }, [lives]);

  const handleSaveScore = () => {
    addNewScore(nickname, score);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    location.reload()
  }

  return (
    <motion.div
      className="text-center text-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p>Score: {score}</p>
      <p>Level: {level}</p>
      <motion.div
        className="flex gap-1 items-center justify-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>{lives}</p>
        <p>x</p>
        <HeartIcon className='w-5 h-5 text-red-500' />
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

      {/* Modal for capturing nickname, only render when isModalOpen is true */}
      {isModalOpen && (
        <Modal
          score={score}
          nickname={nickname}
          setNickname={setNickname}
          closeModal={closeModal}
          saveScore={handleSaveScore}
        />
      )}
    </motion.div>
  );
};

export default ScoreLevelSection;
