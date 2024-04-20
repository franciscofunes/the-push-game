import React, { ChangeEvent, FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import { ModalProps } from '../Shared/interfaces';

const Modal: React.FC<ModalProps> = ({ score, nickname, setNickname, closeModal, saveScore }) => {
  const [isNicknameEmpty, setIsNicknameEmpty] = useState<boolean>(false);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    setIsNicknameEmpty(newNickname.trim() === ''); // Check if the new nickname is empty
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    // Call the saveScore function to save the score to the database
    saveScore(nickname, score);
    closeModal();
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    press: { scale: 0.9 },
  };

  return (
    <AnimatePresence>
      <motion.form
        onSubmit={handleSave} // Handle form submission
        className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-md w-full max-w-md"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-end items-center mb-4">
            <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={closeModal} />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-2xl font-bold">Register your score</h2>
          </div>
          <p className="text-sm md:text-base mb-4">Your Score: {score}</p>
          <label htmlFor="nickname" className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter Your Nickname:
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded-md w-full mb-4"
            required
            pattern="[a-zA-Z0-9]+"
          />
          <div className="flex justify-end">
            <motion.button
              type="submit"
              className={`bg-green-500 text-white px-3 md:px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none text-xs md:text-sm ${isNicknameEmpty && 'disabled:opacity-50 cursor-not-allowed'}`}
              disabled={isNicknameEmpty}
              variants={buttonVariants}
            >
              <CircleStackIcon className="w-5 h-5 mr-2 inline-block" />
              Save
            </motion.button>
          </div>
        </motion.div>
      </motion.form>
    </AnimatePresence>
  );
};

export default Modal;
