import React from 'react';
import { IconType } from 'react-icons';

interface SummaryCardProps {
  title: string;
  value: string;
  buttonText: string;
  icon: IconType;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, buttonText, icon: Icon }) => {
  return (
    <div className="p-5 bg-lightpurp rounded-2xl shadow-sm hover:shadow-md transition-all">
      {/* Icon */}
      <div className="mb-4 flex items-center justify-start">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Icon className="text-purple text-xl" />
        </div>
      </div>
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {/* Value */}
      <p className="text-gray-500 text-sm mt-1">{value}</p>
      {/* Button */}
      <div className="mt-4">
        <button className="bg-purple text-black px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SummaryCard;