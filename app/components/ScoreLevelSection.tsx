"use client"
import React from 'react';

interface ScoreLevelSectionProps {
  score: number;
  level: number;
}

const ScoreLevelSection: React.FC<ScoreLevelSectionProps> = ({ score, level }) => {
  return (
    <div className="m-2 text-center text-sm">
      <p>
        Score:{' '}
        {score}
      </p>
      <p>
        Level:{' '}
        {level}
      </p>
    </div>
  );
};

export default ScoreLevelSection;
