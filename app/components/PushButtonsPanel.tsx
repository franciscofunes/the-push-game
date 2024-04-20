import React from 'react';
import { PushButtonsPanelProps } from '../Shared/interfaces';
import PushPanelButton from './PushPanelButton';

const PushButtonsPanel: React.FC<PushButtonsPanelProps> = ({ lights, onButtonClick, onUserInput }) => {
  const buttonRows = [3, 4, 3];

  return (
    <div className="flex flex-col gap-5">
      {buttonRows.map((rowCount, rowIndex) => (
        <div key={rowIndex} className="flex gap-5 justify-center ">
          {Array.from({ length: rowCount }).map((_, buttonIndex) => {
            const index = buttonRows.slice(0, rowIndex).reduce((acc, curr) => acc + curr, 0) + buttonIndex;
            return (
              <PushPanelButton
                key={index}
                index={index}
                lights={lights}
                onButtonClick={onButtonClick}
                onUserInput={onUserInput}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PushButtonsPanel;
