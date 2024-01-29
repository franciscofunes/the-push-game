import { useState } from 'react';
import { GameMode } from '../types';

const useGameModeSelection = (): [GameMode, (mode: GameMode) => void] => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('memory');

  const selectMode = (mode: GameMode) => {
    setSelectedMode(mode);
  };

  return [selectedMode, selectMode];
};

export default useGameModeSelection;
