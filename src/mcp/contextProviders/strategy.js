const strategyContextProvider = {
  name: 'strategy',
  description: 'Provides investment strategies based on market conditions and sentiment analysis',
  
  // Define the schema for this context provider
  schema: {
    type: 'object',
    properties: {
      riskProfile: { 
        type: 'string', 
        enum: ['conservative', 'moderate', 'aggressive'] 
      },
      investmentHorizon: { 
        type: 'string', 
        enum: ['short', 'medium', 'long'] 
      },
      sectors: {
        type: 'array',
        items: { type: 'string' }
      },
      capitalAmount: {
        type: 'number'
      }
    },
    required: ['riskProfile', 'investmentHorizon']
  },
  
  // Function to retrieve strategy recommendations
  contextRetriever: async (params) => {
    // This would connect to your strategy recommendation engine
    // For now, we'll return mock data
    
    // First, get market data and sentiment analysis using other context providers
    // In a real implementation, you'd use the MCP client to request this data
    const marketData = { /* mock market data */ };
    const sentimentData = { /* mock sentiment data */ };
    
    return {
      recommendedAllocations: {
        equity: 65,
        debt: 25,
        gold: 5,
        cash: 5
      },
      sectorRecommendations: [
        { sector: 'IT', allocation: 25, sentiment: 'positive', reasoning: 'Strong earnings and global demand' },
        { sector: 'Banking', allocation: 20, sentiment: 'neutral', reasoning: 'Stable NPA situation but margin pressure' },
        { sector: 'Pharma', allocation: 15, sentiment: 'positive', reasoning: 'Defensive sector with growth potential' }
      ],
      stockIdeas: [
        { symbol: 'TCS', conviction: 'high', reasoning: 'Market leader with stable growth' },
        { symbol: 'HDFC', conviction: 'moderate', reasoning: 'Potential benefits from housing sector growth' }
      ],
      marketOutlook: 'Cautiously optimistic over medium term with potential volatility in near term',
      lastUpdated: new Date().toISOString()
    };
  }
};

module.exports = { strategyContextProvider };
