# Backend Integration Guide

## Overview

This starter template supports two modes of development:
1. **Mock API Mode** (default) - Uses MSW to intercept and mock API requests
2. **Real Backend Mode** - Connects to your actual backend server via Vite proxy

## Configuration

### Environment Variables

Create or edit `.env` file in the project root:

```env
# Use MSW mock API (true) or real backend (false)
VITE_USE_MOCK_API=true

# Your backend server URL
VITE_API_BASE_URL=http://localhost:3000
```

### Vite Proxy Configuration

The proxy is already configured in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',  // Your backend URL
      changeOrigin: true,
      secure: false,
    },
  },
}
```

## Switching Between Mock and Real API

### Option 1: Using Mock API (Development without Backend)

1. Set environment variable:
   ```env
   VITE_USE_MOCK_API=true
   ```

2. Start dev server:
   ```bash
   pnpm dev
   ```

3. MSW will intercept all `/api/*` requests and return mock data

### Option 2: Using Real Backend

1. **Start your backend server** (e.g., on `http://localhost:3000`)

2. Update `.env`:
   ```env
   VITE_USE_MOCK_API=false
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. Update `vite.config.ts` if your backend runs on a different port:
   ```typescript
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:8080',  // Your actual backend port
         changeOrigin: true,
         secure: false,
       },
     },
   }
   ```

4. Start dev server:
   ```bash
   pnpm dev
   ```

5. All `/api/*` requests will be proxied to your backend

## API Endpoint Structure

Your backend should implement these endpoints:

### Users API

```
GET    /api/users          - Get all users
GET    /api/user/:id       - Get user by ID
POST   /api/users          - Create new user
PUT    /api/users/:id      - Update user
DELETE /api/users/:id      - Delete user
```

### Request/Response Examples

#### GET /api/users
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /api/users
Request:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "user"
}
```

Response:
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "user",
  "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  "createdAt": "2024-01-02T00:00:00.000Z"
}
```

## Authentication Setup

If your backend requires authentication:

### 1. Update API Service

Edit `src/services/api.ts`:

```typescript
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Get token from storage
  const token = localStorage.getItem('token')
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options?.headers,
      },
      ...options,
    })
    
    // Handle 401 Unauthorized
    if (response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
      throw new ApiError('Unauthorized', 401)
    }

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Network error occurred', 0, error)
  }
}
```

### 2. Add Login Endpoint

```typescript
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    fetchApi<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    
  logout: () =>
    fetchApi('/auth/logout', {
      method: 'POST',
    }),
}
```

## CORS Configuration

### Backend CORS Setup (Node.js/Express Example)

```javascript
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:5173',  // Vite dev server
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
```

### Backend CORS Setup (Python/Flask Example)

```python
from flask_cors import CORS

CORS(app, origins=['http://localhost:5173'], 
     supports_credentials=True)
```

## Proxy Advanced Configuration

### Multiple Backend Services

```typescript
server: {
  proxy: {
    // User service
    '/api/users': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
    // Auth service
    '/api/auth': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
    // File service
    '/api/files': {
      target: 'http://localhost:3002',
      changeOrigin: true,
    },
  },
}
```

### WebSocket Proxy

```typescript
server: {
  proxy: {
    '/ws': {
      target: 'ws://localhost:3000',
      ws: true,
      changeOrigin: true,
    },
  },
}
```

### Rewriting Paths

If your backend doesn't use `/api` prefix:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
      // /api/users → /users on backend
    },
  },
}
```

## Debugging

### Check Proxy is Working

1. Open browser DevTools → Network tab
2. Make an API request
3. Check the request URL - it should show `http://localhost:5173/api/...`
4. Check the response - it should come from your backend

### Common Issues

**Issue**: CORS errors
- **Solution**: Configure CORS on your backend server

**Issue**: 404 Not Found
- **Solution**: Verify backend server is running and endpoints are correct

**Issue**: Connection Refused
- **Solution**: Check `target` URL in proxy config matches your backend

**Issue**: Mock API still active
- **Solution**: Set `VITE_USE_MOCK_API=false` and restart dev server

## Production Build

For production, set the API URL in your deployment:

```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://api.yourapp.com
```

Or update `src/services/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://api.yourapp.com'
  : '/api'
```

## Testing the Integration

1. Start your backend server
2. Set `VITE_USE_MOCK_API=false`
3. Start Vite dev server: `pnpm dev`
4. Try these operations:
   - View users list
   - Create a new user
   - Edit existing user
   - Delete a user
5. Check browser DevTools Network tab to verify requests go to backend

## Example Backend (Node.js/Express)

Quick backend example for testing:

```javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' }
]

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const user = { id: Date.now(), ...req.body }
  users.push(user)
  res.json(user)
})

app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body }
    res.json(users[index])
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  users = users.filter(u => u.id !== id)
  res.status(204).send()
})

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000')
})
```

Save as `backend.js` and run:
```bash
npm install express cors
node backend.js
```

---

For more information, see:
- [Vite Proxy Documentation](https://vitejs.dev/config/server-options.html#server-proxy)
- [MSW Documentation](https://mswjs.io/)
