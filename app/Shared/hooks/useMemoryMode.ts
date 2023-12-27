import { useState, useEffect } from 'react';

const useMemoryMode = () => {
  const [lights, setLights] = useState(Array(10).fill(false));
  const [generatedPattern, setGeneratedPattern] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const generatePattern = () => {
    const newPattern = Array(30).fill(false).map(() => Math.random() > 0.5);
    setGeneratedPattern(newPattern);
  };

  const evaluateMemoryPattern = () => {
    const isPatternMatched = lights.every((light, index) => light === generatedPattern[index]);

    if (isPatternMatched) {
      setScore((prevScore) => prevScore + 10);
      setLevel((prevLevel) => prevLevel + 1);
      generatePattern();
    } else {
      console.log('Incorrect pattern! Try again.');
    }
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

  const handleMemoryButtonClick = (index: number) => {
    const updatedLights = [...lights];
    updatedLights[index] = !updatedLights[index];
    setLights(updatedLights);
  };

  const startMemoryMode = () => {
    setLights(Array(10).fill(true));

    setTimeout(() => {
      setLights(Array(10).fill(false));
      lightUpButtons();
    }, 1000);
  };

  useEffect(() => {
    generatePattern(); // Initial pattern generation
  }, [level]);

  return {
    lights,
    score,
    level,
    handleMemoryButtonClick,
    startMemoryMode,
    evaluateMemoryPattern,
  };
};

export default useMemoryMode;
