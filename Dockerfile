# Multi-stage build for Financial AI Agent

# Node.js stage
FROM node:18-slim AS node_builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Python stage
FROM python:3.11-slim
WORKDIR /app

# Copy Python requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Node.js built files
COPY --from=node_builder /app/dist ./dist
COPY --from=node_builder /app/node_modules ./node_modules

# Copy application code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PYTHONPATH=/app

# Expose ports
EXPOSE 3000
EXPOSE 8000
EXPOSE 8080

# Start the application
CMD ["./scripts/start.sh"]
