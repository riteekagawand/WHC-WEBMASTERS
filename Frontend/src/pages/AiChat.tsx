import { useState } from "react";
import { getGeminiResponse } from "../services/AIchat";

interface SpeechRecognitionResult {
	transcript: string;
	confidence: number;
}

interface SpeechRecognitionEvent {
	results: SpeechRecognitionResult[][];
}

interface SpeechRecognitionErrorEvent {
	error: string;
}

interface SpeechRecognition extends EventTarget {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	start(): void;
	stop(): void;
	onstart: () => void;
	onend: () => void;
	onresult: (event: SpeechRecognitionEvent) => void;
	onerror: (event: SpeechRecognitionErrorEvent) => void;
}

declare global {
	interface Window {
		webkitSpeechRecognition: new () => SpeechRecognition;
		SpeechRecognition: new () => SpeechRecognition;
	}
}

const Chatbot = () => {
	const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
		[],
	);
	const [input, setInput] = useState("");
	const [isListening, setIsListening] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false); // Track speaking state

	const synth = window.speechSynthesis;

	// 🎤 Start Speech Recognition
	const startListening = () => {
		const recognition =
			new window.webkitSpeechRecognition() || new window.SpeechRecognition();
		recognition.lang = "en-US";
		recognition.interimResults = false;

		recognition.onstart = () => {
			setIsListening(true);
		};

		recognition.onresult = (event) => {
			const transcript = event.results[0][0].transcript;
			setInput(transcript); // Set recognized text in input field
		};

		recognition.onerror = (event) => {
			console.error("Speech recognition error:", event.error);
		};

		recognition.onend = () => {
			setIsListening(false);
		};

		recognition.start();
	};

	// 🗣 AI Voice Response
	const speakText = (text: string) => {
		if (synth.speaking) synth.cancel(); // Stop existing speech before speaking new text

		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en-US";
		utterance.rate = 1;
		utterance.pitch = 1;

		utterance.onstart = () => setIsSpeaking(true);
		utterance.onend = () => setIsSpeaking(false);

		synth.speak(utterance);
	};

	// ❌ Stop AI Speech
	const stopSpeaking = () => {
		if (synth.speaking) {
			synth.cancel(); // Stop speech
			setIsSpeaking(false);
		}
	};

	// ✉ Send Message to AI
	const sendMessage = async () => {
		if (!input.trim()) return;

		const newMessages = [...messages, { text: input, sender: "user" }];
		setMessages(newMessages);
		setInput("");

		const aiResponse = await getGeminiResponse(input);
		setMessages([...newMessages, { text: aiResponse, sender: "bot" }]);

		speakText(aiResponse); // 🔊 AI Speaks the Response
	};

	return (
		<div className="w-full h-screen flex flex-col bg-white overflow-hidden p-4">
			{/* Chatbox */}
			<div
				className="flex-1 p-4 space-y-2 overflow-y-auto"
				style={{ height: "calc(100vh - 120px)" }}
			>
				{messages.map((msg, index) => (
					<div
						key={index}
						className="flex items-start space-x-2 max-w-4xl mx-auto"
					>
						{/* Icon */}
						<div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center">
							{msg.sender === "user" ? (
								<span className="text-2xl">👤</span>
							) : (
								<span className="text-2xl">🤖</span>
							)}
						</div>
						{/* Message */}
						<div
							className={`p-4 rounded-lg break-words max-w-[80%] overflow-x-hidden whitespace-pre-wrap ${
								msg.sender === "user"
									? "bg-blue-500 text-black"
									: "bg-gray-200 text-black"
							}`}
						>
							{msg.text}
						</div>
					</div>
				))}
			</div>

			{/* Input Box */}
			<div className="flex p-4 border-t bg-white max-w-4xl mx-auto w-full">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type or speak..."
					className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
				/>
				<button
					type="button"
					onClick={startListening}
					className={`px-6 py-3 ${
						isListening ? "bg-red-500" : "bg-gray-500"
					} text-black rounded-md ml-2 mr-2 text-xl`}
				>
					🎤
				</button>
				<button
					type="button"
					onClick={sendMessage}
					className="bg-blue-500 text-black px-6 py-3 rounded-md hover:bg-blue-600"
				>
					Send
				</button>
			</div>

			{/* Stop Speech Button */}
			{isSpeaking && (
				<div className="fixed bottom-24 right-4">
					<button
						type="button"
						onClick={stopSpeaking}
						className="p-3 bg-red-500 text-black rounded-md hover:bg-red-600 shadow-lg"
					>
						❌ Stop AI Voice
					</button>
				</div>
			)}
		</div>
	);
};

export default Chatbot;
