import { createContext } from 'react'
import type { AuthUser, LoginRequest } from '../types/auth'

export interface AuthContextType {
  user: AuthUser | null
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)