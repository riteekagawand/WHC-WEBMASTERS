import React from 'react';
import { IconType } from 'react-icons';

interface StartFromScratchCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: IconType; // The icon prop will be a React component from react-icons
}

const StartFromScratchCard: React.FC<StartFromScratchCardProps> = ({ title, description, buttonText, icon: Icon }) => {
  return (
    <div className="bg-lightpurp p-5 bg-purple-50 rounded-2xl shadow-sm hover:shadow-md transition-all">
      {/* Circular icon container */}
      <div className="relative mb-4 flex items-center justify-start">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Icon className="text-purple text-3xl" />
        </div>
      </div>
      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      {/* Description */}
      <p className="text-gray-500 text-md mt-1">{description}</p>
      {/* Button */}
      <div className="mt-4">
        <button className="bg-purple text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default StartFromScratchCard;