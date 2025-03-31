import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi"; // For search and user icons
import SiddhiHateSVG from '../assets/frame-3.svg'; // Import the SVG
import { FaArrowRightLong } from "react-icons/fa6";
import logo from '../assets/HerSpace Logo.svg'
import { FaHashtag, FaUserFriends, FaChartLine, FaPaperPlane, FaLightbulb, FaWallet, FaCode, FaChartBar } from "react-icons/fa";
import video from "../assets/video.mp4"
import photo from "../assets/Diva.png"
import bg from "../assets/bg.png"
import mask from "../assets/Mask Group 1.svg"


const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to='/'>
              <img src={logo} className="h-16  w-44 mt-[-10px]" alt="Logo" />
            </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-7">
            <Link to="/home" className="text-gray-600 hover:text-purple-600 font-medium">
              Home
            </Link>
            <Link to="/what-we-do" className="text-gray-600 hover:text-purple-600 font-medium">
              What we do
            </Link>
            <Link to="/category" className="text-gray-600 hover:text-purple-600 font-medium">
              Category
            </Link>
            <Link to="/community" className="text-gray-600 hover:text-purple-600 font-medium">
              Community
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-purple-600 font-medium">
              Blog
            </Link>
          </nav>

          {/* Search, Language, and User */}
          <div className="flex items-center justify-between space-x-3">
  {/* Left Section: Search Bar, Language, and User */}
  <div className="flex items-center space-x-3">
    {/* Search Bar */}
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="pl-8 pr-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>

    {/* Language and User */}
    <button className="text-gray-600 hover:text-purple-600">EN</button>
    <button className="w-8 h-8 bg-purple-600 text-black rounded-full flex items-center justify-center">
      S
    </button>
  </div>

  {/* Right Section: Login Button */}
  <Link
    to="/login"
    className="px-6 py-2 font-semibold bg-gradient-to-r from-violet-950 to-violet-900 text-white rounded-full shadow-md hover:from-purple-800 hover:to-purple-600"
  >
    Login
  </Link>
</div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex items-center justify-center py-12">
        {/* Gradient Background Wrapper */}
        <div className="w-full h-[500px] flex items-center justify-center max-w-[90%] mx-auto bg-gradient-to-r from-violet-100 to-violet-200 rounded-3xl shadow-md">
          <div className="max-w-7xl mt-[-60px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            {/* Left Column: Text and Buttons */}
            <div className="text-center mt-20 md:text-left mb-8 md:mb-0">
              <h2 className="text-5xl font-serif font-black  text-gray-900 mb-12">
              Empower Your Journey <br /> with HerSpace
              </h2>
              <p className="mt-4 text-md text-gray-600 mb-6">
              Join a vibrant community of women who inspire, support, and grow together. Discover resources, stories, and tools to help you thrive in every aspect of your life.
              </p>
              <div className="flex justify-center md:justify-start space-x-2">
                
                {/* Get Started Button (Unchanged) */}
                <Link to="/login">
                  <button className="mt-2 px-8 py-3 font-semibold bg-gradient-to-r from-violet-950 to-violet-900 text-black rounded-full shadow-md hover:from-purple-800 hover:to-purple-600">
                    Get Started
                  </button>
                </Link>
               {/* Read Now Text Link with Icon */}
               <Link
                  to="/read-now"
                  className=" mt-2 px-9 py-3 text-violet-900 font-semibold hover:underline hover:text-purple-600 flex items-center"
                >
                  Read more about us
                  <FaArrowRightLong className="ml-2 size-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: SVG */}
            <div className="flex justify-center">
              {/* Use the SVG with increased size */}
              <img
                src={SiddhiHateSVG}
                alt="Siddhi Hate with Badges"
                className="w-[1100px] h-auto object-contain ml-8"
              />
            </div>
          </div>
        </div>
      </main>

      <div className="p-6 md:p-12 max-w-6xl mx-auto text-center">
      {/* Title Section */}
      <h2 className="text-4xl mt-4 font-bold mb-24 text-gray-900">
        What can we <span className="text-violet-600">do for you ?</span>
      </h2>
      
      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-28">
        {[
          { icon: <FaHashtag />, title: "Help You Grow" },
          { icon: <FaUserFriends />, title: "Marketing" },
          { icon: <FaChartLine />, title: "Analyze" },
          { icon: <FaPaperPlane />, title: "Optimize" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            <div className="border-3 shadow-sm shadow-gray-300 border-violet-400 rounded-lg p-4 text-purple-600 text-xl">
              {item.icon}
            </div>
            <h3 className="font-bold text-gray-900">{item.title}</h3>
           
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto p-6 md:p-12">
    <div className="absolute bottom-[-690px] left-[93px] w-32 h-32 bg-gradient-to-r from-violet-500 to-violet-300 rounded-full z-0"></div>
    
      {/* Video Section */}
      <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-lg shadow-gray-400 relative left-[-50px]">
        <video
          src={video}
          className="w-full h-full object-cover rounded-3xl"
          autoPlay
          muted
          loop
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 md:pl-12 mt-6 md:mt-0">
        <h2 className="text-3xl font-bold text-gray-900">
        Empowering through Digital
          <br /> Innovation.
        </h2>
        <p className="text-gray-600 mt-7 text-lg">
        A digital space designed to empower women entrepreneurs to easily create, manage, and grow their online businesses.
        <br />  
        <br /> We believe in breaking down the technical barriers that often hinder women from establishing a strong digital presence.
        </p>
      </div>
    </div>


    <div className="flex mx-56 items-center min-h-screen mt-1 bg-right"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: "95%", // Reduces image size
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center ", // Ensures image stays to the right
  }}
>
  <div className="w-full p-6 flex flex-col md:flex-row justify-between relative">
    {/* Left Section */}
    <div className="w-full md:w-1/2 mt-32 text-left">
      <h1 className="text-5xl font-bold text-gray-900">
        How can we help your Business?
      </h1>
      <p className="text-gray-600 mt-8">
      We empower your business with seamless digital tools, innovative features, and insights that drive growth and elevate your brand to new heights.
      </p>
    </div>

    {/* Right Section - Service Cards */}
    <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 ml-12">
      {[
        {
          title: "Optimize For You",
          description: "Your ultimate business partner, packed with powerful tools and features",
          icon: <FaLightbulb className="w-10 h-10 text-violet-500" />,
        },
        {
          title: "Market For You",
          description: "Boost your brand’s visibility, reach a wider audience",
          icon: <FaWallet className="w-10 h-10 text-violet-500" />,
        },
        {
          title: "Develop For You",
          description: "Let's you create a stunning website without any coding",
          icon: <FaCode className="w-10 h-10 text-violet-500" />,
        },
        {
          title: "Analyze For You",
          description: "Understand your audience, optimize your strategy",
          icon: <FaChartBar className="w-10 h-10 text-violet-500" />,
        },
      ].map((service, index) => (
        <div
          key={index}
          className="border-2 border-violet-400 rounded-xl p-6 shadow-lg flex flex-col items-center bg-white bg-opacity-80"
        >
          <div className="bg-purple-100 p-3 rounded-full">{service.icon}</div>
          <h2 className="mt-4 text-xl font-semibold text-center">
            {service.title}
          </h2>
          <p className="text-gray-500 text-center text-sm mt-2">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>


    

    <div className="w-full h-[500px] flex items-center justify-center max-w-[90%] mx-auto ">
      
    
              <img
                src={mask}
                alt=""
                className="w-full h-auto object-contain ml-8"
              />
              
    </div>

    <div className="w-full  flex items-center justify-center py-12">
      {/* Container with light background, shadow, and rounded corners */}
      <div className="max-w-7xl w-full mx-auto px-6 py-8 bg-white bg-opacity-80 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Text */}
        <div className="text-center md:text-left mb-6 md:mb-0 md:mr-6">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">
            Want to become independent ?
          </h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Let's look at some ways to build your empire.
          </p>
        </div>

        {/* Right Side: Form */}
        <form  className="flex items-center space-x-3">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          {/* Sign Up Button */}
          <Link
    to="/login"
    className="px-6 py-2 font-semibold bg-gradient-to-r from-violet-950 to-violet-900 text-black rounded-full shadow-gray-400 shadow-md hover:from-purple-800 hover:to-purple-600"
  >
    Sign Up
  </Link>
        </form>
      </div>
    </div>


      {/* Footer */}
      <footer className="w-full bg-gray-800 text-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 HerSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;