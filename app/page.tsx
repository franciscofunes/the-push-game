"use client"
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const Home = () => {
  const [lights, setLights] = useState(Array(30).fill(false));
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameMode, setGameMode] = useState('mission'); // Default mode is Mission Mode
  const [selectedMode, setSelectedMode] = useState('mission');
  const [generatedPattern, setGeneratedPattern] = useState<boolean[]>([]);


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
    setLights(Array(30).fill(true));
    setTimeout(() => {
      setLights(Array(30).fill(false));

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
    // Logic for Mission Mode button click
    // Update score, level, and lights based on the mission mode rules

  const updatedLights = [...lights];
    updatedLights[index] = !updatedLights[index];
    setLights(updatedLights);
  };

  const handleMemoryButtonClick = (index: number) => {
    // Logic for Memory Mode button click
    // Update score, level, and lights based on the memory mode rules

    // Example: Toggle the state of the light at the clicked index
    const updatedLights = [...lights];
    updatedLights[index] = !updatedLights[index];
    setLights(updatedLights);
  };

  const handleScoringButtonClick = (index: number) => {
    // Logic for Scoring Mode button click
    // Update score, level, and lights based on the scoring mode rules

    const updatedLights = [...lights];
    updatedLights[index] = !updatedLights[index];
    setLights(updatedLights);
  }

  const lightUpButtons = () => {
    let index = 0;
    const intervalId = setInterval(() => {
      const updatedLights = [...lights];
      updatedLights[index] = generatedPattern[index];
      setLights(updatedLights);
  
      index += 1;
  
      if (index === generatedPattern.length) {
        clearInterval(intervalId); // Stop the interval when all lights are updated
      }
    }, 500); // Adjust the delay as needed
  };
  

  useEffect(() => {
    // Logic for game effects (e.g., lights flashing)
    // You can customize this based on the game mode
  }, [lights]);

  useEffect(() => {
    generatePattern(); // Initial pattern generation
  }, [level]);

  useEffect(() => {
    if (gameMode === 'memory') {
      lightUpButtons(); // Light up buttons when the generated pattern changes
    }
  }, [generatedPattern]);



  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.buttonPanel}>
          <h1>Quick Push Game</h1>
          <div className={styles.modeSelection}>
            <button
              className={selectedMode === 'mission' ? styles.selectedMode : ''}
              onClick={() => selectMode('mission')}
            >
              Mission Mode
            </button>
            <button
              className={selectedMode === 'memory' ? styles.selectedMode : ''}
              onClick={() => selectMode('memory')}
            >
              Memory Mode
            </button>
            <button
              className={selectedMode === 'scoring' ? styles.selectedMode : ''}
              onClick={() => selectMode('scoring')}
            >
              Scoring Mode
            </button>
          </div>
          <div className={styles.buttonRow}>
            <button onClick={() => handleButtonClick(0)} style={{ backgroundColor: lights[0] ? 'yellow' : 'gray' }} />
            <button onClick={() => handleButtonClick(1)} style={{ backgroundColor: lights[1] ? 'yellow' : 'gray' }} />
            <button onClick={() => handleButtonClick(2)} style={{ backgroundColor: lights[2] ? 'yellow' : 'gray' }} />
          </div>
          <div className={styles.buttonRow}>
            <button onClick={() => handleButtonClick(3)} style={{ backgroundColor: lights[3] ? 'yellow' : 'gray' }} />
            <button onClick={() => handleButtonClick(4)} style={{ backgroundColor: lights[4] ? 'yellow' : 'gray' }} />
            <button onClick={() => handleButtonClick(5)} style={{ backgroundColor: lights[5] ? 'yellow' : 'gray' }} />
            <button onClick={() => handleButtonClick(6)} style={{ backgroundColor: lights[6] ? 'yellow' : 'gray' }} />
          </div>
          <div className={styles.buttonRow}>
            <button onClick={() => handleButtonClick(7)} style={{ backgroundColor: lights[7] ? 'yellow' : 'gray' }} />
            <button onClick={() => handleButtonClick(8)} style={{ backgroundColor: lights[8] ? 'yellow' : 'gray' }} />
            <button onClick={() => handleButtonClick(9)} style={{ backgroundColor: lights[9] ? 'yellow' : 'gray' }} />
          </div>
          <button className={styles.patternButton}>Execute Pattern</button>
        </div>
        <div className={styles.scorePanel}>
          <p>Score: {score}</p>
          <p>Level: {level}</p>
        </div>
      </div>
    </main>
  );
};

export default Home;

type GameMode = 'mission' | 'memory' | 'scoring';