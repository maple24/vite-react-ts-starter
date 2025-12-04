# Docker & Environment Setup

This document explains how to use Docker and environment variables with this Vite React TypeScript application.

## Environment Variables

### Available Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_APP_NAME` | Application name | `Vite React TS Starter` | No |
| `VITE_APP_VERSION` | Application version | `0.0.0` | No |
| `VITE_API_BASE_URL` | Base URL for API calls | `http://localhost:3001/api` | Yes |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` | No |
| `VITE_ENABLE_DEV_TOOLS` | Enable development tools | `true` | No |
| `VITE_ENABLE_MSW` | Enable Mock Service Worker | `true` | No |
| `VITE_LOG_LEVEL` | Logging level | `info` | No |

### Environment Files

- `.env` - Default environment variables
- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables
- `.env.example` - Template file (copy to `.env` and customize)

## Docker Usage

### Building the Docker Image

```bash
# Build the Docker image
npm run docker:build

# Or manually
docker build -t vite-react-ts-starter .
```

### Running with Docker

```bash
# Run the container
npm run docker:run

# Or manually
docker run -p 3000:80 vite-react-ts-starter
```

### Using Docker Compose

```bash
# Development environment
npm run docker:dev

# Production environment
npm run docker:prod

# Default environment
npm run docker:up

# Stop containers
npm run docker:down

# View logs
npm run docker:logs
```

### Environment Variables in Docker

You can override environment variables when running Docker containers:

```bash
# Using docker run
docker run -p 3000:80 \
  -e VITE_API_BASE_URL=https://api.example.com/api \
  -e VITE_APP_NAME="My App" \
  vite-react-ts-starter

# Using docker-compose with .env file
echo "VITE_API_BASE_URL=https://api.example.com/api" > .env.local
docker-compose --env-file .env.local up
```

## Nginx Configuration

The application uses Nginx in production with the following features:

- **Gzip compression** - Reduces bundle sizes
- **Security headers** - Adds security-related HTTP headers
- **Static asset caching** - Long-term caching for assets
- **SPA routing** - Handles client-side routing for React Router
- **Health check endpoint** - Available at `/health`

### Customizing Nginx

Edit `nginx/nginx.conf` to customize the Nginx configuration.

## Development vs Production

### Development
- Uses `docker-compose.dev.yml`
- Enables hot reloading
- Includes development tools
- Verbose logging

### Production
- Uses `docker-compose.prod.yml`
- Optimized for performance
- Minimal logging
- Security headers enabled

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change the port mapping in docker-compose files
2. **Environment variables not working**: Ensure variables start with `VITE_`
3. **Build failures**: Check that all dependencies are correctly installed

### Health Check

The application exposes a health check endpoint at `/health` that returns HTTP 200 with "healthy" text.

```bash
# Check if the application is running
curl http://localhost:3000/health
```

### Logs

View application logs using:

```bash
# Docker Compose logs
docker-compose logs -f

# Container logs
docker logs -f <container_name>
```
