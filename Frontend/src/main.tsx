import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { RecoilRoot } from "recoil"; // Import RecoilRoot
import AppRoutes from "./routes";

export default function App() {
	const navigate = useNavigate();
	return (
		<HeroUIProvider navigate={navigate}>
			<AppRoutes />
		</HeroUIProvider>
	);
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>,
);
