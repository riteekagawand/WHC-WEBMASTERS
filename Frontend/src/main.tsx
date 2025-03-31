import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { RecoilRoot } from "recoil"; // Import RecoilRoot
import { CartProvider } from "./context/cartContext"; // Import CartProvider
import AppRoutes from "./routes";

export default function App() {
  const navigate = useNavigate();
  return (
    <HeroUIProvider navigate={navigate}>
      <AppRoutes />
    </HeroUIProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot> {/* Wrap the app inside RecoilRoot */}
      <CartProvider> {/* Wrap everything inside CartProvider */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </RecoilRoot>
  </React.StrictMode>
);
