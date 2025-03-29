import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout"; // Your Layout component
import Home from "./Components/Dashboard/Home";
import Profile from "./pages/profile";
import Ecommerce from "./Components/Dashboard/Ecommerce";
import NotFound from "./pages/NotFound";
import Builder from "./Components/Dashboard/Builder";
import Forum from "./Components/Dashboard/Forum";
import Assistant from "./Components/Dashboard/Assistant";
import Login from "./Components/Login"; // Your UserLogin component
import Dashboard from "./Components/Dashboard/dashboard";
import LandingPage from "./pages/Landing"; // The landing page with Login button
import PortfolioBuilder from "./Components/Dashboard/portfolioBuilder";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root route for LandingPage */}
      <Route path="/" element={<LandingPage />} />

      {/* App routes under Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        
        {/* Dashboard route with nested child routes */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} /> {/* Default route for dashboard */}
          <Route path="home" element={<Home />} />
          <Route path="builder" element={<Builder />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="forum" element={<Forum />} />
          <Route path="profile" element={<Profile />} />
          <Route path="aiassistant" element={<Assistant />} />
          <Route path="portfoliobuilder" element={<PortfolioBuilder />} />
        </Route>

        {/* Catch-all route for unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; // Default export to match main.tsx
