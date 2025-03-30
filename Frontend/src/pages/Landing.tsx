import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi"; // For search and user icons
import SiddhiHateSVG from '../assets/frame-3.svg'; // Import the SVG
import { FaArrowRightLong } from "react-icons/fa6";
import logo from '../assets/HerSpace Logo.svg'
import { FaHashtag, FaUserFriends, FaChartLine, FaPaperPlane, FaLightbulb, FaWallet, FaCode, FaChartBar } from "react-icons/fa";
import video from "../assets/video.mp4"


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
    <button className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center">
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
              <h2 className="text-5xl font-extrabold  text-gray-900 mb-12">
              Empower Your Journey <br /> with HerSpace
              </h2>
              <p className="mt-4text-md text-gray-600 mb-6">
              Join a vibrant community of women who inspire, support, and grow together. Discover resources, stories, and tools to help you thrive in every aspect of your life.
              </p>
              <div className="flex justify-center md:justify-start space-x-2">
                
                {/* Get Started Button (Unchanged) */}
                <Link to="/login">
                  <button className="mt-2 px-8 py-3 font-semibold bg-gradient-to-r from-violet-950 to-violet-900 text-white rounded-full shadow-md hover:from-purple-800 hover:to-purple-600">
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
        What we <span className="text-violet-600">can do?</span>
      </h2>
      
      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-28">
        {[
          { icon: <FaHashtag />, title: "Hashtag Growth" },
          { icon: <FaUserFriends />, title: "Influencers" },
          { icon: <FaChartLine />, title: "Most Influential Post" },
          { icon: <FaPaperPlane />, title: "Most Influential Post" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            <div className="border-3 shadow-sm shadow-gray-300 border-violet-400 rounded-lg p-4 text-purple-600 text-xl">
              {item.icon}
            </div>
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Follow a hashtag growth total posts, videos and images.
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto p-6 md:p-12">
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
          Great Digital Product Agency
          <br /> For Women ?
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Our Business Plan is a written document describing a company's core
          business activities, objectives, and how it plans to achieve its
          goals. Our goal is to provide our client high-quality products with
          modern ideas accordingly to their budgets and according to their
          requirements.
        </p>
      </div>
    </div>


    <div className="flex mx-56 items-center min-h-screen mt-3">
      <div className=" w-full p-6 flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2  mt-32 text-left">
          <h1 className="text-5xl font-bold text-gray-900">How can we help your Business ?</h1>
          <p className="text-gray-600 mt-8">
            We build readymade websites, mobile applications, and elaborate online
            business services.
          </p>
        </div>
        
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 ml-12">
    

          {[
            {
              title: "Business Idea Planning",
              description: "Protocols apart from aengage models, pricing billing",
              icon: <FaLightbulb className="w-10 h-10 text-violet-500   " />,
              
              
            },
            {
              title: "Financial Planning System",
              description: "Protocols apart from aengage models, pricing billing",
              icon: <FaWallet className="w-10 h-10 text-violet-500" />,
            },
            {
              title: "Development Website and App",
              description: "Communication protocols apart from engagement models",
              icon: <FaCode className="w-10 h-10 text-violet-500" />,
              
            },
            {
              title: "Market Analysis Projectp",
              description: "Protocols apart from aengage models, pricing billing",
              icon: <FaChartBar className="w-10 h-10 text-violet-500" />,
            },
          ].map((service, index) => (
            <div key={index} className="border-2 border-violet-400 rounded-xl p-6 shadow-lg flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full">{service.icon}</div>
              <h2 className="mt-4 text-xl font-semibold text-center">{service.title}</h2>
              <p className="text-gray-500 text-center text-sm mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <section className="flex flex-col w-full items-center text-center p-10">
      <h2 className="text-3xl font-bold text-gray-900">
        How <span className="text-purple-600">will it be</span>
      </h2>
      <p className="text-gray-500 mt-2 max-w-2xl">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
      <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-6xl items-center">
        {/* Left side: 4-column grid Cards */}
        <div className="grid grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="border-2  rounded-lg p-6 text-left flex flex-col transition duration-300 border-gray-300  hover:shadow-lg hover:border-violet-700">
            <span className="bg-violet-500 text-white rounded-md w-8 h-8 flex items-center justify-center text-lg font-bold">
              1
            </span>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">
              What is Lorem Ipsum?
            </h3>
            <p className="text-gray-500 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          {/* Card 2 */}
          <div className="border-2 b rounded-lg p-6 text-left flex flex-col transition duration-300 border-gray-300  hover:shadow-lg hover:border-violet-700">
            <span className="bg-violet-500 text-white rounded-md w-8 h-8 flex items-center justify-center text-lg font-bold">
              2
            </span>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">
              Create shocking experiences
            </h3>
            <p className="text-gray-500 mt-2">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>
          </div>
          {/* Card 3 */}
          <div className="border-2  rounded-lg p-6 text-left flex flex-col transition duration-300 border-gray-300  hover:shadow-lg hover:border-violet-700">
            <span className="bg-violet-500 text-white rounded-md w-8 h-8 flex items-center justify-center text-lg font-bold">
              3
            </span>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">
              Where does it come from?
            </h3>
            <p className="text-gray-500 mt-2">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            </p>
          </div>
          {/* Card 4 */}
          <div className="border-2  rounded-lg p-6 text-left flex flex-col transition duration-300   border-gray-300  hover:shadow-lg hover:border-violet-700">
            <span className="bg-violet-500 text-white rounded-md w-8 h-8 flex items-center justify-center text-lg font-bold">
              4
            </span>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">
              Where can I get some?
            </h3>
            <p className="text-gray-500 mt-2">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
            </p>
          </div>
        </div>
        {/* Right side: Image */}
        <div className="flex justify-center">
          <img src="/image.png" alt="Steps" className="rounded-lg shadow-lg max-w-sm" />
        </div>
      </div>
    </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 HerSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;