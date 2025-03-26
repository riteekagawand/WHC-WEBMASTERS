import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components/ui/button";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Her Space</h1>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
          >
            Login
          </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            WELCOME TO BUILD YOUR OWN WEBSITE
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Start growing your business today. Create your personalized digital platform.
          </p>
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </main>
      <footer className="w-full bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 HerSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;