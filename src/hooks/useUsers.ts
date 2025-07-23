import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../services/api'
import type { User } from '../types'

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
}

// Hooks
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: userApi.getUsers,
  })
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...userData }: { id: number } & Partial<User>) =>
      userApi.updateUser(id, userData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.setQueryData(userKeys.detail(data.id), data)
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) })
    },
  })
}
