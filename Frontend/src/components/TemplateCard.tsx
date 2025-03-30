import React, { useState, useRef } from "react";
import { IconType } from "react-icons";
import { FaRupeeSign } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";

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

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, icon: Icon, price }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imageUrl = imageMap[title] || "/images/default.png";
  const imageRef = useRef<HTMLImageElement>(null);

  const isZoomed = zoomLevel > 1;

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 5));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 1));

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative p-5 w-[270px] h-[300px] bg-lightpurp rounded-2xl shadow-sm transition-all duration-300 transform hover:scale-105">
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
          className="border border-gray-300 text-[#634aff] w-24 py-2 rounded-lg font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          Preview
        </button>
        <button className="bg-[#634aff] text-white w-24 py-2 rounded-lg font-medium hover:bg-[#5038cc] hover:scale-105 transition-all duration-200">
          Add to Cart
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-white w-full md:w-[90%] max-w-[1500px] h-[85vh] rounded-lg shadow-2xl relative overflow-hidden">
            <button
              className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-70 p-2 rounded-full text-xl hover:bg-opacity-100 z-20 transition-all"
              onClick={() => {
                resetZoom();
                setIsModalOpen(false);
              }}
            >
              ✖
            </button>

            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <button className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm hover:bg-opacity-100 transition-all" onClick={zoomOut}> <FiMinus /> </button>
              <span className="text-white px-2">{Math.round(zoomLevel * 100)}%</span>
              <button className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm hover:bg-opacity-100 transition-all" onClick={zoomIn}> <FiPlus /> </button>
            </div>

            <div
              className="w-full h-full overflow-hidden flex items-center justify-center"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                ref={imageRef}
                src={imageUrl}
                alt={title}
                className="object-contain"
                style={{
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                  cursor: isZoomed ? "grab" : "default",
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCard;
