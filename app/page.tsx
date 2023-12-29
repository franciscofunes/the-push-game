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
    turnOffLights
  } = useMemoryMode();

  const [confirmButtonPressed, handleConfirmButtonClick] = usePatternVerification({
    evaluatePattern: evaluateMemoryPattern,
  });

  const selectMode = (mode: GameMode) => {
    setSelectedMode(mode);
    startMemoryMode(); // Start the game when selecting a mode
  };

  useEffect(() => {
    // Logic for game effects (e.g., lights flashing)
  
    // Check if the confirm button is pressed and at least one light is on
    if (confirmButtonPressed && lights.some(light => light)) {
      // Turn off the lights when the confirm button is pressed
      turnOffLights();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmButtonPressed]);
  

  const pageEntranceVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.main
      className="flex flex-col justify-center items-center"
      initial="hidden"
      animate="visible"
      variants={pageEntranceVariants}
    >
      <div className="flex flex-col items-center gap-4">
        <Title text="The Push Game" animate={true} />

        {/* Mode Selection */}
        <ModeSelection selectedMode={selectedMode} onSelectMode={selectMode} />

        {/* Push Buttons Panel */}
        <PushButtonsPanel
          lights={lights}
          onButtonClick={handleMemoryButtonClick}
          onUserInput={handleUserInput} // Pass the handleUserInput function
        />

        {/* Confirm Button */}
        <ConfirmButton onClick={handleConfirmButtonClick} />

        {/* Score and Level Section */}
        <ScoreLevelSection score={score} level={level} />
      </div>
    </motion.main>
  );
};

export default Home;