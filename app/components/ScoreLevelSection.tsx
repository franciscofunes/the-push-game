import React from 'react';
import { ScoreLevelSectionProps } from '../Shared/interfaces';

const ScoreLevelSection: React.FC<ScoreLevelSectionProps> = ({ score, level, lives }) => {
  return (
    <div className="m-2 text-center text-sm">
      <p>
        Score: {score}
      </p>
      <p>
        Level: {level}
      </p>
      <p>
        Lives: {lives}
      </p>
    </div>
  );
};

export default ScoreLevelSection;
