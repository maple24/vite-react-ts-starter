# Docker & Environment Setup

This document explains how to use Docker and environment variables with this Vite React TypeScript application.

## When to Use What?

### Dockerfile
**Use when:**
- Building a standalone Docker image
- Deploying to container registries (Docker Hub, ECR, etc.)
- Running a single container manually
- Integrating with CI/CD pipelines
- Need a production-ready image without orchestration

**Example use cases:**
- `docker build -t my-app .` - Build the image
- `docker run -p 80:80 my-app` - Run single container
- Push to registry for deployment to cloud platforms (AWS ECS, Azure Container Instances, etc.)

### Docker Compose
**Use when:**
- Running multiple services together (frontend + backend + database)
- Orchestrating multiple containers locally
- Simplifying complex docker run commands
- Need to manage container dependencies

**Example use cases:**
- Production deployment: `docker-compose -f docker-compose.prod.yml up -d`
- Full stack development: Frontend + Backend API + PostgreSQL + Redis
- Multi-container orchestration with networking and volumes

### Nginx Configuration
**When it's used:**
- Nginx is automatically used in **production builds only** (via Dockerfile)
- Serves the built static files from the `/dist` folder
- Not used in development mode (Vite dev server handles that)

**What it does:**
- Serves your React app as static files
- Handles client-side routing (React Router)
- Proxies `/api` requests to your backend
- Adds gzip compression and security headers
- Provides health check endpoint

**When to modify `nginx/nginx.conf`:**
- Changing backend API URL (update `proxy_pass` in `/api` location)
- Adding custom headers or security rules
- Adjusting caching strategies
- Adding new proxy routes

## Quick Decision Guide

| Scenario | Use |
|----------|-----|
| Local development with hot reload | `pnpm dev` (run locally, not Docker) |
| Test production build locally | `Dockerfile` alone or `docker-compose.prod.yml` |
| Deploy to AWS/Azure/GCP | `Dockerfile` (build image, push to registry) |
**Full-stack development (frontend + backend)** | Create custom `docker-compose.yml` with multiple services |
| CI/CD pipeline | `Dockerfile` for building, Docker Compose for testing |
| Need to proxy API requests | Modify `nginx/nginx.conf` |

## Environment Variables

### Available Environment Variables

| Variable | Description | Default | File |
|----------|-------------|---------|------|
| `VITE_USE_MOCK_API` | Enable Mock Service Worker | `true` (dev), `false` (prod) | `.env.development` / `.env.production` |
| `VITE_API_BASE_URL` | Base URL for API calls | `http://localhost:3000` (dev), `/api` (prod) | `.env.development` / `.env.production` |
| `VITE_ENABLE_DEV_TOOLS` | Enable React Query DevTools | `true` (dev), `false` (prod) | `.env.development` / `.env.production` |
| `VITE_APP_NAME` | Application name | `Vite React TS Starter` | `.env.production` |
| `VITE_APP_VERSION` | Application version | `2.0.0` | `.env.production` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` | `.env.production` |

### Environment Files

- `.env.development` - Development environment variables (used when running `pnpm dev`)
- `.env.production` - Production environment variables (used when building with `pnpm build`)

> **Note**: Vite automatically loads the correct `.env` file based on the mode. Variables must be prefixed with `VITE_` to be exposed to your app.

## Docker Usage

### Building the Docker Image

```bash
# Build the Docker image
pnpm run docker:build

# Or manually
docker build -t vite-react-ts-starter .
```

### Running with Docker

```bash
# Run the container
pnpm run docker:run

# Or manually
docker run -p 80:80 vite-react-ts-starter
```

### Using Docker Compose

```bash
# Production environment
pnpm run docker:prod
# Or manually:
docker-compose -f docker-compose.prod.yml up -d

# Stop containers
pnpm run docker:down

# View logs
pnpm run docker:logs
```

> **Note**: For development, use `pnpm dev` locally instead of Docker for hot reload and better DX.

### Building with Custom Environment
### Building with Custom Environment

To build with custom environment variables, modify `.env.production` before building:

```bash
# Edit .env.production with your production values
# For example, to use Nginx proxy:
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=/api
VITE_ENABLE_DEV_TOOLS=false

# Then build the Docker image
docker build -t vite-react-ts-starter .
```

> **Important**: 
> - Vite environment variables are baked in at **build time**, not runtime
> - For production, set `VITE_API_BASE_URL=/api` and configure the actual backend URL in `nginx/nginx.conf` using `proxy_pass`
> - This approach avoids CORS issues and keeps backend URLs secure
## Nginx Configuration

The application uses Nginx **only in production builds** (when using Dockerfile) with the following features:

- **Gzip compression** - Reduces bundle sizes
- **Security headers** - Adds security-related HTTP headers
- **Static asset caching** - Long-term caching for assets
- **SPA routing** - Handles client-side routing for React Router
- **API proxy** - Forwards `/api` requests to backend (configure `proxy_pass`)
- **Health check endpoint** - Available at `/health`

> **Note**: Development mode uses Vite's dev server, not Nginx.

### When to Modify Nginx Config

Edit `nginx/nginx.conf` when you need to:

1. **Connect to a backend API**:
   ```nginx
   location /api {
       proxy_pass http://your-backend:3000;  # Update this URL
   }
   ```

2. **Add custom routes or redirects**
3. **Modify security headers**
4. **Change caching strategies**
5. **Add WebSocket support**

## Development vs Production

### Development
- Run locally with `pnpm dev` (recommended)
- Hot reloading with Vite dev server
- Full access to development tools
- Fast iteration cycle
- No Docker overhead

### Production
- Uses `Dockerfile` and `docker-compose.prod.yml`
- Optimized for performance
- Served with Nginx
- Minimal logging
- Security headers enabled
- Containerized for deployment

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change the port mapping in docker-compose files
2. **Environment variables not working**: Ensure variables start with `VITE_`
3. **Build failures**: Check that all dependencies are correctly installed

### Health Check
### Health Check

The application exposes a health check endpoint at `/health` that returns HTTP 200 with "healthy" text.

```bash
# Check if the application is running
curl http://localhost/health
```

### Logs
View application logs using:

```bash
# Docker Compose logs (production)
pnpm run docker:logs
# Or manually:
docker-compose -f docker-compose.prod.yml logs -f

# Container logs (standalone)
docker logs -f <container_name>
```

## Example: Full Stack Deployment

If you want to deploy both frontend and backend together:

```yaml
# docker-compose.fullstack.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    image: your-backend-image:latest
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://db:5432/myapp
    networks:
      - app-network

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=yourpassword
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  db-data:
```

Then update `nginx/nginx.conf` to proxy to the backend service:
```nginx
location /api {
    proxy_pass http://backend:3000;  # Service name from docker-compose
}
```ker-compose logs -f

# Container logs
docker logs -f <container_name>
```
