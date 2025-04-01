import { useState } from "react";
import { LiaHomeSolid } from "react-icons/lia";
import {
	MdOutlineBuild,
	MdOutlineShoppingCart,
	MdOutlineAnalytics,
	MdOutlineLoop,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RiBook2Line, RiRobot2Line } from "react-icons/ri";
import logo from "../../assets/HerSpace Logo.svg"

const Sidebar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Toggle Button (Visible on Small Screens) */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="md:hidden p-3 fixed top-4 left-4 z-50 bg-lightpurp rounded-lg shadow-lg text-black"
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
				<Link to='/'>
								  <img src={logo} className="h-14  w-40 mt-[-10px]" alt="Logo" />
								</Link>
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
						<Link
							to="portfoliobuilder"
							className="flex items-center space-x-2 p-2 "
						>
							<MdOutlineBuild className="text-lg" />
							<span className="text-lg">Website Builder</span>
						</Link>
					</li>
					<li className="rounded-lg hover:bg-[#e8e5ff] transition">
						<Link to="builder" className="flex items-center space-x-2 p-2 ">
							<MdOutlineShoppingCart className="text-lg" />
							<span className="text-lg">Templates</span>
						</Link>
					</li>
					<li className="rounded-lg hover:bg-[#e8e5ff] transition">
						<Link to="analytics" className="flex items-center space-x-2 p-2 ">
							<MdOutlineAnalytics className="text-lg" />
							<span className="text-lg">Analytics</span>
						</Link>
					</li>
					<li className="rounded-lg hover:bg-[#e8e5ff] transition">
						<Link to="seo" className="flex items-center space-x-2 p-2 ">
							<MdOutlineLoop className="text-lg" />
							<span className="text-lg">Optimize</span>
						</Link>
					</li>
					<li className="rounded-lg hover:bg-[#e8e5ff] transition">
						<Link to="aiassistant" className="flex items-center space-x-2 p-2 ">
							<RiRobot2Line className="text-lg" />
							<span className="text-lg">AI Assistant</span>
						</Link>
					</li>
					<li className="rounded-lg hover:bg-[#e8e5ff] transition">
						<Link to="resourcehub" className="flex items-center space-x-2 p-2 ">
							<RiBook2Line className="text-lg" />
							<span className="text-lg">Resource Hub</span>
						</Link>
					</li>
				</ul>
			</div>
			{/* Overlay (for closing sidebar on mobile) */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
					onClick={() => setIsOpen(false)}
					onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
					role="button"
					tabIndex={0}
				/>
			)}
		</>
	);
};

export default Sidebar;
