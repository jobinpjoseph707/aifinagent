const express = require('express');
const router = express.Router();
const marketDataController = require('../controllers/marketDataController');

// Market data routes
router.get('/', marketDataController.getAll);
router.get('/nifty', marketDataController.getNifty);
router.get('/sensex', marketDataController.getSensex);
router.get('/stock/:symbol', marketDataController.getStock);
router.get('/sector/:sector', marketDataController.getSector);

module.exports = router;
