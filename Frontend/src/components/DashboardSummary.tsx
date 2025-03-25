import React from 'react';
import { IconType } from 'react-icons';

interface SummaryCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: IconType;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, change, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-purple text-xl" />
        </div>
        <div>
          <p className="text-md font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-md text-gray-500">{change}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;