import React, { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { AuthUser, LoginRequest, LoginResponse } from '../types/auth'

interface AuthContextType {
  user: AuthUser | null
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('authToken')
    const savedUser = localStorage.getItem('authUser')
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser({ ...parsedUser, isAuthenticated: true })
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginRequest): Promise<void> => {
    setIsLoading(true)
    try {
      // Mock API call - replace with actual API call
      const response = await mockLogin(credentials)
      
      const authUser: AuthUser = {
        ...response.user,
        isAuthenticated: true
      }
      
      setUser(authUser)
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('authUser', JSON.stringify(response.user))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: user?.isAuthenticated ?? false
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Mock login function - replace with actual API call
const mockLogin = async (credentials: LoginRequest): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock validation - in real app, this would be handled by your backend
  if (credentials.email === 'admin@example.com' && credentials.password === 'password123') {
    return {
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
      },
      token: 'mock-jwt-token-12345'
    }
  } else if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
    return {
      user: {
        id: 2,
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
      },
      token: 'mock-jwt-token-67890'
    }
  } else {
    throw new Error('Invalid email or password')
  }
}
