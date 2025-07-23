import type { User } from './user'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken?: string
}

export interface AuthUser extends User {
  isAuthenticated: boolean
}
