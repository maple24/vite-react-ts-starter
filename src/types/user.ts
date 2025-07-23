export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role?: 'admin' | 'user' | 'moderator'
  createdAt?: string
}

export interface CreateUserRequest {
  name: string
  email: string
  role?: User['role']
}
