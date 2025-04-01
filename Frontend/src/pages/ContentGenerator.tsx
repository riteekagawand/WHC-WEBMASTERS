import React, { useState } from "react";
import { getGeminiResponse } from "../services/AIchat";

const ContentGenerator = () => {
	const [generatedContent, setGeneratedContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		contentType: "",
		description: "",
		tone: "professional", // default tone
		length: "medium", // default length
	});

	const contentTypes = [
		"Blog Post",
		"Social Media Post",
		"Product Description",
		"Email Newsletter",
		"Marketing Copy",
		"Website Content",
	];

	const tones = [
		"Professional",
		"Casual",
		"Friendly",
		"Formal",
		"Humorous",
		"Persuasive",
	];

	const lengths = [
		{ value: "short", label: "Short (50-100 words)" },
		{ value: "medium", label: "Medium (200-300 words)" },
		{ value: "long", label: "Long (500+ words)" },
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const prompt = `Generate ${formData.contentType} content with the following details:
      Topic/Description: ${formData.description}
      Tone: ${formData.tone}
      Length: ${formData.length}
      Please make it engaging and well-structured.`;

		try {
			const response = await getGeminiResponse(prompt);
			setGeneratedContent(response);
		} catch (error) {
			console.error("Error generating content:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(generatedContent);
	};

	return (
		<div className="w-full h-screen flex flex-col bg-white p-2 ">
			<div className="max-w-4xl mx-auto w-full">
				<h1 className="text-3xl font-bold mb-6">AI Content Generator</h1>
<p className="text-gray-600">Generate your content effortlessly. Your perfect content is just one-click away!</p>
<br/>
<div className="bg-violet-100 rounded-xl max-w-4xl mx-auto w-full p-11 mb-10">
				{/* Input Form */}
				<form onSubmit={handleSubmit} className="space-y-6 mb-8">
					{/* Content Type Selection */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Content Type
						</label>
						<select
							value={formData.contentType}
							onChange={(e) =>
								setFormData({ ...formData, contentType: e.target.value })
							}
							className="w-full p-3 border rounded-md focus:ring-2 focus:ring-violet-500"
							required
						>
							<option value="">Select content type</option>
							{contentTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>

					{/* Description Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Description/Topic
						</label>
						<textarea
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							className="w-full p-3 border rounded-md focus:ring-2 focus:ring-violet-500 h-32"
							placeholder="Describe what you want to generate..."
							required
						/>
					</div>

					{/* Tone Selection */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Tone
						</label>
						<select
							value={formData.tone}
							onChange={(e) =>
								setFormData({ ...formData, tone: e.target.value })
							}
							className="w-full p-3 border rounded-md focus:ring-2 focus:ring-violet-500"
						>
							{tones.map((tone) => (
								<option key={tone} value={tone.toLowerCase()}>
									{tone}
								</option>
							))}
						</select>
					</div>

					{/* Length Selection */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Content Length
						</label>
						<select
							value={formData.length}
							onChange={(e) =>
								setFormData({ ...formData, length: e.target.value })
							}
							className="w-full p-3 border rounded-md focus:ring-2 focus:ring-violet-500"
						>
							{lengths.map((length) => (
								<option key={length.value} value={length.value}>
									{length.label}
								</option>
							))}
						</select>
					</div>

					{/* Generate Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-gradient-to-r from-violet-600 to-violet-800 text-white font-semibold py-3 rounded-xl hover:bg-violet-600 disabled:bg-gray-400"
					>
						{loading ? "Generating..." : "Generate Content"}
					</button>
				</form>

				</div>

				{/* Generated Content */}
				{generatedContent && (
					<div className="border rounded-md p-6 bg-gray-50">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold">Generated Content</h2>
							<button
								onClick={handleCopy}
								className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
							>
								Copy to Clipboard
							</button>
						</div>
						<div className="whitespace-pre-wrap">{generatedContent}</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ContentGenerator;
