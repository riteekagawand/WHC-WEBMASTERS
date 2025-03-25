import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import { Toaster } from "sonner";

const Layout: React.FC = () => {
  return (
    <div className="flex h-full"> {/* Full height and flex container */}
      <Sidebar />
      <Toaster />
      <div className="flex-1 p-4"> {/* Content area takes remaining space */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
