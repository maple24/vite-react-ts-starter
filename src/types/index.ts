export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role?: 'admin' | 'user' | 'moderator'
  createdAt?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface CreateUserRequest {
  name: string
  email: string
  role?: User['role']
}
