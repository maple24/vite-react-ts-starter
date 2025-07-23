import type { User, CreateUserRequest } from '../types'

const API_BASE_URL = '/api'

export class ApiError extends Error {
  public status: number
  public data?: unknown

  constructor(
    message: string,
    status: number,
    data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

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

export const userApi = {
  getUser: (id: number): Promise<User> =>
    fetchApi(`/user/${id}`),

  getUsers: (): Promise<User[]> =>
    fetchApi('/users'),

  createUser: (userData: CreateUserRequest): Promise<User> =>
    fetchApi('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  updateUser: (id: number, userData: Partial<User>): Promise<User> =>
    fetchApi(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  deleteUser: (id: number): Promise<void> =>
    fetchApi(`/users/${id}`, {
      method: 'DELETE',
    }),
}
