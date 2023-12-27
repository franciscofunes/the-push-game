import React from 'react';

interface PushButtonsPanelProps {
  lights: boolean[];
  onButtonClick: (index: number) => void;
}

const PushButtonsPanel: React.FC<PushButtonsPanelProps> = ({ lights, onButtonClick }) => {
  const rows = [3, 4, 3];

  return (
    <>
      {rows.map((rowCount, rowIndex) => (
        <div key={rowIndex} className="flex gap-5">
          {Array.from({ length: rowCount }).map((_, buttonIndex) => {
            const index = rows.slice(0, rowIndex).reduce((acc, curr) => acc + curr, 0) + buttonIndex;
            return (
              <button
                key={index}
                onClick={() => onButtonClick(index)}
                style={{ backgroundColor: lights[index] ? 'yellow' : 'gray' }}
                className="w-16 h-16 rounded-full bg-gray-500"
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default PushButtonsPanel;
