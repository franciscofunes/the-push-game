import React from 'react';

const PushPanelButton: React.FC<{ index: number; lights: boolean[]; onButtonClick: Function; onUserInput: Function }> = ({
    index,
    lights,
    onButtonClick,
    onUserInput,
}) => {
    const handleClick = () => {
        if (onButtonClick && onUserInput && onUserInput instanceof Function && onButtonClick instanceof Function) {
            onUserInput(index);
            onButtonClick(index);
        }
    };

    return (
        <button
            onClick={handleClick}
            style={{ backgroundColor: lights[index] ? 'yellow' : 'gray' }}
            className="w-16 h-16 rounded-full bg-gray-500"
        />
    );
};

export default PushPanelButton;