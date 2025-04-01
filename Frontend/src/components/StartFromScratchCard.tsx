import React from 'react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

interface StartFromScratchCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: IconType;
  isDisabled?: boolean; // New prop to control button state
}

const StartFromScratchCard: React.FC<StartFromScratchCardProps> = ({ title, description, buttonText, icon: Icon, isDisabled = false }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!isDisabled) {
      navigate('../../dashboard/portfoliobuilder'); // Adjust the path as needed
    }
  };

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
        <button
          onClick={handleNavigate}
          className={`bg-purple text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition ${
            isDisabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default StartFromScratchCard;