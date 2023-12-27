export interface PushButtonsPanelProps {
    lights: boolean[];
    onButtonClick: (index: number) => void;
}

export interface ScoreLevelSectionProps {
    score: number;
    level: number;
}

export interface LeverProps {
    onExecutePattern: () => void;
}