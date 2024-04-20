import React from 'react';
import { motion } from 'framer-motion';
import { ConfirmButtonProps } from '../Shared/interfaces';

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick, disabled }) => {
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    press: { scale: 0.9 },
  };

  return (
    <motion.button
      className={`bg-green-500 text-white text-sm px-2 py-1 rounded cursor-pointer m-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="press"
      disabled={disabled}
    >
      popit
    </motion.button>
  );
};

export default ConfirmButton;
