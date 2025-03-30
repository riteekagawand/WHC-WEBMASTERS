import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout"; // Your Layout component
import Home from "./components/Dashboard/Home";
import Profile from "./pages/profile";
import Ecommerce from "./components/Dashboard/Ecommerce";
import NotFound from "./pages/NotFound";
import Builder from "./components/Dashboard/Builder";
import Forum from "./components/Dashboard/Forum";
import Assistant from "./components/Dashboard/Assistant";
import Login from "./components/Login"; // Your UserLogin component
import Dashboard from "./components/Dashboard/dashboard";
import LandingPage from "./pages/Landing"; // The landing page with Login button
import PortfolioBuilder from "./components/Dashboard/portfolioBuilder";
import Analytics from "./components/Dashboard/Analytics";
import SEOOptimization from "./components/Dashboard/Seo";
import Chatbot from "./pages/AiChat";
import ContentGenerator from "./pages/ContentGenerator";
import ResumeBuilder from "./components/Dashboard/ResumeBuilder";
import ResumeBody from "./components/AIResume/ResumeBody";

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			{/* Root route for LandingPage */}
			<Route path="/" element={<LandingPage />} />

      {/* App routes under Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
		<Route path="aiChat" element={<Chatbot />} />
		<Route path="contentGenerator" element={<ContentGenerator />} />
        
        {/* Dashboard route with nested child routes */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} /> {/* Default route for dashboard */}
          <Route path="home" element={<Home />} />
          <Route path="builder" element={<Builder />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="seo" element={<SEOOptimization />} />
          <Route path="forum" element={<Forum />} />
          <Route path="profile" element={<Profile />} />
          <Route path="aiassistant" element={<Assistant />} />
          <Route path="portfoliobuilder" element={<PortfolioBuilder />} />
          <Route path="resumebuilder" element={<ResumeBuilder />} />
          <Route path="resumebody" element={<ResumeBody/>} />
        </Route>

				{/* Catch-all route for unmatched routes */}
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes; // Default export to match main.tsx
