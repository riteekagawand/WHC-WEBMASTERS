import React, { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { MdTopic } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";
import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface FormData {
	category: string;
	topic: string;
	description: string;
	difficulty: string;
	duration: string;
	chapters: number;
	language: string;
}

interface Chapter {
	chapterName: string;
	aboutChapter: string;
	duration: string;
}

interface CourseStructure {
	courseName: string;
	description: string;
	topic: string;
	category: string;
	courseLevel: string;
	duration: string;
	language: string;
	chapters: Chapter[];
}

const AICourse: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		category: "",
		topic: "",
		description: "",
		difficulty: "beginner",
		duration: "",
		chapters: 1,
		language: "English",
	});

	const [generatedCourse, setGeneratedCourse] =
		useState<CourseStructure | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const stepperOptions = [
		{
			id: 1,
			nameCategory: "Category/Domain",
			icon: <BiSolidCategory size={25} color="#101010" />,
		},
		{
			id: 2,
			nameCategory: "Topic/Description",
			icon: <MdTopic size={25} color="#101010" />,
		},
		{
			id: 3,
			nameCategory: "Options",
			icon: <IoMdOptions size={25} color="#101010" />,
		},
	];

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "chapters" ? parseInt(value) : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await generateCourse(formData);
			setGeneratedCourse(response);
		} catch (error) {
			console.error("Error generating course:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const generateCourse = async (
		formData: FormData,
	): Promise<CourseStructure> => {
		try {
			const response = await fetch("/api/generate-course", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error generating course:", error);
			throw new Error("Failed to generate course");
		}
	};

	// Render different form sections based on activeIndex
	const renderFormSection = () => {
		switch (activeIndex) {
			case 0:
				return (
					<div className="space-y-4">
						<label className="block text-sm font-medium text-gray-700">
							Category
						</label>
						<input
							type="text"
							name="category"
							value={formData.category}
							onChange={handleInputChange}
							className="w-full p-2 border rounded-lg"
							required
						/>
					</div>
				);
			case 1:
				return (
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Topic
							</label>
							<input
								type="text"
								name="topic"
								value={formData.topic}
								onChange={handleInputChange}
								className="w-full p-2 border rounded-lg"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Description
							</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								className="w-full p-2 border rounded-lg"
								rows={4}
								required
							/>
						</div>
					</div>
				);
			case 2:
				return (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Difficulty Level
							</label>
							<select
								name="difficulty"
								value={formData.difficulty}
								onChange={handleInputChange}
								className="w-full p-2 border rounded-lg"
								required
							>
								<option value="beginner">Beginner</option>
								<option value="intermediate">Intermediate</option>
								<option value="advanced">Advanced</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Duration (in hours)
							</label>
							<input
								type="number"
								name="duration"
								value={formData.duration}
								onChange={handleInputChange}
								className="w-full p-2 border rounded-lg"
								min="1"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Number of Chapters
							</label>
							<input
								type="number"
								name="chapters"
								value={formData.chapters}
								onChange={handleInputChange}
								className="w-full p-2 border rounded-lg"
								min="1"
								max="20"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Language
							</label>
							<input
								type="text"
								name="language"
								value={formData.language}
								onChange={handleInputChange}
								className="w-full p-2 border rounded-lg"
								required
							/>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<div className="flex flex-col justify-center items-center mt-10">
				<h2 className="text-4xl text-primary font-bold tracking-tight">
					Create Course
				</h2>
				<p className="text-lg mt-2 font-semibold tracking-tighter text-gray-500">
					Enter the details properly and accurate to get the desired response
					from AI
				</p>

				{/* Stepper */}
				<div className="flex mt-20">
					{stepperOptions.map((item, index) => (
						<div key={item.id} className="flex items-center">
							<div className="flex flex-col items-center w-[50px] md:w-[100px]">
								<div
									className={`bg-gray-200 p-3 rounded-full ${
										activeIndex >= index && "bg-primary"
									}`}
								>
									{item.icon}
								</div>
								<div>
									<h2 className="hidden font-bold md:block md:text-sm">
										{item.nameCategory}
									</h2>
								</div>
							</div>
							{index !== stepperOptions.length - 1 && (
								<div
									className={`h-1 mb-0 md:mb-5 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${
										activeIndex - 1 >= index && "bg-violet-600"
									}`}
								></div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Form Section */}
			<div className="max-w-4xl mx-auto p-6 mt-10">
				<form className="space-y-6 bg-white rounded-lg shadow-sm p-6">
					{renderFormSection()}
				</form>

				{/* Navigation Buttons */}
				<div className="flex justify-between mt-10">
					<button
						className="px-4 py-2 border rounded-lg text-gray-700"
						disabled={activeIndex === 0}
						onClick={() => setActiveIndex(activeIndex - 1)}
					>
						Previous
					</button>

					{activeIndex < 2 ? (
						<button
							className="px-4 py-2 bg-primary text-black rounded-lg"
							onClick={() => setActiveIndex(activeIndex + 1)}
							disabled={
								(activeIndex === 0 && !formData.category) ||
								(activeIndex === 1 &&
									(!formData.topic || !formData.description))
							}
						>
							Next
						</button>
					) : (
						<motion.div
							className="relative p-[2px] rounded-lg"
							initial={{ backgroundPosition: "0% 50%" }}
							animate={{ backgroundPosition: "200% 50%" }}
							transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
							style={{
								background:
									"linear-gradient(90deg, #ff00ff, #00ffff, #ff0, #ff00ff)",
								backgroundSize: "200% 200%",
							}}
						>
							<button
								onClick={handleSubmit}
								disabled={isLoading}
								className="relative z-10 bg-primary hover:bg-primary/50 text-black px-4 py-2 rounded-lg flex items-center gap-2"
							>
								{isLoading ? (
									<>
										<ImSpinner2 size={20} className="animate-spin" />
										Generating course from AI...
									</>
								) : (
									<>
										<BsStars size={20} />
										Generate course from AI
									</>
								)}
							</button>
						</motion.div>
					)}
				</div>
			</div>

			{/* Generated Course Display */}
			{generatedCourse && (
				<div className="mt-8 bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
					<h2 className="text-2xl font-bold mb-4">
						{generatedCourse.courseName}
					</h2>
					<div className="space-y-4">
						<p>
							<strong>Description:</strong> {generatedCourse.description}
						</p>
						<p>
							<strong>Category:</strong> {generatedCourse.category}
						</p>
						<p>
							<strong>Level:</strong> {generatedCourse.courseLevel}
						</p>
						<p>
							<strong>Duration:</strong> {generatedCourse.duration}
						</p>
						<p>
							<strong>Language:</strong> {generatedCourse.language}
						</p>

						<h3 className="text-xl font-bold mt-6 mb-4">Chapters</h3>
						<div className="space-y-4">
							{generatedCourse.chapters.map((chapter, index) => (
								<div key={index} className="border p-4 rounded-lg">
									<h4 className="font-bold">{chapter.chapterName}</h4>
									<p className="text-gray-600">{chapter.aboutChapter}</p>
									<p className="text-sm text-gray-500">
										Duration: {chapter.duration}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AICourse;
