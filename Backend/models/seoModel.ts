// Interface for SerpApi response data
interface SerpApiResponse {
  organic_results?: Array<{ title: string; link: string }>;
  related_searches?: Array<{ query: string }>;
  people_also_ask?: Array<{ question: string }>;
}

// Interface for the keyword data structure
interface Keyword {
  keyword: string;
  searchVolumeTrend: string;
  competitionLevel: string;
  suggestedFocus: string;
  searchIntent: string;
  trendScore: number;
}

// Interface for the blog data structure
interface Blog {
  title: string;
  link: string;
}

export class SeoModel {
  private readonly serpApiKey: string;

  constructor(serpApiKey: string) {
    this.serpApiKey = serpApiKey;
  }

  // Fetch and process SEO data from SerpApi
  async fetchSeoData(category: string): Promise<{ keywords: Keyword[]; blogs: Blog[] }> {
    try {
      // Construct the SerpApi URL with query parameters
      const params = new URLSearchParams({
        api_key: this.serpApiKey,
        engine: 'google',
        q: `${category} keywords 2025`, // Updated query to focus on keywords
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
      const serpResponse: SerpApiResponse = await response.json();

      // Log the SerpApi response for debugging
      console.log('SerpApi Response:', JSON.stringify(serpResponse, null, 2));

      // Extract relevant data from SerpApi response
      const organicResults = serpResponse.organic_results || [];
      const relatedSearches = serpResponse.related_searches || [];
      const peopleAlsoAsk = serpResponse.people_also_ask || [];

      // Generate AI-enhanced keywords from related searches and people also ask
      const keywords: Keyword[] = [
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

      // Extract blogs from organic results
      const blogs: Blog[] = organicResults.slice(0, 5).map((result) => ({
        title: result.title,
        link: result.link,
      }));

      return { keywords, blogs };
    } catch (error: any) {
      console.error('Error in fetchSeoData:', error.message);
      throw new Error(`Failed to fetch SEO data: ${error.message}`);
    }
  }

  // Helper method to determine search intent
  private getSearchIntent(keyword: string): string {
    if (keyword.includes('tips') || keyword.includes('guide') || keyword.includes('how to') || keyword.includes('what is')) {
      return 'Informational';
    } else if (keyword.includes('best') || keyword.includes('products') || keyword.includes('buy')) {
      return 'Transactional';
    } else if (keyword.includes('trends') || keyword.includes('news')) {
      return 'Navigational';
    }
    return 'Informational';
  }
}