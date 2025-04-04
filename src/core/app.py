import logging
from fastapi import FastAPI
from src.data_connectors.market_data import MarketDataConnector
from src.models.sentiment_analyzer import SentimentAnalyzer
from src.models.market_predictor import MarketPredictor
from src.mcp.mcp_client import MCPClient

logger = logging.getLogger(__name__)

def start_app():
    """Initialize and start the FastAPI application"""
    app = FastAPI(title="Financial AI Agent API", version="0.1.0")
    
    # Initialize components
    market_data = MarketDataConnector()
    sentiment_analyzer = SentimentAnalyzer()
    market_predictor = MarketPredictor()
    mcp_client = MCPClient()
    
    # Register routes and dependencies
    from src.api.routes import register_routes
    register_routes(app, market_data, sentiment_analyzer, market_predictor, mcp_client)
    
    logger.info("FastAPI application initialized")
    return app
