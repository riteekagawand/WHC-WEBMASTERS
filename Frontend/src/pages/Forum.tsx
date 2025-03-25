// src/App.tsx

import React from 'react';
import Card from '../Components/AiTools';
import { FaUserCircle, FaComments, FaMoneyBillWave, FaShoppingCart } from 'react-icons/fa';

const App: React.FC = () => {
  // Data for Featured Discussions
  const featuredDiscussions = [
    {
      title: 'Marketing Social Media Strategies for 2023',
      description: "What's working now? Let's share best practices and results.",
      icon: FaComments, // Icon for marketing discussion
    },
    {
      title: 'Funding: Bootstrapping vs Venture Capital',
      description: 'Pros and cons from those who’ve shared their experiences.',
      icon: FaMoneyBillWave, // Icon for funding discussion
    },
    {
      title: 'E-commerce Conversion Rate Optimization',
      description: 'Share your best tips for turning visitors into customers.',
      icon: FaShoppingCart, // Icon for e-commerce discussion
    },
  ];

  // Data for Recent Discussions
  const recentDiscussions = [
    {
      author: 'Jessica Chen',
      title: 'How to handle seasonal inventory fluctuations?',
      replies: 12,
      timestamp: '2 hours ago',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      author: 'Mark Wong',
      title: 'Best accounting software for small businesses',
      replies: 28,
      timestamp: '5 hours ago',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      author: 'Priya Patel',
      title: 'Finding reliable manufacturers in Southeast Asia',
      replies: 15,
      timestamp: '8 hours ago',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      author: 'David Rodriguez',
      title: 'Strategies for reducing customer acquisition costs',
      replies: 34,
      timestamp: '1 day ago',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
      author: 'Emma Wilson',
      title: 'Managing remote teams effectively',
      replies: 42,
      timestamp: '1 day ago',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
  ];

  // Data for Active Members
  const activeMembers = [
    {
      name: 'Sarah Johnson',
      description: 'E-commerce specialist with 6+ years experience',
      icon: FaUserCircle, // Icon for member
    },
    {
      name: 'Alex Rivera',
      description: 'Marketing guru specializing in SaaS and growth strategies',
      icon: FaUserCircle, // Icon for member
    },
    {
      name: 'Mei Lin',
      description: 'Startup founder with two successful exits in the fintech space',
      icon: FaUserCircle, // Icon for member
    },
    {
      name: 'James Wilson',
      description: 'Product development expert focusing on consumer goods',
      icon: FaUserCircle, // Icon for member
    },
  ];

  const tabs = ['All', 'Topics', 'Popular', 'Recent', 'My Network', 'Unanswered'];

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Entrepreneur Forum</h1>
        <p className="text-gray-600">
          Connect with fellow entrepreneurs, share experiences, and collaborate on ideas
        </p>
      </div>

      {/* Search and Start Discussion Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search discussions..."
          className="w-1/3 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
          Start New Discussion
        </button>
      </div>

      {/* Navigation Tabs - Moved Below Search Bar */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-gray-600 font-semibold pb-2 ${
              tab === 'All' ? 'border-b-2 border-indigo-600 text-indigo-600' : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Featured Discussions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Discussions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDiscussions.map((discussion) => (
            <Card
              key={discussion.title}
              title={discussion.title}
              description={discussion.description}
              icon={discussion.icon}
              actions={
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                  Join Discussion
                </button>
              }
              className="cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Recent Discussions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Discussions</h2>
        <div className="bg-white rounded-lg shadow-sm p-4">
          {recentDiscussions.map((discussion) => (
            <div
              key={discussion.title}
              className="flex items-center py-2 border-b last:border-b-0"
            >
              {/* Avatar */}
              <img
                src={discussion.avatar}
                alt={discussion.author}
                className="w-10 h-10 rounded-full mr-4"
              />
              {/* Discussion Details */}
              <div className="flex-1">
                <h3 className="text-gray-800 font-medium">{discussion.title}</h3>
                <p className="text-gray-600 text-sm">
                  Started by {discussion.author} • {discussion.timestamp} • {discussion.replies}{' '}
                  replies
                </p>
              </div>
              <button className="text-indigo-600 font-medium">Save</button>
            </div>
          ))}
        </div>
      </div>

      {/* Active Members */}
      <div className="mt-8 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeMembers.map((member) => (
            <Card
              key={member.name}
              title={member.name}
              description={member.description}
              icon={member.icon}
              actions={
                <div className="flex space-x-2">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                    Connect
                  </button>
                  <button className="text-indigo-600 font-medium px-4 py-2 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition">
                    Message
                  </button>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;