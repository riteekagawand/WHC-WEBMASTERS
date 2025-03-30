import React, { useState } from 'react';
import { LiaHomeSolid } from "react-icons/lia";
import { MdOutlineBuild, MdOutlineShoppingCart, MdOutlineForum } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (Visible on Small Screens) */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden p-3 fixed top-4 left-4 z-50 bg-lightpurp rounded-lg shadow-lg text-white"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-lightpurp p-4 shadow-lg overflow-y-auto transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:block`}
      >
        {/* Header */}
        <div className="flex items-center text-xl font-semibold mb-6 pl-4 font-sans">
          <span>HerSpace</span>
          <FaPlus className="ml-auto text-lg cursor-pointer" />
        </div>

        {/* Sidebar menu */}
        <ul className="pl-4">
          <li className="rounded-lg hover:bg-[#e8e5ff] transition">
            <Link to="home" className="flex items-center space-x-2 p-2 ">
              <LiaHomeSolid className="text-lg" />
              <span className="text-lg">Home</span>
            </Link>
          </li>
          <li className="rounded-lg hover:bg-[#e8e5ff] transition">
            <Link to="builder" className="flex items-center space-x-2 p-2 ">
              <MdOutlineBuild className="text-lg" />
              <span className="text-lg">Builder</span>
            </Link>
          </li>
          <li className="rounded-lg hover:bg-[#e8e5ff] transition">
            <Link to="ecommerce" className="flex items-center space-x-2 p-2 ">
              <MdOutlineShoppingCart className="text-lg" />
              <span className="text-lg">E-commerce</span>
            </Link>
          </li>
          <li className="rounded-lg hover:bg-[#e8e5ff] transition">
            <Link to="analytics" className="flex items-center space-x-2 p-2 ">
              <MdOutlineShoppingCart className="text-lg" />
              <span className="text-lg">Analyics</span>
            </Link>
          </li>
          <li className="rounded-lg hover:bg-[#e8e5ff] transition">
            <Link to="seo" className="flex items-center space-x-2 p-2 ">
              <MdOutlineShoppingCart className="text-lg" />
              <span className="text-lg">Optimize</span>
            </Link>
          </li>
          <li className="rounded-lg hover:bg-[#e8e5ff] transition">
            <Link to="forum" className="flex items-center space-x-2 p-2 ">
              <MdOutlineForum className="text-lg" />
              <span className="text-lg">Forum</span>
            </Link>
          </li>
          <li className="rounded-lg hover:bg-[#e8e5ff] transition">
            <Link to="portfoliobuilder" className="flex items-center space-x-2 p-2 ">
              <MdOutlineForum className="text-lg" />
              <span className="text-lg">Portfolio Builder</span>
            </Link>
          </li>
          <li className="rounded-lg hover:bg-[#e8e5ff] transition">
            <Link to="aiassistant" className="flex items-center space-x-2 p-2 ">
              <RiRobot2Line className="text-lg" />
              <span className="text-lg">AI Assistant</span>
            </Link>
          </li>
          
        </ul>


        {/* Recent Projects section */}
        <div className="mt-8 pl-4">
          <h3 className="text-sm font-semibold text-gray-500">RECENT PROJECTS</h3>
        <ul className="mt-2 space-y-2">
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#e8e5ff] transition">
              <span>📁</span>
              <span>Portfolio</span>
          </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#e8e5ff] transition">
              <span>📁</span>
              <span>Online Store</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 transition">
              <span>📁</span>
              <span>Blog</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay (for closing sidebar on mobile) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
