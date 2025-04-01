// routes.tsx
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
import ResumeBuilder from "./components/Dashboard/ResumeBuilder";
import ResumeBody from "./components/AIResume/ResumeBody";
import ResourceHub from "./components/Dashboard/ResourceHub";
import Hotel from "./components/Dashboard/Templates/restaurant-menu";
import Store from "./components/Dashboard/Templates/online-store";
import BusinessPro from "./components/Dashboard/Templates/BusinessPro";
import BlogStandard from "./components/Dashboard/Templates/BlogStandard";
import Fitness from "./components/Dashboard/Templates/Fitness";
import Photography from "./components/Dashboard/Templates/photography";
import Event from "./components/Dashboard/Templates/eventLanding";
import Portfolio from "./components/Dashboard/Templates/Portfolio";
// import GoogleTranslate from "./snippet/GoogleTranslate";

// A small component for the "Change Language" button

const AppRoutes: React.FC = () => {
  return (
    <div>
      {/* <GoogleTranslate /> */}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes under Layout */}
          <Route path="/" element={<Layout />}>
            {/* Dashboard Route with Nested Routes */}
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Home />} />
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
              <Route path="restaurant-menu" element={<Hotel />} />
              <Route path="online-store" element={<Store />} />
              <Route path="business-pro" element={<BusinessPro />} />
              <Route path="blog-standard" element={<BlogStandard />} />
              <Route path="fitness-coach" element={<Fitness />} />
              <Route path="photography" element={<Photography />} />
              <Route path="event-landing" element={<Event />} />
              <Route path="portfolio-basic" element={<Portfolio />} />
            </Route>

            {/* Catch-all Route for 404 Pages */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </div>
   
        
  );
};

export default AppRoutes;