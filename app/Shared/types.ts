export type ModeSelectionProps = {
    selectedMode: GameMode;
    onSelectMode: (mode: GameMode) => void;
};

export type GameMode = 'challenge' | 'memory' | 'score';

export type TitleProps = {
    text: string;
    animate: boolean;
};

export type GameModeConfigurations = Record<GameMode, { lights: any[]; score: number; level: number }>;
 
export type GamePhase = 'initial' | 'roundStart' | 'lightingButtons' | 'userInput' | 'evaluation' | 'patternGuessed' | 'gameOver' | 'confirmPattern';

export type UsePatternVerificationProps = {
    evaluatePattern: () => void; // Modify the type based on your needs
    onConfirm?: () => void; // Optional callback for handling confirmation
  };
  