import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Dashboard/Home";
import Profile from "./pages/profile";
import Ecommerce from "./components/Dashboard/Ecommerce";
import NotFound from "./pages/NotFound";
import Builder from "./components/Dashboard/Builder";
import Forum from "./components/Dashboard/Forum";
import Assistant from "./components/Dashboard/Assistant";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/dashboard";
import LandingPage from "./pages/Landing";
import PortfolioBuilder from "./components/Dashboard/portfolioBuilder";
import Analytics from "./components/Dashboard/Analytics";
import SEOOptimization from "./components/Dashboard/Seo";
import Chatbot from "./pages/AiChat";
import ContentGenerator from "./pages/ContentGenerator";
import AllTemplates from "./pages/AllTemplates";
import CartPage from "./pages/Cart";

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
          <Route index element={<Home />} /> {/* Default dashboard route */}
          <Route path="home" element={<Home />} />
          <Route path="builder" element={<Builder />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="seo" element={<SEOOptimization />} />
          <Route path="forum" element={<Forum />} />
          <Route path="profile" element={<Profile />} />
          <Route path="aiassistant" element={<Assistant />} />
          <Route path="portfoliobuilder" element={<PortfolioBuilder />} />
        </Route>

        {/* Cart and AllTemplates routes (under Layout for navbar/footer consistency) */}
        <Route path="cart" element={<CartPage />} />
        <Route path="all-templates" element={<AllTemplates />} />

        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
