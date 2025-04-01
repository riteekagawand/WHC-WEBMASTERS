import { useEffect, useState } from "react";
import TemplateCard from "../components/TemplateCard";
import Sidebar from "../components/Dashboard/Sidebar";
import * as FaIcons from "react-icons/fa";
import type { IconType } from "react-icons";

interface TemplateData {
	icon: string;
	title: string;
	description: string;
	price: string;
}

interface Template {
	id: number;
	title: string;
	description: string;
	icon: IconType;
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

	useEffect(() => {
		fetch("/data/categories.json")
			.then((response) => response.json())
			.then((data) => {
				if (data.templates && Array.isArray(data.templates)) {
					const mappedTemplates = data.templates.map(
						(template: TemplateData) => ({
							...template,
							icon:
								FaIcons[template.icon as keyof typeof FaIcons] ||
								FaIcons.FaQuestionCircle, // ✅ Convert string icon to React component
						}),
					);

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
				(t) => t.title.toLowerCase() === category.toLowerCase(), // ✅ Use title instead of category
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

				{/* Category Filter Buttons */}
				<div className="mt-4 flex flex-wrap gap-3">
					{categories.map((category) => (
						<button
							type="button"
							key={category}
							className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
								selectedCategory === category
									? "bg-blue-600 text-black"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
							onClick={() => handleCategoryClick(category)}
						>
							{category}
						</button>
					))}
				</div>

				{/* Template Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 max-w-full">
					{filteredTemplates.map((template) => (
						<TemplateCard
							key={template.id}
							title={template.title}
							description={template.description}
							icon={template.icon}
							price={template.price}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default AllTemplates;
