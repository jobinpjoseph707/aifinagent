#!/bin/bash
# Installation script for the Financial AI Agent

# Install Node.js dependencies
npm install

# Set up Python virtual environment
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create necessary directories
mkdir -p logs
mkdir -p data/raw
mkdir -p data/processed
mkdir -p data/models

echo "Installation completed!"
