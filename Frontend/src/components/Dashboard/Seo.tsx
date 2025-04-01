import React, { useState} from 'react';
import SearchIntentChart from '../../components/SearchIntentChart'; // Import the new component
import SyncingChart from '../../components/SyncingChart'; // Import the new component
import seoData from '../../data/seoData.json';

interface Keyword {
  keyword: string;
  searchVolumeTrend: string;
  competitionLevel: string;
  suggestedFocus: string;
  searchIntent?: string;
  trendScore?: string | number;
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
  const [error, setError] = useState<string | null>(null);
  const [searchIntentChartData, setSearchIntentChartData] = useState<number[]>([0, 0, 0]);
  const [syncingChartData, setSyncingChartData] = useState<any[]>([]);

  const fetchDataFromJson = (category: string): Promise<{ keywords: Keyword[] }> => {
    setIsLoading(true);
    setError(null);

    return new Promise<{ keywords: Keyword[] }>((resolve) => {
      setTimeout(() => {
        const categoryData = categories.find((cat) => cat.category === category);
        const keywords = categoryData ? categoryData.keywords : [];

        setIsLoading(false);
        resolve({ keywords });
      }, 1000);
    });
  };

  const calculateSearchIntentDistribution = (keywords: Keyword[]) => {
    let informational = 0;
    let commercial = 0;
    let transactional = 0;

    keywords.forEach((keyword) => {
      if (keyword.searchIntent) {
        if (keyword.searchIntent.toLowerCase() === 'informational') informational++;
        else if (keyword.searchIntent.toLowerCase() === 'commercial') commercial++;
        else if (keyword.searchIntent.toLowerCase() === 'transactional') transactional++;
      }
    });

    const total = informational + commercial + transactional;
    if (total === 0) return [0, 0, 0];

    return [
      (informational / total) * 100,
      (commercial / total) * 100,
      (transactional / total) * 100,
    ];
  };

  const prepareSyncingChartData = (keywords: Keyword[]) => {
    const sortedKeywords = keywords
      .filter((k) => k.trendScore !== undefined)
      .sort((a, b) => (Number(b.trendScore) || 0) - (Number(a.trendScore) || 0))
      .slice(0, 3);

    const series = sortedKeywords.map((keyword, index) => ({
      name: keyword.keyword,
      data: [
        index === 0 ? 34 : index === 1 ? 22 : 46, // Starting points from the image
        ...Array.from({ length: 10 }, () => Math.floor(Math.random() * 80)), // Random data to match the image
      ],
    }));

    return series;
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
    const { keywords } = await fetchDataFromJson(selectedCategory);

    const enhancedKeywords = keywords.map((k, index) => ({
      ...k,
      searchIntent: index % 3 === 0 ? 'Informational' : index % 3 === 1 ? 'Commercial' : 'Transactional',
      trendScore: Math.floor(Math.random() * 100),
    }));

    setAiKeywords(enhancedKeywords);

    const intentDistribution = calculateSearchIntentDistribution(enhancedKeywords);
    setSearchIntentChartData(intentDistribution);

    const syncingSeries = prepareSyncingChartData(enhancedKeywords);
    setSyncingChartData(syncingSeries);

    setShowResults(true);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6 flex items-center space-x-2">
        <span className="hover:text-purple-600 cursor-pointer">Analytics</span>
        <span className="text-gray-400">/</span>
        <span className="hover:text-purple-600 cursor-pointer">SEO</span>
        <span className="text-gray-400">/</span>
        <span className="text-purple-600 font-medium">Keywords</span>
      </div>

      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
        SEO & Keyword Optimization
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        AI-powered keyword suggestions to boost your website's visibility
      </p>

      {/* Form */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        {/* Website URL Input */}
        <div className="flex-1">
          <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-2">
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
            <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">🔗</span>
          </div>
        </div>

        {/* Website Category Dropdown */}
        <div className="flex-1">
          <label htmlFor="websiteCategory" className="block text-sm font-medium text-gray-700 mb-2">
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
            <span className="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none">
              ▼
            </span>
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
        <div className="mb-10 p-5 bg-red-50 text-red-700 rounded-xl shadow-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center mb-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-purple-600"></div>
          <span className="ml-4 text-gray-600 text-lg">Processing analysis...</span>
        </div>
      )}

      {/* Charts - Side by Side */}
      {showResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <SearchIntentChart data={searchIntentChartData} />
          {syncingChartData.length > 0 && <SyncingChart series={syncingChartData} />}
        </div>
      )}

      {/* Keywords Table */}
      {showResults && (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            AI-Powered Keywords for {selectedCategory}
          </h2>
          {aiKeywords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-6 text-sm font-medium text-gray-600">Keyword</th>
                    <th className="py-4 px-6 text-sm font-medium text-gray-600">Search Volume Trend</th>
                    <th className="py-4 px-6 text-sm font-medium text-gray-600">Competition Level</th>
                    <th className="py-4 px-6 text-sm font-medium text-gray-600">Suggested Focus</th>
                    <th className="py-4 px-6 text-sm font-medium text-gray-600">Search Intent</th>
                    <th className="py-4 px-6 text-sm font-medium text-gray-600">Trend Score</th>
                  </tr>
                </thead>
                <tbody>
                  {aiKeywords.map((keyword, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm text-gray-800">{keyword.keyword}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{keyword.searchVolumeTrend}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{keyword.competitionLevel}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{keyword.suggestedFocus}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{keyword.searchIntent || 'N/A'}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{keyword.trendScore || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-6">No keywords found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SEOOptimization;