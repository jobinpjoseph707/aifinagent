const logger = require('../../utils/logger');
const indianMarketConnector = require('../../data_connectors/indianMarketConnector');
const dataTransformer = require('../../utils/dataTransformer');

// Controller methods
exports.getAll = async (req, res) => {
    try {
        const marketData = await indianMarketConnector.getData();
        const transformedData = dataTransformer.transformMarketData(marketData);
        
        res.json({ 
            status: 'success', 
            data: transformedData 
        });
    } catch (error) {
        logger.error(`Error in marketDataController: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getNifty = async (req, res) => {
    try {
        const niftyData = await indianMarketConnector.getNifty50Data();
        res.json({ 
            status: 'success', 
            data: niftyData 
        });
    } catch (error) {
        logger.error(`Error getting Nifty data: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getSensex = async (req, res) => {
    try {
        const sensexData = await indianMarketConnector.getSensexData();
        res.json({ 
            status: 'success', 
            data: sensexData 
        });
    } catch (error) {
        logger.error(`Error getting Sensex data: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getStock = async (req, res) => {
    try {
        const { symbol } = req.params;
        
        if (!symbol) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Stock symbol is required' 
            });
        }
        
        const stockData = await indianMarketConnector.getStockData(symbol.toUpperCase());
        res.json({ 
            status: 'success', 
            data: stockData 
        });
    } catch (error) {
        logger.error(`Error getting stock data: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getSector = async (req, res) => {
    try {
        const { sector } = req.params;
        
        if (!sector) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Sector name is required' 
            });
        }
        
        const sectorData = await indianMarketConnector.getSectorData(sector.toUpperCase());
        res.json({ 
            status: 'success', 
            data: sectorData 
        });
    } catch (error) {
        logger.error(`Error getting sector data: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
};
