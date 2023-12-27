import React from 'react';
import { motion } from 'framer-motion';

interface ConfirmButtonProps {
  onClick: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick }) => {
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    press: { scale: 0.9 },
  };

  return (
    <motion.button
      className="bg-green-500 text-white text-sm px-2 py-1 rounded cursor-pointer m-2"
      onClick={onClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="press"
    >
      Confirm
    </motion.button>
  );
};

export default ConfirmButton;