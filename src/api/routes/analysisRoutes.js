const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// Analysis routes
router.get('/', analysisController.getAll);
router.get('/sentiment', analysisController.getSentiment);
router.post('/analyze-text', analysisController.analyzeText);

module.exports = router;
