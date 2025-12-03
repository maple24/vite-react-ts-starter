import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  avatar: z.url().optional(),
  role: z.enum(['admin', 'user', 'moderator']).default('user'),
  createdAt: z.string().optional(),
})

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.email('Invalid email address'),
  role: z.enum(['admin', 'user', 'moderator']).default('user'),
})

export const updateUserSchema = createUserSchema.partial()

export type User = z.infer<typeof userSchema>
export type CreateUserRequest = z.infer<typeof createUserSchema>
export type UpdateUserRequest = z.infer<typeof updateUserSchema>
