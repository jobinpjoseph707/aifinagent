const logger = require('./logger');

/**
 * dataTransformer - Part of the Financial AI Agent for India
 */
class DataTransformer {
    constructor() {
        logger.info("Initializing dataTransformer");
    }
    
    transformMarketData(data) {
        if (!data) return null;
        
        try {
            // Example transformation for market data
            return {
                indices: Object.keys(data.indices || {}).map(key => ({
                    name: key,
                    value: data.indices[key].last || data.indices[key].current,
                    change: data.indices[key].change,
                    percentChange: data.indices[key].percentChange,
                })),
                lastUpdated: new Date()
            };
        } catch (error) {
            logger.error(`Error transforming market data: ${error.message}`);
            return null;
        }
    }
    
    transformSentimentData(data) {
        if (!data) return null;
        
        try {
            // Example transformation for sentiment data
            return {
                overallSentiment: data.overall_sentiment || 0,
                sentimentLabels: this._getSentimentLabel(data.overall_sentiment || 0),
                sources: Object.keys(data.sources || {}).map(key => ({
                    name: key,
                    sentiment: data.sources[key].score,
                    confidence: data.sources[key].confidence
                })),
                lastUpdated: data.timestamp || new Date()
            };
        } catch (error) {
            logger.error(`Error transforming sentiment data: ${error.message}`);
            return null;
        }
    }
    
    _getSentimentLabel(score) {
        if (score >= 0.6) return "Very Bullish";
        if (score >= 0.2) return "Bullish";
        if (score >= -0.2) return "Neutral";
        if (score >= -0.6) return "Bearish";
        return "Very Bearish";
    }
    
    async getData() {
        // Example method
        return { status: 'ok', message: 'dataTransformer is working' };
    }
}

module.exports = new DataTransformer();
