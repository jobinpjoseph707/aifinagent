const marketDataContextProvider = {
  name: 'market-data',
  description: 'Provides real-time and historical market data for Indian markets',
  
  // Define the schema for this context provider
  schema: {
    type: 'object',
    properties: {
      indices: { 
        type: 'array',
        items: { type: 'string' }
      },
      symbols: { 
        type: 'array',
        items: { type: 'string' }
      },
      timeframe: { 
        type: 'string', 
        enum: ['1d', '1w', '1m', '3m', '6m', '1y', '5y'] 
      },
      dataType: {
        type: 'string',
        enum: ['ohlc', 'technical', 'fundamentals', 'all']
      }
    },
    required: ['timeframe', 'dataType']
  },
  
  // Function to retrieve market data
  contextRetriever: async (params) => {
    // This would connect to your market data service
    // For now, we'll return mock data
    return {
      indices: {
        'NIFTY 50': {
          current: 22456.8,
          change: 124.5,
          percentChange: 0.56,
          volume: 234567890
        },
        'SENSEX': {
          current: 73952.4,
          change: 387.2,
          percentChange: 0.53,
          volume: 345678901
        }
      },
      technicalIndicators: {
        'NIFTY 50': {
          rsi: 62.4,
          macd: 45.6,
          movingAverages: {
            ma50: 22150.4,
            ma200: 21456.7
          }
        }
      },
      marketBreadth: {
        advanceDeclineRatio: 1.45,
        volumeRatio: 1.2
      },
      lastUpdated: new Date().toISOString()
    };
  }
};

module.exports = { marketDataContextProvider };
