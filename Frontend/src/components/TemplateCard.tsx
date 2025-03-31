import { useState } from "react";
import type { IconType } from "react-icons";
import { FaRupeeSign } from "react-icons/fa6";
import { createPortal } from "react-dom";

interface TemplateCardProps {
	title: string;
	description: string;
	icon: IconType;
	price: string;
}

const imageMap: Record<string, string> = {
	Beauty: "/images/Webdesign.png",
	Food: "/images/Webdesign.png",
	Handicraft: "/images/Webdesign.png",
	Fashion: "/images/Webdesign.png",
	Travel: "/images/Webdesign.png",
	Technology: "/images/Webdesign.png",
	Health: "/images/Webdesign.png",
	Education: "/images/Webdesign.png",
	"Home Decor": "/images/Webdesign.png",
	Fitness: "/images/Webdesign.png",
};

const TemplateCard: React.FC<TemplateCardProps> = ({
	title,
	description,
	icon: Icon,
	price,
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const imageUrl = imageMap[title] || "/images/default.png";

	const resetZoom = () => {
		setPosition({ x: 0, y: 0 });
	};

	return (
		<div className="relative p-5 w-[270px] h-[300px] bg-lightpurpl rounded-2xl shadow-sm transition-all duration-300 transform hover:scale-105">
			<div className="absolute top-4 left-4 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shadow-md">
				<Icon className="text-[#634aff] text-2xl" />
			</div>
			<h3 className="text-xl font-semibold text-gray-800 mt-20">{title}</h3>
			<p className="text-gray-500 text-md mt-1">{description}</p>
			<p className="text-lg font-bold text-[#634aff] mt-2 flex items-center">
				<FaRupeeSign className="text-xl mr-1" /> {price}
			</p>
			<div className="absolute bottom-4 left-5 right-5 flex justify-between items-center">
				<button
					type="button"
					className="border border-gray-300 text-[#634aff] w-24 py-2 rounded-lg font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-200"
					onClick={() => setIsModalOpen(true)}
				>
					Preview
				</button>
				<button
					type="button"
					className="bg-[#634aff] text-black w-24 py-2 rounded-lg font-medium hover:bg-[#5038cc] hover:scale-105 transition-all duration-200"
				>
					Add to Cart
				</button>
			</div>

			{isModalOpen &&
				createPortal(
					<div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-80 z-[9999]">
						<div className="absolute inset-0 bg-white">
							<button
								type="button"
								className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-20 transition-all"
								onClick={() => {
									resetZoom();
									setIsModalOpen(false);
								}}
							>
								✖
							</button>

							<iframe
								title="Template Preview"
								src={`${imageUrl}?embed`}
								className="w-full h-full"
								style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
								allowFullScreen
							/>
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
};

export default TemplateCard;
