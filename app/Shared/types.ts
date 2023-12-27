export type ModeSelectionProps = {
    selectedMode: GameMode;
    onSelectMode: (mode: GameMode) => void;
};

export type GameMode = 'mission' | 'memory' | 'scoring';

export type TitleProps = {
    text: string;
    animate: boolean;
};