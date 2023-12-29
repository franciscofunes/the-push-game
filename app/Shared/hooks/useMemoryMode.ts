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

  const maxLevels = 5; // Set your desired maximum levels

  const turnOffLights = (lightsToTurnOff: number[] = []) => {
    console.log('turning off lights')
    setLights((prevLights) => {
      const updatedLights = [...prevLights];
      lightsToTurnOff.forEach((index) => {
        updatedLights[index] = false;
      });
      return updatedLights;
    });
  };

  const turnOffAllLights = () => {
    console.log('Turning off all lights');
    setLights(Array(10).fill(false));
  };

  const handleRoundStart = () => {
    generatePattern();
    delay(1000).then(() => {
      setGamePhase('lightingButtons');
      turnOffLights(); // Turn off lights before lighting buttons
      lightUpButtons();
    });
  };

  const evaluateMemoryPattern = () => {
    console.log('Generated Pattern:', generatedPattern);
    console.log('User Input:', userInput);

    const isPatternMatched = userInput.every((input, index) => input === generatedPattern[index]);

    if (isPatternMatched) {
      setScore((prevScore) => prevScore + 10);
      setLevel((prevLevel) => prevLevel + 1);

      if (level < maxLevels) {
        console.log('level < maxLevels:', level < maxLevels)
        delay(1000).then(() => {
          setGamePhase('roundStart');
          generatePattern();
          lightUpButtons();
        });
      } else {
        setGamePhase('gameOver');
      }

      console.log('Correct pattern! Keep it going!');
    } else {
      console.log('Incorrect pattern! Try again.');
      delay(1000).then(() => {
        setGamePhase('roundStart');
        generatePattern();
        lightUpButtons();
      });

    }
    return isPatternMatched;
  };

  const handleMemoryButtonClick = (index: number) => {
    if (gamePhase === 'userInput') {
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
      setGamePhase('lightingButtons');
      turnOffLights(); // Add this line to turn off lights in the initial phase
      setLights(generatedPattern); // Set lights based on the generated pattern
      lightUpButtons();
    }
  };

  const lightUpButtons = async () => {
    setLocked(true); // Lock the UI buttons during animation
    for (let index = 0; index < generatedPattern.length; index++) {
      if (gamePhase === 'confirmPattern') {
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
    setGamePhase('userInput');
    console.log('Lights turned off after lighting buttons');
  };

  const handleUserInput = (index: number) => {
    if (gamePhase === 'userInput') {
      const updatedInput = [...userInput];
      updatedInput.push(lights[index]);
      setUserInput(updatedInput);

      if (updatedInput.length === generatedPattern.length) {
        console.log('Turning off lights after user input:', updatedInput);
        turnOffLights();
        setGamePhase('confirmPattern');
        setConfirmPattern(updatedInput);
      }
    } else {
      console.log('Turning off lights in handleUserInput (not userInput)');
      turnOffLights();
    }
  };

  const confirmPatternAndProceed = () => {
    const isPatternConfirmed = confirmPattern.every((input, index) => input === generatedPattern[index]);

    if (isPatternConfirmed) {
      if (level < maxLevels) {
        setGamePhase('roundStart');
        generatePattern();
        lightUpButtons();

      } else {
        setGamePhase('gameOver');
      }
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    turnOffAllLights();
    turnOffLights();
    setGeneratedPattern([]);
    setScore(0);
    setLevel(1);
    setUserInput([]);
    setGamePhase('initial');
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
