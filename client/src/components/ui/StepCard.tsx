import React from 'react';

type StepCardProps = {
  number: string;
  title: string;
  description: string;
};

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
