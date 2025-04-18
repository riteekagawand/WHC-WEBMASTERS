import { useEffect } from "react";
import Card from "../AiTools"; // Note: The import path was updated to match the previous context
import { GoPencil } from "react-icons/go";
import { RiCustomerService2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
	const navigate = useNavigate();
	  useEffect(() => {
		window.scrollTo(0, 0);
		document.title = `HerSpace | AI Assistant`;
	  }, []);
	

	// Data for Popular AI Tools
	const popularTools = [
		{
			title: "Content Generator",
			description:
				"Create engaging blog posts, social media content, and product descriptions",
			icon: GoPencil,
			onClick: (e: React.MouseEvent) => {
				e.preventDefault();
				navigate("/dashboard/contentGenerator");
			},
		},
		{
			title: "Customer Service Support",
			description:
				"Automate responses to common customer inquiries and save time",
			icon: RiCustomerService2Line,
			onClick: (e: React.MouseEvent) => {
				e.preventDefault();
				navigate("/dashboard/aiChat");
			},
		},
	];

	// Data for Recent Conversations
	// const recentConversations = [
	//   {
	//     title: 'Email Campaign Strategy',
	//     description: 'Last updated: Tuesday 3:20 PM • 16 messages',
	//     icon: MdOutlineMailOutline,
	//   },
	//   {
	//     title: 'Product Description for NEW Collection',
	//     description: 'Last updated: Yesterday 1:45 PM • 8 messages',
	//     icon: MdOutlineDescription,
	//   },
	//   {
	//     title: 'Customer Support Automation Setup',
	//     description: 'Last updated: 2 days ago • 22 messages',
	//     icon: RiCustomerService2Line,
	//   },
	//   {
	//     title: 'Social Media Content Calendar',
	//     description: 'Last updated: 3 days ago • 12 messages',
	//     icon: FaRegCalendar,
	//   },
	// ];

	return (
		<div className="p-6 min-h-screen">
			{/* Header */}
			<div className="flex justify-between items-center mb-10">
				<div>
					<h1 className="text-3xl font-bold text-gray-800">
						AI Business Assistant
					</h1>
					<p className="text-gray-600 mt-8">
						Get business recommendations, content suggestions, and automated
						customer support
					</p>
				</div>
			</div>

			{/* Navigation Tabs */}
			{/* <div className="flex space-x-4 mb-6">
				{tabs.map((tab) => (
					<button
						key={tab}
						className={`text-gray-600 font-semibold pb-2 ${
							tab === "All" ? "border-b-2 border-purple" : ""
						}`}
					>
						{tab}
					</button>
				))}
			</div> */}

			{/* Popular AI Tools */}
			<div className="mt-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Popular AI Tools
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{popularTools.map((tool) => (
						<Card
							key={tool.title}
							title={tool.title}
							description={tool.description}
							icon={tool.icon}
							actions={
								<button
									type="button"
									onClick={tool.onClick}
									className="bg-purple text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
								>
									Generate
								</button>
							}
						/>
					))}
				</div>
			</div>

			{/* Recent Conversations */}
			{/* <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Conversations</h2>
        <div className="bg-white rounded-2xl shadow-sm p-4">
            {recentConversations.map((conversation) => (
            <div
                key={conversation.title}
                className="flex items-center py-2 border-b last:border-b-0"
            >
                {/* Dynamic Icon */}
			{/* <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <conversation.icon className="text-purple text-xl" />
                </div>
                {/* Conversation Details */}
			{/* <div className="flex-1">
                <h3 className="text-gray-800 font-medium">{conversation.title}</h3>
                <p className="text-gray-600 text-sm">{conversation.description}</p>
                </div>
                <button className="text-purple font-medium">Open</button>
            </div>
            ))}
        </div>
        </div>  */}

			{/* Recommended for You */}
			{/* <div className="mt-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Recommended for You
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{recommendations.map((recommendation) => (
						<Card
							key={recommendation.title}
							title={recommendation.title}
							description={recommendation.description}
							icon={recommendation.icon}
							actions={
								<>
									<button className="bg-purple text-black px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
										Try Now
									</button>
									<button className="text-purple font-medium px-4 py-2 rounded-lg">
										Learn More
									</button>
								</>
							}
						/>
					))}
				</div>
			</div> */}
		</div>
	);
};

export default App;
