import React from "react";
import { Outlet } from "react-router-dom"; // Outlet renders nested routes
// import GoogleTranslate from "./snippet/GoogleTranslate";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <GoogleTranslate /> */}
      {/* Add common UI like navbar or sidebar here if needed */}
      <main className="flex-grow">
        <Outlet /> {/* Renders the nested route components */}
      </main>
    </div>
  );
};

export default Layout;