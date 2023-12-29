import { useState, useEffect } from 'react';
import { GamePhase } from '../types';
import { delay } from '../utis/utils';

const useMemoryMode = () => {
  const [lights, setLights] = useState(Array(10).fill(false));
  const [generatedPattern, setGeneratedPattern] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [userInput, setUserInput] = useState<boolean[]>([]);
  const [gameState, setGameState] = useState<GamePhase>('initial');
  const [confirmPattern, setConfirmPattern] = useState<boolean[]>([]);
  const [locked, setLocked] = useState(false);

  const maxLevels = 5; // Set your desired maximum levels

  const turnOffLights = (lightsToTurnOff: number[] = []) => {
    setLights((prevLights) => {
      const updatedLights = [...prevLights];
      lightsToTurnOff.forEach((index) => {
        updatedLights[index] = false;
      });
      return updatedLights;
    });
  };

  const handleRoundStart = () => {
    generatePattern();
    delay(1000).then(() => {
      setGameState('lightingButtons');
      turnOffLights(); // Turn off lights before lighting buttons
      lightUpButtons();
    });
  };

  const evaluateMemoryPattern = () => {
    const isPatternMatched = userInput.every((input, index) => input === generatedPattern[index]);

    if (isPatternMatched) {
      setScore((prevScore) => prevScore + 10);
      setLevel((prevLevel) => prevLevel + 1);
      turnOffLights(); // Turn off lights when pattern is matched

      if (level < maxLevels) {
        delay(1000).then(() => {
          setGameState('roundStart');
          generatePattern();
          lightUpButtons();
        });
      } else {
        setGameState('gameOver');
      }

      console.log('Correct pattern! Keep it going!');
    } else {
      console.log('Incorrect pattern! Try again.');
      delay(1000).then(() => {
        setGameState('roundStart');
        generatePattern();
        lightUpButtons();
      });
    }

    return isPatternMatched;
  };

  const handleMemoryButtonClick = (index: number) => {
    if (gameState === 'userInput') {
      const updatedLights = [...lights];
      updatedLights[index] = !updatedLights[index];
      setLights(updatedLights);
  
      // Check if the lights are being turned on
      if (updatedLights[index]) {
        console.log('Turning off lights in handleMemoryButtonClick (userInput)');
        turnOffLights();
      }
    } else {
      console.log('Turning off lights in handleMemoryButtonClick (not userInput)');
      turnOffLights();
    }
  };

  const generatePattern = () => {
    const newPattern = Array(10).fill(false).map(() => Math.random() > 0.5);
    console.log('new pattern', newPattern);
    setGeneratedPattern(newPattern);
  };

  const handleInitialPhase = () => {
    if (level > 1) {
      setGameState('lightingButtons');
      turnOffLights(); // Add this line to turn off lights in the initial phase
      setLights(generatedPattern); // Set lights based on the generated pattern
      lightUpButtons();
    }
  };

  const lightUpButtons = async () => {
    setLocked(true); // Lock the UI buttons during animation
    for (let index = 0; index < generatedPattern.length; index++) {
      if (gameState === 'confirmPattern') {
        turnOffLights();
        setLocked(false); // Unlock UI buttons
        return;
      }

      const updatedLights = [...lights];
      updatedLights[index] = generatedPattern[index];
      setLights(updatedLights);

      await delay(500);

      setLights((prevLights) => {
        const updatedLights = [...prevLights];
        updatedLights[index] = false;
        return updatedLights;
      });
    }

    setLocked(false); // Unlock UI buttons
    setGameState('userInput');
    console.log('Lights turned off after lighting buttons');
  };

  const handleUserInput = (index: number) => {
    if (gameState === 'userInput') {
      const updatedInput = [...userInput];
      updatedInput.push(lights[index]);
      setUserInput(updatedInput);

      if (updatedInput.length === generatedPattern.length) {
        console.log('Turning off lights after user input:', updatedInput);
        turnOffLights();
        setGameState('confirmPattern');
        setConfirmPattern(updatedInput);
      }
    }
  };

  const confirmPatternAndProceed = () => {
    const isPatternConfirmed = confirmPattern.every((input, index) => input === generatedPattern[index]);

    if (isPatternConfirmed) {
      if (level < maxLevels) {
        setGameState('roundStart');
        generatePattern();
        lightUpButtons();
      } else {
        setGameState('gameOver');
      }
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    turnOffLights();
    setGeneratedPattern([]);
    setScore(0);
    setLevel(1);
    setUserInput([]);
    setGameState('initial');
    setConfirmPattern([]);
  };

  useEffect(() => {
    handleInitialPhase();
  }, [level]);

  return {
    lights,
    score,
    level,
    handleMemoryButtonClick,
    startMemoryMode: handleRoundStart,
    evaluateMemoryPattern,
    handleUserInput,
    resetGame,
    confirmPatternAndProceed,
    turnOffLights
  };
};

export default useMemoryMode;
