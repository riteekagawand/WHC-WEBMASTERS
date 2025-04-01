// src/pages/Home.tsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // For the arrow icon
import { motion } from "framer-motion"; // Import Framer Motion
import background from "../../assets/Background.png";
import blogData from "../../data/blogData.json"; // Direct import

// Define the interface for the blog data
interface Blog {
  blog_title: string;
  image: string;
  blog_url: string;
  description: string;
  tag: string;
}

const Home: React.FC = () => {
  // State to hold the blog data
  const [blogs, setBlogs] = useState<Blog[]>([]);
  // State to hold the filter tags
  const [filterTags, setFilterTags] = useState<string[]>([]);
  // State to track the selected filter
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  // Set the blog data and filter tags on mount
  useEffect(() => {
    // Log the imported data to debug
    console.log("Imported blogData:", blogData);

    // Ensure the data is in the correct format
    if (blogData && blogData.blogs) {
      const fetchedBlogs: Blog[] = blogData.blogs;
      setBlogs(fetchedBlogs);

      // Extract unique tags and add "ALL" as the first option
      const uniqueTags = Array.from(new Set(fetchedBlogs.map((blog) => blog.tag)));
      setFilterTags(["ALL", ...uniqueTags]);
    } else {
      console.error("blogData is not in the expected format:", blogData);
    }
  }, []);

  // Filter the blogs based on the selected filter
  const filteredBlogs = selectedFilter === "ALL"
    ? blogs
    : blogs.filter((blog) => blog.tag === selectedFilter);

  // Log the filtered blogs to debug
  useEffect(() => {
    console.log("Filtered blogs:", filteredBlogs);
  }, [filteredBlogs]);

  // Animation variants for the blog cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 }, // Initial state: invisible and slightly below
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1, // Stagger the animation for each card
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }, // Exit animation
  };

  return (
    <div className="text-gray-100">
      {/* Background Image Section */}
      <div>
        <img
          src={background}
          alt="Background"
          className="w-full h-96 mt-[-50px] object-contain"
        />
      </div>

      {/* Blog Grid Section */}
      <div className="max-w-7xl mx-auto p-6 text-gray-800">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-9 mt-[-20px] ">Ideas to Propel Your Business to New Heights</h1>

        {/* Filter Tags */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            {filterTags.length > 0 ? (
              filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedFilter(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    tag === selectedFilter
                      ? "bg-violet-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))
            ) : (
              <p className="text-red-500">No filter tags available</p>
            )}
          </div>
          
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={index} // Use index as the key (you might want to use a unique ID if available)
                className="bg-violet-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index} // Pass the index for staggered animation
                layout // Enable layout animations for smooth transitions
              >
                {/* Blog Image */}
                <div className="relative">
                  <img
                    src={blog.image}
                    alt={blog.blog_title}
                    className="w-full h-48 object-cover"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/300x200?text=Image+Not+Found")
                    }
                  />
                  {/* Dynamic Tag from JSON */}
                  <span className="absolute top-2 left-2 bg-white bg-opacity-25 text-gray-900 text-xs font-semibold px-2 py-1 rounded uppercase">
                    {blog.tag}
                  </span>
                </div>

                {/* Blog Content */}
                <div className="p-4">
                  

                  {/* Blog Title */}
                  <h2 className="text-lg font-semibold mb-2">{blog.blog_title}</h2>
                  < br/ >

                  

                  {/* Redirect Arrow */}
                  <a
                    href={blog.blog_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 hover:text-violet-700 flex items-center"
                  >
                    Read More <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-red-500 col-span-full text-center">
              No blogs available to display
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;