// src/components/Card.tsx

import React from 'react';
import { IconType } from 'react-icons';

interface CardProps {
  title: string;
  description: string;
  icon?: IconType; // Optional icon for the card
  actions?: React.ReactNode; // For buttons or other interactive elements
  className?: string; // For additional custom styling
}

const Card: React.FC<CardProps> = ({ title, description, icon: Icon, actions, className }) => {
  return (
    <div
      className={`p-5 bg-lightpurp rounded-2xl shadow-sm hover:shadow-md transition-all ${className}`}
    >
      {/* Icon (if provided) */}
      {Icon && (
        <div className="mb-6 flex items-center justify-start">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Icon className="text-purple text-3xl" />
          </div>
        </div>
      )}
      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h3>
      {/* Description */}
      <p className="text-gray-500 text-md mt-1 mb-6">{description}</p>
      {/* Actions (if provided) */}
      {actions && <div className="mt-4 flex space-x-2">{actions}</div>}
    </div>
  );
};

export default Card;