import { useState, useEffect } from 'react';
import { GameMode, GameModeConfigurations } from '../types';

const useGameModeConfiguration = (selectedMode: GameMode) => {
  const [configuration, setConfiguration] = useState({
    lights: [] as any[], // Replace 'any[]' with the actual type
    score: 0, // Replace 'any' with the actual type
    level: 1, // Replace 'any' with the actual type
  });

  useEffect(() => {
    // Define configurations for each game mode
    const modeConfigurations: GameModeConfigurations = {
      memory: {
        lights: [], // Actual lights configuration for memory mode
        score: 0, // Actual score configuration for memory mode
        level: 1, // Actual level configuration for memory mode
      },
      challenge: {
        lights: [], // Actual lights configuration for challenge mode
        score: 0, // Actual score configuration for challenge mode
        level: 1, // Actual level configuration for challenge mode
      },
      score: {
        lights: [], // Actual lights configuration for score mode
        score: 0, // Actual score configuration for score mode
        level: 1, // Actual level configuration for score mode
      },
    };

    // Check if selectedMode is a valid key in modeConfigurations
    const modeConfiguration = modeConfigurations[selectedMode] || {};

    // Update the configuration
    setConfiguration({
      lights: modeConfiguration.lights || [],
      score: modeConfiguration.score || 0,
      level: modeConfiguration.level || 1,
    });
  }, [selectedMode]);

  return configuration;
};

export default useGameModeConfiguration;
