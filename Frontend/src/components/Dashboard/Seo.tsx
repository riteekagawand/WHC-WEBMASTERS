import React, { useState } from 'react';
import seoData from '../../data/seoData.json'; // Assuming this matches the JSON structure you provided

interface Keyword {
  keyword: string;
  searchVolumeTrend: string;
  competitionLevel: string;
  suggestedFocus: string;
  searchIntent?: string; // Optional, not in your JSON yet
  trendScore?: number;   // Optional, not in your JSON yet
}

interface Blog {
  title: string;
  link: string;
}

interface Category {
  category: string;
  keywords: Keyword[];
}

const SEOOptimization: React.FC = () => {
  const categories: Category[] = seoData.categories;
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiKeywords, setAiKeywords] = useState<Keyword[]>([]);
  const [aiBlogs, setAiBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Simulated data fetch from seoData.json
  const fetchDataFromJson = (category: string): { keywords: Keyword[]; blogs: Blog[] } => {
    setIsLoading(true);
    setError(null);

    // Simulate a delay to mimic API call (optional)
    return new Promise((resolve) => {
      setTimeout(() => {
        const categoryData = categories.find((cat) => cat.category === category);
        const keywords = categoryData ? categoryData.keywords : [];
        
        // Static blog data (since seoData.json doesn’t include blogs, adding dummy data as an example)
        const dummyBlogs: Blog[] = keywords.length > 0 ? [
          { title: `Top ${category} Tips for 2025`, link: `https://example.com/${category.toLowerCase()}-tips` },
          { title: `How to Excel in ${category}`, link: `https://example.com/${category.toLowerCase()}-guide` },
        ] : [];

        setIsLoading(false);
        resolve({ keywords, blogs: dummyBlogs });
      }, 1000); // Simulated 1-second delay
    });
  };

  const handleAnalyze = async () => {
    if (!selectedCategory) {
      alert('Please select a website category.');
      return;
    }

    if (!websiteUrl) {
      alert('Please enter a website URL.');
      return;
    }

    setShowResults(false);
    const { keywords, blogs } = await fetchDataFromJson(selectedCategory);
    setAiKeywords(keywords);
    setAiBlogs(blogs);
    setShowResults(true);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>Analytics</span><span>SEO</span> <span className="text-gray-700">Keywords</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">SEO & Keyword Optimization</h1>
      <p className="text-gray-500 mb-6">AI-powered keyword suggestions to improve your website’s visibility</p>

      {/* Form */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Website URL Input */}
        <div className="flex-1">
          <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <div className="relative">
            <input
              type="text"
              id="websiteUrl"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="Enter your website URL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-700 placeholder-black"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">∞</span>
          </div>
        </div>

        {/* Website Category Dropdown */}
        <div className="flex-1">
          <label htmlFor="websiteCategory" className="block text-sm font-medium text-gray-700 mb-1">
            Website Category
          </label>
          <div className="relative">
            <select
              id="websiteCategory"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none text-gray-700 placeholder-black"
            >
              <option value="" disabled>Select category</option>
              {categories.map((category) => (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">▼</span>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex items-end">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className={`bg-violet-700 text-black font-semibold py-3 px-6 rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
            }`}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center mb-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600">Processing analysis...</span>
        </div>
      )}

      {/* Keywords Table */}
      {showResults && (
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            AI-Powered Keywords for {selectedCategory}
          </h2>
          {aiKeywords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Keyword</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Search Volume Trend</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Competition Level</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Suggested Focus</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Search Intent</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Trend Score</th>
                  </tr>
                </thead>
                <tbody>
                  {aiKeywords.map((keyword, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-700">{keyword.keyword}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{keyword.searchVolumeTrend}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{keyword.competitionLevel}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{keyword.suggestedFocus}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{keyword.searchIntent || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{keyword.trendScore || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No keywords found for this category.</p>
          )}
        </div>
      )}

      {/* Blogs Table */}
      {showResults && (
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Related Blogs for {selectedCategory}
          </h2>
          {aiBlogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Blog Title</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {aiBlogs.map((blog, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-700">{blog.title}</td>
                      <td className="py-3 px-4 text-sm text-blue-600 hover:underline">
                        <a href={blog.link} target="_blank" rel="noopener noreferrer">
                          Visit Blog
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No blogs found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SEOOptimization;