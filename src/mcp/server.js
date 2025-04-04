const { MCPServer } = require('mcp-server');
const logger = require('../utils/logger');
const { sentimentAnalysisContextProvider } = require('./contextProviders/sentimentAnalysis');
const { marketDataContextProvider } = require('./contextProviders/marketData');
const { strategyContextProvider } = require('./contextProviders/strategy');

const setupMCPServer = async () => {
  try {
    const mcpServer = new MCPServer({
      port: process.env.MCP_SERVER_PORT || 8080,
      apiKey: process.env.MCP_API_KEY,
      contextProviders: [
        sentimentAnalysisContextProvider,
        marketDataContextProvider,
        strategyContextProvider
      ]
    });

    await mcpServer.start();
    logger.info(MCP Server started on port );
    
    return mcpServer;
  } catch (error) {
    logger.error(Error starting MCP Server: );
    throw error;
  }
};

module.exports = { setupMCPServer };
