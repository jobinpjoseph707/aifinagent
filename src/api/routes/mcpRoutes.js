const express = require('express');
const router = express.Router();
const mcpController = require('../controllers/mcpController');

// MCP routes
router.get('/', mcpController.getAll);
router.get('/context/:provider', mcpController.getContext);
router.get('/market-data', mcpController.getMarketDataContext);
router.get('/sentiment', mcpController.getSentimentContext);
router.get('/strategy', mcpController.getStrategyContext);

module.exports = router;
