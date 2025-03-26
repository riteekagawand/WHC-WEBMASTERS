import categorylist from "../../../data/categorylist";
import React from "react";

interface SelectCategoryProps {
	category: string;
	setCategory: (category: string) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
	category,
	setCategory,
}) => {
	const handleCategoryChange = (selectedCategory: string) => {
		setCategory(selectedCategory);
	};

	return (
		<div className="my-20 px-10 md:px-20">
			<div className="text-lg font-medium">Select the course category</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
				{categorylist.map((item, index) => (
					<div
						key={index}
						onClick={() => handleCategoryChange(item.name)}
						className={`space-y-2 flex flex-col p-4 border-dashed border-2 border-purple hover:scale-95 transition-all shadow-md hover:shadow-lg items-center rounded-xl hover:border-purple cursor-pointer ${category === item.name && "scale-95 transition-all"}`}
					>
						<h1 className="p-2 bg-purple text-white rounded-lg">{item.icon}</h1>
						<h1 className="text-purple font-bold text-lg">{item.name}</h1>
					</div>
				))}
			</div>
		</div>
	);
};

export default SelectCategory;
