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

  const turnOffAllLights = () => {
    console.log('Turning off all lights');
    setLights(Array(10).fill(false));
  };

  // const startMemoryMode = async () => {
  //   await generatePattern();
  //   await delay(1000);

  //   setGamePhase('lightingButtons');
  //   await lightUpButtons();
  // };

  const startMemoryMode = async () => {
    await generatePattern();
    await delay(1000);
  
    if (gamePhase !== 'lightingButtons') {
      setGamePhase('lightingButtons');
    }
  };
  

  const evaluateMemoryPattern = async () => {
    console.log('Generated Pattern:', generatedPattern);
    console.log('User Input:', userInput);

    const isPatternMatched = userInput.every((input, index) => input === generatedPattern[index]);

    if (isPatternMatched) {
      setScore((prevScore) => prevScore + 10);
      setLevel((prevLevel) => prevLevel + 1);

      if (level < maxLevels) {
        await delay(1000)

        setGamePhase('roundStart');
        await generatePattern();
        await lightUpButtons();
      } else {
        setGamePhase('gameOver');
      }

      console.log('Correct pattern! Keep it going!');
    } else {
      console.log('Incorrect pattern! Try again.');
      await delay(1000);

      setGamePhase('roundStart');
      await generatePattern();

      await lightUpButtons();
    }

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
      console.log('new pattern', newPattern);
      setGeneratedPattern(newPattern);
      resolve();
    });
  };


  const handleInitialPhase = async () => {
    if (level > 1) {
      setGamePhase('lightingButtons');
      setLights(generatedPattern); // Set lights based on the generated pattern
      await lightUpButtons();
    }
  };

  const lightUpButtons = async () => {
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
      await delay(400);

      setLights((prevLights) => {
        const updatedLights = [...prevLights];
        updatedLights[index] = false;

        return updatedLights;
      });

    }

    setLocked(false); // Unlock UI buttons
    setGamePhase('userInput');
    turnOffAllLights();
  };

  const handleUserInput = (index: number) => {
    if (gamePhase === 'userInput') {
      const updatedInput = [...userInput];
      updatedInput.push(lights[index]);
      setUserInput(updatedInput);

      if (updatedInput.length === generatedPattern.length) {
        setGamePhase('confirmPattern');
        setConfirmPattern(updatedInput);
      }
    }
  };

  const resetGame = () => {
    setGeneratedPattern([]);
    setScore(0);
    setLevel(1);
    setUserInput([]);
    setGamePhase('initial');
    setConfirmPattern([]);
  };

  // useEffect(() => {
  //   handleInitialPhase();
  // }, [level]);

  useEffect(() => {
    const runLightUpButtons = async () => {
      if (gamePhase === 'lightingButtons') {
        await lightUpButtons();
      }
    };
  
    runLightUpButtons();
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
  };
};

export default useMemoryMode;
