import { Timestamp } from "firebase/firestore";

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
  lives: number;
}

export interface ModalProps {
  score: number;
  nickname: string;
  setNickname: (value: string) => void;
  closeModal: () => void;
  saveScore: (nickname: string, score: number) => void; // New prop for saving score
}

export interface ScoreDocument {
  nickname: string;
  score: number;
  gameplayDate: Timestamp;
}