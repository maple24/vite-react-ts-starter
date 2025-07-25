export type UserRole = 'admin' | 'moderator' | 'user' | 'guest'

export interface Permission {
  resource: string
  action: string
}

export interface RolePermissions {
  [role: string]: Permission[]
}

// Define permissions for each role
export const ROLE_PERMISSIONS: RolePermissions = {
  admin: [
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'read' },
    { resource: 'users', action: 'update' },
    { resource: 'users', action: 'delete' },
    { resource: 'settings', action: 'manage' },
    { resource: 'reports', action: 'view' },
  ],
  moderator: [
    { resource: 'users', action: 'read' },
    { resource: 'users', action: 'update' },
    { resource: 'reports', action: 'view' },
  ],
  user: [
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' },
  ],
  guest: [
    { resource: 'profile', action: 'read' },
  ],
}

// Utility functions for permission checking
export const hasPermission = (userRole: UserRole, resource: string, action: string): boolean => {
  const permissions = ROLE_PERMISSIONS[userRole] || []
  return permissions.some(permission => 
    permission.resource === resource && permission.action === action
  )
}

export const hasAnyRole = (userRole: UserRole, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(userRole)
}

export const isAdmin = (userRole: UserRole): boolean => {
  return userRole === 'admin'
}

export const isModerator = (userRole: UserRole): boolean => {
  return userRole === 'moderator' || userRole === 'admin'
}
