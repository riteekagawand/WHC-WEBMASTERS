"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoModel = void 0;
class SeoModel {
    constructor(serpApiKey) {
        this.serpApiKey = serpApiKey;
    }
    // Fetch and process SEO data from SerpApi
    async fetchSeoData(category) {
        try {
            // Construct the SerpApi URL with query parameters
            const params = new URLSearchParams({
                api_key: this.serpApiKey,
                engine: 'google',
                q: `${category} trends 2025`,
                location: 'United States',
                hl: 'en',
                gl: 'us',
            });
            const serpApiUrl = `https://serpapi.com/search?${params.toString()}`;
            // Fetch SERP data using the native fetch API
            const response = await fetch(serpApiUrl);
            if (!response.ok) {
                throw new Error(`SerpApi request failed with status ${response.status}`);
            }
            const serpResponse = await response.json();
            // Extract relevant data from SerpApi response
            const organicResults = serpResponse.organic_results || [];
            const relatedSearches = serpResponse.related_searches || [];
            const peopleAlsoAsk = serpResponse.people_also_ask || [];
            // Generate AI-enhanced keywords
            const aiGeneratedKeywords = [
                // Keywords from organic results (e.g., titles and snippets)
                ...organicResults.slice(0, 3).map((result, index) => ({
                    keyword: result.title.toLowerCase().replace(/[^a-z0-9\s]/g, ''),
                    searchVolumeTrend: index < 2 ? 'High' : 'Medium',
                    competitionLevel: index < 2 ? 'Medium' : 'Low',
                    suggestedFocus: index < 2 ? 'Primary' : 'Secondary',
                    searchIntent: this.getSearchIntent(result.title),
                    trendScore: 80 - index * 10,
                })),
                // Keywords from related searches
                ...relatedSearches.slice(0, 3).map((search, index) => ({
                    keyword: search.query.toLowerCase(),
                    searchVolumeTrend: 'Medium',
                    competitionLevel: 'Low',
                    suggestedFocus: 'Long-tail',
                    searchIntent: this.getSearchIntent(search.query),
                    trendScore: 70 - index * 5,
                })),
                // Keywords from "People Also Ask" questions
                ...peopleAlsoAsk.slice(0, 3).map((question, index) => ({
                    keyword: question.question.toLowerCase().replace(/[^a-z0-9\s]/g, ''),
                    searchVolumeTrend: 'Medium',
                    competitionLevel: 'Low',
                    suggestedFocus: 'Long-tail',
                    searchIntent: 'Informational',
                    trendScore: 65 - index * 5,
                })),
            ];
            return aiGeneratedKeywords;
        }
        catch (error) {
            throw new Error(`Failed to fetch SEO data: ${error.message}`);
        }
    }
    // Helper method to determine search intent
    getSearchIntent(keyword) {
        if (keyword.includes('tips') || keyword.includes('guide') || keyword.includes('how to') || keyword.includes('what is')) {
            return 'Informational';
        }
        else if (keyword.includes('best') || keyword.includes('products') || keyword.includes('buy')) {
            return 'Transactional';
        }
        else if (keyword.includes('trends') || keyword.includes('news')) {
            return 'Navigational';
        }
        return 'Informational';
    }
}
exports.SeoModel = SeoModel;
