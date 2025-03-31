import Card from "../AiTools";
import { FaGraduationCap } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ResourceHub: React.FC = () => {
	const navigate = useNavigate();

	// Data for Resource Tools
	const resourceTools = [
		{
			title: "Resume Builder",
			description:
				"Create professional resumes tailored to your industry and experience",
			icon: HiDocumentText,
			onClick: (e: React.MouseEvent) => {
				e.preventDefault();
				navigate("/dashboard/resumeBuilder");
			},
		},
		{
			title: "Course Generator",
			description: "This feature is Coming Soon!!",
			icon: FaGraduationCap,
		},
	];

	return (
		<div className="p-6 min-h-screen">
			{/* Header */}
			<div className="flex justify-between items-center mb-10">
				<div>
					<h1 className="text-3xl font-bold text-gray-800">Resource Hub</h1>
					<p className="text-gray-600 mt-8">
						Create professional resumes and generate customized learning
						materials
					</p>
				</div>
			</div>

			{/* Resource Tools */}
			<div className="mt-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Resource Tools
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{resourceTools.map((tool) => (
						<Card
							key={tool.title}
							title={tool.title}
							description={tool.description}
							icon={tool.icon}
							actions={
								<button
									type="button"
									onClick={tool.onClick}
									className="bg-purple text-black px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
								>
									Generate
								</button>
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ResourceHub;
