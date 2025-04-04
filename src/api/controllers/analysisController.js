const logger = require('../../utils/logger');
const sentimentProcessor = require('../../analysis/sentimentProcessor');
const dataTransformer = require('../../utils/dataTransformer');

// Controller methods
exports.getAll = async (req, res) => {
    try {
        const sentimentData = await sentimentProcessor.getData();
        const transformedData = dataTransformer.transformSentimentData(sentimentData);
        
        res.json({ 
            status: 'success', 
            data: transformedData 
        });
    } catch (error) {
        logger.error(`Error in analysisController: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getSentiment = async (req, res) => {
    try {
        const sentimentData = await sentimentProcessor.analyzeSentiment();
        res.json({ 
            status: 'success', 
            data: sentimentData 
        });
    } catch (error) {
        logger.error(`Error getting sentiment: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.analyzeText = async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Text is required for analysis' 
            });
        }
        
        const analysis = await sentimentProcessor.analyzeText(text);
        res.json({ 
            status: 'success', 
            data: analysis 
        });
    } catch (error) {
        logger.error(`Error analyzing text: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};
