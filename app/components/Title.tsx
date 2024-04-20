import React from 'react';
import { motion } from 'framer-motion';

type TitleProps = {
  text: string;
  animate: boolean;
};

const Title: React.FC<TitleProps> = ({ text, animate }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.h1
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold dark:text-white light:text-gray-800 text-center line-clamp-3 px-4`}
      initial="hidden"
      animate={animate ? 'visible' : 'hidden'}
      variants={titleVariants}
    >
      {text}
    </motion.h1>
  );
};

export default Title;
