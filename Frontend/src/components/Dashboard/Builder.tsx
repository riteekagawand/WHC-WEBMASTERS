import React, { useEffect, useState } from "react";
import TemplateCard from "../TemplateCard";
import StartFromScratchCard from "../StartFromScratchCard";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { PiFileArrowUpDuotone } from "react-icons/pi";
import * as FaIcons from "react-icons/fa"; 

interface Template {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const Builder: React.FC = () => {
  const [popularTemplates, setPopularTemplates] = useState<Template[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<Template[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
	fetch("/data/categories.json")
	  .then((response) => response.json())
	  .then((data) => {
		if (data.templates && Array.isArray(data.templates)) {
		  const mappedTemplates = data.templates.map((template) => ({
			...template,
			icon: FaIcons[template.icon] || FaIcons.FaQuestionCircle,
			price: template.price || "0.00", // Ensure price is included
		  }));
  
		  setPopularTemplates(mappedTemplates.slice(0, 4));
		  setRecentlyAdded([...mappedTemplates].sort(() => 0.5 - Math.random()).slice(0, 4));
		}
	  })
	  .catch((error) => console.error("Error fetching templates:", error));
  }, []);
  
  const scratchOptions = [
    {
      title: "Blank Canvas",
      description: "Start with a completely blank page and build your website from scratch",
      buttonText: "Create New",
      icon: CiCirclePlus,
      isDisabled: false,
    },
    {
      title: "Import Design",
      description: "Upload your own design files and convert them to a website",
      buttonText: "Import",
      icon: PiFileArrowUpDuotone,
      isDisabled: true,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Templates</h1>
      </div>
      <p className="text-gray-500 mt-2">
        Create beautiful websites with our easy-to-use builder
      </p>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Popular Templates</h2>
          <button
  			onClick={() => navigate("/all-templates")}
  			className="text-[#634aff] border border-[#634aff] px-4 py-2 rounded-full font-medium transition-all duration-200 hover:bg-[#634aff] hover:text-black"
			  >
  			See All
		</button>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
		{popularTemplates.map((template) => (
  		<TemplateCard
    	key={template.id}
    	title={template.title}
    	description={template.description}
    	icon={template.icon}
    	price={template.price} // ✅ Pass price
  		/>
		))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Recently Added</h2>
          <button
  			onClick={() => navigate("/all-templates")}
  			className="text-[#634aff] border border-[#634aff] px-4 py-2 rounded-full font-medium transition-all duration-200 hover:bg-[#634aff] hover:text-black"
			  >
  			See All
		</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {recentlyAdded.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.title}
              description={template.description}
              icon={template.icon}
            />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800">Start from Scratch</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          {scratchOptions.map((option) => (
            <StartFromScratchCard
              key={option.title}
              title={option.title}
              description={option.description}
              buttonText={option.buttonText}
              icon={option.icon}
              isDisabled={option.isDisabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Builder;
