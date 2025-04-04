const logger = require('../../utils/logger');
const axios = require('axios');

// MCP Controller methods
exports.getAll = async (req, res) => {
    try {
        // Get a list of available MCP context providers
        const mcpServerUrl = process.env.MCP_SERVER_URL || 'http://localhost:8080';
        const response = await axios.get(`${mcpServerUrl}/context-providers`, {
            headers: {
                'Authorization': `Bearer ${process.env.MCP_API_KEY}`
            }
        });
        
        res.json({ 
            status: 'success', 
            data: response.data 
        });
    } catch (error) {
        logger.error(`Error in mcpController: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getContext = async (req, res) => {
    try {
        const { provider } = req.params;
        const params = req.query;
        
        if (!provider) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Context provider name is required' 
            });
        }
        
        // Request context from the MCP server
        const mcpServerUrl = process.env.MCP_SERVER_URL || 'http://localhost:8080';
        const response = await axios.post(`${mcpServerUrl}/context/${provider}`, params, {
            headers: {
                'Authorization': `Bearer ${process.env.MCP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        res.json({ 
            status: 'success', 
            data: response.data 
        });
    } catch (error) {
        logger.error(`Error getting MCP context: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getMarketDataContext = async (req, res) => {
    try {
        // Specific endpoint for market data context
        const mcpServerUrl = process.env.MCP_SERVER_URL || 'http://localhost:8080';
        const response = await axios.post(`${mcpServerUrl}/context/market-data`, {
            timeframe: req.query.timeframe || '1d',
            dataType: req.query.dataType || 'all',
            indices: req.query.indices ? req.query.indices.split(',') : ['NIFTY 50', 'SENSEX']
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.MCP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        res.json({ 
            status: 'success', 
            data: response.data 
        });
    } catch (error) {
        logger.error(`Error getting market data context: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getSentimentContext = async (req, res) => {
    try {
        // Specific endpoint for sentiment analysis context
        const mcpServerUrl = process.env.MCP_SERVER_URL || 'http://localhost:8080';
        const response = await axios.post(`${mcpServerUrl}/context/sentiment-analysis`, {
            source: req.query.source || 'both',
            timeframe: req.query.timeframe || 'today',
            symbols: req.query.symbols ? req.query.symbols.split(',') : []
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.MCP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        res.json({ 
            status: 'success', 
            data: response.data 
        });
    } catch (error) {
        logger.error(`Error getting sentiment context: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getStrategyContext = async (req, res) => {
    try {
        // Specific endpoint for investment strategy context
        const mcpServerUrl = process.env.MCP_SERVER_URL || 'http://localhost:8080';
        const response = await axios.post(`${mcpServerUrl}/context/strategy`, {
            riskProfile: req.query.riskProfile || 'moderate',
            investmentHorizon: req.query.investmentHorizon || 'medium',
            sectors: req.query.sectors ? req.query.sectors.split(',') : [],
            capitalAmount: req.query.capitalAmount ? parseFloat(req.query.capitalAmount) : 100000
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.MCP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        res.json({ 
            status: 'success', 
            data: response.data 
        });
    } catch (error) {
        logger.error(`Error getting strategy context: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};
