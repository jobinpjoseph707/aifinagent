const sentimentAnalysisContextProvider = {
  name: 'sentiment-analysis',
  description: 'Provides sentiment analysis for financial news and social media data',
  
  // Define the schema for this context provider
  schema: {
    type: 'object',
    properties: {
      source: { type: 'string', enum: ['news', 'social', 'both'] },
      timeframe: { type: 'string', enum: ['today', 'week', 'month'] },
      symbols: { 
        type: 'array',
        items: { type: 'string' }
      }
    },
    required: ['source', 'timeframe']
  },
  
  // Function to retrieve sentiment data
  contextRetriever: async (params) => {
    // This would connect to your sentiment analysis service
    // For now, we'll return mock data
    return {
      overallSentiment: 0.65, // 0 to 1 scale, higher is more positive
      sentimentBySource: {
        news: 0.72,
        social: 0.58
      },
      trendingTopics: [
        { topic: 'RBI Policy', sentiment: 0.62 },
        { topic: 'Inflation', sentiment: 0.35 },
        { topic: 'IT Sector', sentiment: 0.78 }
      ],
      lastUpdated: new Date().toISOString()
    };
  }
};

module.exports = { sentimentAnalysisContextProvider };
