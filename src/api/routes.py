from fastapi import APIRouter, FastAPI, HTTPException, Depends
import logging

logger = logging.getLogger(__name__)

def register_routes(app, market_data, sentiment_analyzer, market_predictor, mcp_client):
    """Register all API routes for the FastAPI application"""
    
    # Create API router
    api_router = APIRouter(prefix="/api")
    
    # Market data routes
    @api_router.get("/market-data")
    async def get_market_data():
        try:
            return {"status": "success", "data": await market_data.get_data()}
        except Exception as e:
            logger.error(f"Error fetching market data: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    @api_router.get("/market-data/nifty")
    async def get_nifty_data():
        try:
            return {"status": "success", "data": await market_data.get_nifty_data()}
        except Exception as e:
            logger.error(f"Error fetching Nifty data: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    @api_router.get("/market-data/sensex")
    async def get_sensex_data():
        try:
            return {"status": "success", "data": await market_data.get_sensex_data()}
        except Exception as e:
            logger.error(f"Error fetching Sensex data: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    # Sentiment analysis routes
    @api_router.get("/sentiment")
    async def get_sentiment():
        try:
            return {"status": "success", "data": await sentiment_analyzer.analyze()}
        except Exception as e:
            logger.error(f"Error analyzing sentiment: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    @api_router.post("/sentiment/analyze")
    async def analyze_text(data: dict):
        try:
            if "text" not in data:
                raise HTTPException(status_code=400, detail="Text is required")
            
            return {"status": "success", "data": await sentiment_analyzer.analyze_text(data["text"])}
        except HTTPException as he:
            raise he
        except Exception as e:
            logger.error(f"Error analyzing text: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    # Market prediction routes
    @api_router.get("/prediction")
    async def get_prediction():
        try:
            return {"status": "success", "data": await market_predictor.predict()}
        except Exception as e:
            logger.error(f"Error making prediction: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    @api_router.post("/prediction/custom")
    async def custom_prediction(data: dict):
        try:
            return {"status": "success", "data": await market_predictor.custom_prediction(data)}
        except Exception as e:
            logger.error(f"Error making custom prediction: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    # MCP client routes
    @api_router.get("/mcp/context/{provider}")
    async def get_mcp_context(provider: str, params: dict = {}):
        try:
            return {"status": "success", "data": await mcp_client.get_context(provider, params)}
        except Exception as e:
            logger.error(f"Error getting MCP context: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    # Register router with app
    app.include_router(api_router)
    
    logger.info("API routes registered")
