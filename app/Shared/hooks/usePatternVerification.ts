import { useState, useEffect } from 'react';
import { UsePatternVerificationProps } from '../types';

const usePatternVerification = ({ evaluatePattern, onConfirm }: UsePatternVerificationProps): [boolean, () => void] => {
  const [confirmButtonPressed, setConfirmButtonPressed] = useState(false);

  const handleConfirmButtonPress = () => {
    // Add any logic you need before verifying the pattern

    // Call the passed function to evaluate the pattern
    evaluatePattern();

    // Add any logic you need after verifying the pattern

    // Set confirmButtonPressed to true
    setConfirmButtonPressed(true);
  };

  return [confirmButtonPressed, handleConfirmButtonPress];
};

export default usePatternVerification;
