import { useState } from 'react';
import { GameMode } from '../types';

const usePatternVerification = (
    selectedMode: GameMode,
    evaluateMemoryPattern: () => void, // Modify the type based on your needs
): [boolean, () => void] => {
    const [confirmButtonPressed, setConfirmButtonPressed] = useState(false);

    const handleConfirmButtonPress = () => {
        // Add any logic you need before verifying the pattern

        // Call the appropriate function based on the selected mode
        switch (selectedMode) {
            case 'memory':
                evaluateMemoryPattern();
                break;
            // Add other cases as needed for different game modes

            default:
                // Handle default case or display an error
                break;
        }

        // Add any logic you need after verifying the pattern

        // Set confirmButtonPressed to true
        setConfirmButtonPressed(true);
    };

    return [confirmButtonPressed, handleConfirmButtonPress];
};

export default usePatternVerification;
