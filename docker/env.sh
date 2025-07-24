#!/bin/sh

# This script replaces environment variables in the built React app at runtime
# It allows for dynamic configuration without rebuilding the Docker image

# Define the directory where the built files are located
BUILD_DIR="/usr/share/nginx/html"

# Find all JavaScript files and replace environment variable placeholders
find ${BUILD_DIR} -name "*.js" -exec sed -i \
  -e "s|VITE_API_BASE_URL_PLACEHOLDER|${VITE_API_BASE_URL:-http://localhost:3001/api}|g" \
  -e "s|VITE_APP_NAME_PLACEHOLDER|${VITE_APP_NAME:-Vite React TS Starter}|g" \
  -e "s|VITE_LOG_LEVEL_PLACEHOLDER|${VITE_LOG_LEVEL:-info}|g" \
  {} \;

echo "Environment variables injected successfully"
