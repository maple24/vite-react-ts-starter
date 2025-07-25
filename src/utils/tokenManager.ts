import { jwtVerify, SignJWT } from 'jose'

export interface TokenPayload {
  userId: number
  email: string
  role: string
  iat?: number
  exp?: number
}

const JWT_SECRET = new TextEncoder().encode(
  import.meta.env.VITE_JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
)

export const tokenManager = {
  /**
   * Get token from localStorage
   */
  getToken: (): string | null => {
    return localStorage.getItem('authToken')
  },

  /**
   * Set token in localStorage
   */
  setToken: (token: string): void => {
    localStorage.setItem('authToken', token)
  },

  /**
   * Remove token from localStorage
   */
  removeToken: (): void => {
    localStorage.removeItem('authToken')
  },

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken')
  },

  /**
   * Set refresh token in localStorage
   */
  setRefreshToken: (token: string): void => {
    localStorage.setItem('refreshToken', token)
  },

  /**
   * Remove refresh token from localStorage
   */
  removeRefreshToken: (): void => {
    localStorage.removeItem('refreshToken')
  },

  /**
   * Check if token is expired
   */
  isTokenExpired: async (token: string): Promise<boolean> => {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      const currentTime = Math.floor(Date.now() / 1000)
      return (payload.exp as number) < currentTime
    } catch (error) {
      console.error('Error verifying token:', error)
      return true
    }
  },

  /**
   * Decode token payload without verification
   */
  decodeToken: async (token: string): Promise<TokenPayload | null> => {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      return payload as unknown as TokenPayload
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  },

  /**
   * Create a JWT token (for development/testing purposes)
   */
  createToken: async (payload: Omit<TokenPayload, 'iat' | 'exp'>): Promise<string> => {
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET)
    
    return jwt
  },

  /**
   * Clear all auth tokens
   */
  clearTokens: (): void => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('authUser')
  }
}
