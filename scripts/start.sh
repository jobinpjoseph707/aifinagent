#!/bin/bash
# Start script for the Financial AI Agent

# Start Python FastAPI service
python -m uvicorn app:main --host 0.0.0.0 --port 8000 &

# Start Node.js service
node src/index.js
