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
// import AllTemplates from "./pages/AllTemplates"; // Import AllTemplates
import ResumeBuilder from "./components/Dashboard/ResumeBuilder";
import ResumeBody from "./components/AIResume/ResumeBody";
import ResourceHub from "./components/Dashboard/ResourceHub";
// import AICourse from "./pages/AICourse";
// import AddDetailForm from "./components/AddUserDetails";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes under Layout */}
      <Route path="/" element={<Layout />}>
        {/* Dashboard Route with Nested Routes */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="home" element={<Home />} />
          <Route path="builder" element={<Builder />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="seo" element={<SEOOptimization />} />
          <Route path="forum" element={<Forum />} />
          <Route path="profile" element={<Profile />} />
          <Route path="aiassistant" element={<Assistant />} />
          <Route path="aiChat" element={<Chatbot />} />
          <Route path="contentGenerator" element={<ContentGenerator />} />
          <Route path="portfoliobuilder" element={<PortfolioBuilder />} />
          <Route path="resumebuilder" element={<ResumeBuilder />} />
          <Route path="resumebody" element={<ResumeBody />} />
          <Route path="resourcehub" element={<ResourceHub />} />
          {/* <Route path="adduserdetails" element={<AddDetailForm />} /> */}
        </Route>

        {/* Catch-all Route for 404 Pages */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
