export interface PushButtonsPanelProps {
    lights: boolean[];
    onButtonClick: (index: number) => void;
    onUserInput: (index: number) => void; // New prop for capturing user input
  }

export interface ScoreLevelSectionProps {
    score: number;
    level: number;
}

export interface ConfirmButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export interface ScoreLevelSectionProps {
  score: number;
  level: number;
}