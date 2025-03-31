import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-100 bg-gray-900">
      {/* Header Section */}
      <header className="flex justify-end p-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black rounded-lg shadow-md"
        >
          Login
        </Link>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="animate-fade-in">
          <div className="mb-12 text-center">
            <h1
              className="mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text
                text-5xl font-extrabold text-transparent"
            >
              React Template
            </h1>
            <p className="text-lg text-gray-400">
              Built for modern web development
            </p>
          </div>

          <div
            className="mb-12 overflow-hidden rounded-xl bg-gradient-to-r from-gray-800/50
              via-gray-800/50 to-gray-800/50 p-8 shadow-2xl backdrop-blur-lg transition-all
              hover:shadow-purple-500/10"
          >
            <h2 className="mb-6 text-3xl font-bold text-blue-400">
              Welcome to Your React 19 Template
            </h2>
            <p className="mb-6 text-gray-300">
              A modern, performant foundation for your next web application.
              Built with Vite, React 19, and Tailwind CSS, optimized for
              developer experience and production performance.
            </p>
          </div>

          <footer className="mt-12 text-center text-sm text-gray-500">
            Built by{" "}
            <Link
              to="https://github.com/haider-patanwala"
              className="text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Haider Patanwala
            </Link>{" "}
            with 💜
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
