import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // ⚠ Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getGeminiResponse = async (userMessage: string) => {
	try {
		const result = await model.generateContent({
			contents: [{ role: "user", parts: [{ text: userMessage }] }],
		});

		return (
			result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
			"No response from AI."
		);
	} catch (error) {
		console.error("Error fetching response:", error);
		return "Sorry, I couldn't process that request.";
	}
};
