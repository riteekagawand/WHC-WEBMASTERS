import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout"; // Your Layout component
import Home from "./pages/Home";
import Profile from "./pages/profile";
import Ecommerce from "./pages/Ecommerce";
import NotFound from "./pages/NotFound";
import Builder from "./pages/Builder";
import Forum from "./pages/Forum";
import Assistant from "./pages/Assistant";
import Login from "./Components/Login"; // Your UserLogin component
import Dashboard from "./Components/dashboard";
import LandingPage from "./pages/Landing"; // The landing page with Login button

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
        </Route>

        {/* Catch-all route for unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; // Default export to match main.tsx
