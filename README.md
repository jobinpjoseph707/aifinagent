# Financial AI Agent for India

An AI-powered financial assistant that integrates real-time market data and news sentiment analysis to provide investment strategies and recommendations for the Indian financial markets.

## Features

- Real-time market data integration from Indian exchanges (NSE, BSE)
- News sentiment analysis for market mood assessment
- Model Context Protocol (MCP) for AI model interaction
- Dynamic strategy formulation based on market conditions
- Self-learning system that improves with historical data
- User-friendly dashboard for financial insights

## Architecture

- **Frontend**: React-based dashboard
- **Backend**: Node.js + Express and Python FastAPI
- **AI Models**: TensorFlow/PyTorch for sentiment analysis and market prediction
- **MCP**: Model Context Protocol for AI model interaction
- **Data Storage**: MongoDB for structured data, Redis for caching

## Setup

### Prerequisites

- Node.js (v16+)
- Python (3.9+)
- MongoDB
- Redis (optional, for caching)

### Installation

1. Clone this repository
2. Run the setup script:
   `
   ./scripts/setup.ps1
   `
3. Configure your environment variables in the .env file
4. Start the development server:
   `
   npm run dev
   `

## Environment Variables

Copy .env.template to .env and fill in your API keys and configuration.

## Development

### Backend

- Node.js backend located in src/
- Python services located in src/

### Frontend

- React frontend located in src/frontend/
- Build the frontend:
  `
  cd src/frontend
  npm install
  npm run build
  `

## License

MIT
