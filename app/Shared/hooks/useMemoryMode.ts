import { useState, useEffect } from 'react';
import { GamePhase } from '../types';
import { delay } from '../utis/utils';

const useMemoryMode = () => {
  const [lights, setLights] = useState(Array(10).fill(false));
  const [generatedPattern, setGeneratedPattern] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [userInput, setUserInput] = useState<boolean[]>([]);
  const [gamePhase, setGamePhase] = useState<GamePhase>('initial');
  const [confirmPattern, setConfirmPattern] = useState<boolean[]>([]);
  const [locked, setLocked] = useState(false);
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true);
  const [lives, setLives] = useState(3);
  const [lightSpeed, setLightSpeed] = useState(400); // Initial light speed


  const turnOffAllLights = () => {
    setLights(Array(10).fill(false));
  };

  const startMemoryMode = async () => {
    await generatePattern();
    await delay(1000);
    turnOffAllLights();

    setUserInput(Array(10).fill(false));

    if (gamePhase !== 'lightingButtons') {
      setGamePhase('lightingButtons');
    }
  };

  const evaluateMemoryPattern = async () => {
    const isPatternMatched = userInput.every((input, index) => input === generatedPattern[index]);

    if (isPatternMatched) {
      setScore((prevScore) => prevScore + 10);
      setLevel((prevLevel) => prevLevel + 1);
    } else {
      setLives((prevLives) => prevLives - 1);
    }

    startMemoryMode()

    return isPatternMatched;
  };

  const handleMemoryButtonClick = (index: number) => {
    if (gamePhase === 'userInput') {
      const updatedLights = [...lights];
      updatedLights[index] = !updatedLights[index];
      setLights(updatedLights);
    }
  };

  const generatePattern = (): Promise<void> => {
    return new Promise((resolve) => {
      const newPattern = Array(10).fill(false).map(() => Math.random() > 0.5);

      setGeneratedPattern(newPattern);
      resolve();
    });
  };

  const animateLights = async () => {
    setLocked(true); // Lock the UI buttons during animation

    for (let index = 0; index < generatedPattern.length; index++) {
      if (gamePhase === 'confirmPattern') {
        setLocked(false); // Unlock UI buttons
        return;
      }

      const updatedLights = [...lights];
      updatedLights[index] = generatedPattern[index];
      setLights(updatedLights);

      // Light speed
      await delay(lightSpeed);

      setLights((prevLights) => {
        const updatedLights = [...prevLights];
        updatedLights[index] = false;

        return updatedLights;
      });
    }

    setLocked(false); // Unlock UI buttons
    setGamePhase('userInput');
    setIsConfirmButtonDisabled(false);
  };

  const lightUpButtons = async () => {
    await animateLights();
  };

  const handleUserInput = (index: number) => {
    if (gamePhase === 'userInput') {
      setUserInput((prevInput) => {
        // Create a copy of the previous state with fixed length 10
        const updatedInput = Array.from({ length: 10 }, (_, i) => prevInput[i] || false);
        updatedInput[index] = !prevInput[index];  // Toggle the clicked position

        // Check if the user has clicked all lit positions
        const isInputComplete = generatedPattern.every((value, index) => (value ? updatedInput[index] : true));

        if (isInputComplete) {
          setGamePhase('confirmPattern');
          setConfirmPattern(updatedInput);

          // Decrease light speed by three points
          setLightSpeed((prevSpeed) => prevSpeed - 3);
        }
        
        return updatedInput;
      });
    }
  };

  const resetGame = () => {
    setGeneratedPattern([]);
    setScore(0);
    setLevel(1);
    setUserInput([]);
    setGamePhase('initial');
    setConfirmPattern([]);
    setLives(3); // Reset lives to the initial value
  };

  useEffect(() => {
    const runLightUpButtons = async () => {
      if (gamePhase === 'lightingButtons') {
        setIsConfirmButtonDisabled(true);
        await lightUpButtons();
      }
    };

    runLightUpButtons();
  }, [gamePhase]);

  useEffect(() => {
    if (lives <= 0) {
      // No more lives, reset the game
      resetGame();
    } else {
      // Start memory mode after updating the state
      startMemoryMode();
    }
  }, [lives]);
 
  useEffect(() => {
    // ... (existing useEffect)

    // Reset light speed to the initial value when starting a new round
    setLightSpeed(400);
  }, [gamePhase]);
  return {
    lights,
    score,
    level,
    handleMemoryButtonClick,
    startMemoryMode,
    evaluateMemoryPattern,
    handleUserInput,
    resetGame,
    isConfirmButtonDisabled,
    lives
  };
};

export default useMemoryMode;