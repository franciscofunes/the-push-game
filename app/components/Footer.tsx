"use client"
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const bouncingVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -5, 0], // Bouncing animation
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        loop: Infinity,
      },
    },
  };

  return (
    <footer className="px-4 sm:px-6 py-6 bg-white dark:bg-gray-900">
    <div className="text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-500">
      <span className="dark:text-gray-100 text-gray-900 font-bold mr-2">
        {" "}
        Copyright{" "}
        <motion.span
          className="inline-block"
          initial="hidden"
          animate="visible"
          variants={bouncingVariants}
        >
          Equaldev
        </motion.span>{" "}
        -
      </span>{" "}
      &copy; {new Date().getFullYear()} All Rights Reserved
    </div>
  </footer>
  );
};

export default Footer;
