require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { setupMCPServer } = require('./src/mcp/server');
const marketDataRoutes = require('./src/api/routes/marketDataRoutes');
const analysisRoutes = require('./src/api/routes/analysisRoutes');
const mcpRoutes = require('./src/api/routes/mcpRoutes');
const logger = require('./src/utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

// API Routes
app.use('/api/market-data', marketDataRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/mcp', mcpRoutes);

// Serve static frontend
app.use(express.static('src/frontend/dist'));

// Start the server
const server = app.listen(PORT, () => {
  logger.info(Server running on port );
});

// Setup MCP Server
setupMCPServer();

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received. Closing server');
  server.close(() => {
    logger.info('Server closed');
    mongoose.connection.close(false, () => {
      logger.info('MongoDB connection closed');
      process.exit(0);
    });
  });
});
