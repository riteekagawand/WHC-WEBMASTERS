import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom"; // Import Link

interface TemplateCardProps {
  title: string;
  description: string;
  icon: IconType;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, icon: Icon }) => {
  const formattedTitle = title.toLowerCase().replace(/\s+/g, "-"); // Format for URL

  return (
    <div className="relative p-5 w-[270px] h-[300px] bg-lightpurp rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div className="absolute -top- -left- w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shadow-md">
        <Icon className="text-[#634aff] text-2xl" />
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mt-20">{title}</h3>
      <p className="text-gray-500 text-md mt-1">{description}</p>

      <div className="mt-4 flex space-x-3">
        <Link
          to={`/dashboard/${formattedTitle}`} // Route to new page
         className="bg-[#634aff] w-24 text-white py-1 rounded-lg font-medium hover:bg-[#5038cc] transition text-center"
        >
          Use Template
        </Link>
        <button className="border border-gray-300 text-[#634aff] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
          Preview
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
