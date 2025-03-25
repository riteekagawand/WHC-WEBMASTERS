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
    <div className="bg-purple bg-opacity-15 rounded-xl p-6 shadow-md border-4 border-violet-800">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Icon className="w-9 h-9 text-purple text-xl" />
        </div>
        <div className='mr-2'>
          <p className="text-xl font-bold text-gray-700">{title}</p>
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
          <p className="text-md font-semibold text-gray-600">{change}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;