"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lever from './components/Lever';
import ModeSelection from './components/ModeSelection';
import PushButtonsPanel from './components/PushButtonsPanel';
import ScoreLevelSection from './components/ScoreLevelSection';
import Title from './components/Title';
import { GameMode } from './Shared/types';
import ConfirmButton from './components/ConfirmButton';

const Home: React.FC = () => {
  const [lights, setLights] = useState(Array(30).fill(false));
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameMode, setGameMode] = useState('mission'); // Default mode is Mission Mode
  const [selectedMode, setSelectedMode] = useState('mission' as GameMode);
  const [generatedPattern, setGeneratedPattern] = useState<boolean[]>([]);
  const [confirmButtonPressed, setConfirmButtonPressed] = useState(false);

  const handleConfirmButtonPress = () => {
    // Add logic for handling the confirm button press
    // For example, confirm the pattern or perform other actions
    setConfirmButtonPressed(true);

    // Add any other logic you need for handling the confirm button press
  };

  const selectMode = (mode: GameMode) => {
    setSelectedMode(mode);
    startGame(); // Start the game when selecting a mode
  };

  const evaluateMemoryPattern = () => {
    const isPatternMatched = lights.every((light, index) => light === generatedPattern[index]);

    if (isPatternMatched) {
      setScore(score + 10);
      setLevel(level + 1);
      generatePattern(); // Generate a new pattern for the next level
    } else {
      // Provide feedback for incorrect pattern, e.g., flashing lights or a message
      console.log('Incorrect pattern! Try again.');
    }
  };

  const handleExecutePattern = () => {
    if (gameMode === 'memory') {
      evaluateMemoryPattern();
    }
  };

  const startGame = () => {
    setLights(Array(10).fill(true));
    setTimeout(() => {
      setLights(Array(10).fill(false));

      switch (gameMode) {
        case 'mission':
          handleMissionMode();
          break;
        case 'memory':
          handleMemoryMode();
          break;
        case 'scoring':
          handleScoringMode();
          break;
        default:
          // Handle default case or display an error
          break;
      }
    }, 1000);
  };

  const handleButtonClick = (index: number) => {
    if (gameMode === 'mission') {
      handleMissionButtonClick(index);
    } else if (gameMode === 'memory') {
      handleMemoryButtonClick(index);
    } else if (gameMode === 'scoring') {
      handleScoringButtonClick(index);
    }
  };

  const handleMissionMode = () => {
    const missionCompleted = lights.every((light) => !light);
    if (missionCompleted) {
      setScore(score + 10);
      setLevel(level + 1);
    }
  };

  const generatePattern = () => {
    const newPattern = Array(30).fill(false).map(() => Math.random() > 0.5);
    setGeneratedPattern(newPattern);
  };

  const handleMemoryMode = () => {
    generatePattern();
    const isPatternMatched = lights.every((light, index) => light === generatedPattern[index]);

    if (isPatternMatched) {
      setScore(score + 10);
      setLevel(level + 1);
      generatePattern(); // Generate a new pattern for the next level
    }
  };

  const handleScoringMode = () => {
    const lightsTurnedOff = lights.filter((light) => !light).length;
    setScore(score + lightsTurnedOff);
    setLevel(level + 1);
  };

  const handleMissionButtonClick = (index: number) => {
    const updatedLights = [...lights];
    updatedLights[index] = !updatedLights[index];
    setLights(updatedLights);
  };

  const handleMemoryButtonClick = (index: number) => {
    const updatedLights = [...lights];
    updatedLights[index] = !updatedLights[index];
    setLights(updatedLights);
  };

  const handleScoringButtonClick = (index: number) => {
    const updatedLights = [...lights];
    updatedLights[index] = !updatedLights[index];
    setLights(updatedLights);
  };

  const lightUpButtons = () => {
    let index = 0;
    const intervalId = setInterval(() => {
      const updatedLights = [...lights];
      updatedLights[index] = generatedPattern[index];
      setLights(updatedLights);

      index += 1;

      if (index === generatedPattern.length) {
        clearInterval(intervalId);
      }
    }, 500);
  };

  useEffect(() => {
    // Logic for game effects (e.g., lights flashing)
  }, [lights]);

  useEffect(() => {
    generatePattern(); // Initial pattern generation
  }, [level]);

  useEffect(() => {
    if (gameMode === 'memory') {
      lightUpButtons();
    }
  }, [generatedPattern]);

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
        <PushButtonsPanel lights={lights} onButtonClick={handleButtonClick} />

        {/* Lever UI */}
        {gameMode === 'memory' && <Lever onExecutePattern={handleExecutePattern} />}

        {/* Confirm Button */}    
        <ConfirmButton onClick={handleConfirmButtonPress} />

        {/* Score and Level Section */}
        <ScoreLevelSection score={score} level={level} />
      </div>
    </motion.main>
  );
};

export default Home;