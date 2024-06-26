"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ModeSelection from './components/ModeSelection';
import PushButtonsPanel from './components/PushButtonsPanel';
import ScoreLevelSection from './components/ScoreLevelSection';
import Title from './components/Title';
import { GameMode } from './Shared/types';
import ConfirmButton from './components/ConfirmButton';
import useMemoryMode from './Shared/hooks/useMemoryMode';
import usePatternVerification from './Shared/hooks/usePatternVerification';

const Home: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState('memory' as GameMode);

  const {
    lights,
    score,
    level,
    handleMemoryButtonClick,
    startMemoryMode,
    evaluateMemoryPattern,
    handleUserInput,
    isConfirmButtonDisabled,
    lives
  } = useMemoryMode();

  const [confirmButtonPressed, handleConfirmButtonClick] = usePatternVerification({
    evaluatePattern: evaluateMemoryPattern,
  });

  const selectMode = (mode: GameMode) => {
    setSelectedMode(mode);
    startMemoryMode(); // Start the game when selecting a mode
  };

  const pageEntranceVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={pageEntranceVariants}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <Title text="Popit Game" animate={true} />

        {/* Mode Selection */}
        <ModeSelection selectedMode={selectedMode} onSelectMode={selectMode} />

        {/* Push Buttons Panel */}
        <PushButtonsPanel
          lights={lights}
          onButtonClick={handleMemoryButtonClick}
          onUserInput={handleUserInput} // Pass the handleUserInput function
        />

        {/* Confirm Button */}
        <ConfirmButton onClick={handleConfirmButtonClick} disabled={isConfirmButtonDisabled}/>

        {/* Score and Level Section */}
        <ScoreLevelSection score={score} level={level} lives={lives} />
      </div>
    </motion.main>
  );
};

export default Home;