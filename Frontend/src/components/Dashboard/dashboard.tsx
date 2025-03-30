import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";
import { Toaster } from "sonner";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <Toaster />
      <div className="flex-1 p-4">
        <Outlet /> {/* This will render the default or child route */}
      </div>
    </div>
  );
};

export default Dashboard;
