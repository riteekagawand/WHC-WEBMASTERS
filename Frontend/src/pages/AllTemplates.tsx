import React, { useEffect, useState } from "react";
import TemplateCard from "../components/TemplateCard";
import Sidebar from "../components/Dashboard/Sidebar";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Template {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType;
  price: string;
}

const categories = [
  "All",
  "Beauty",
  "Food",
  "Handicraft",
  "Fashion",
  "Travel",
  "Technology",
  "Health",
  "Education",
  "Home Decor",
  "Fitness",
];

const AllTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/categories.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.templates && Array.isArray(data.templates)) {
          const mappedTemplates = data.templates.map((template: any) => ({
            ...template,
            icon:
              FaIcons[template.icon as keyof typeof FaIcons] || FaIcons.FaQuestionCircle,
          }));

          setTemplates(mappedTemplates);
          setFilteredTemplates(mappedTemplates);
        }
      })
      .catch((error) => console.error("Error fetching templates:", error));
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredTemplates(templates);
    } else {
      const filtered = templates.filter(
        (t) => t.title.toLowerCase() === category.toLowerCase()
      );
      setFilteredTemplates(filtered);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">All Templates</h1>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="flex-shrink-0 w-[290px] mx-2 my-4">
              <TemplateCard
                id={template.id} // Pass the id
                title={template.title}
                description={template.description}
                icon={template.icon}
                price={template.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTemplates;