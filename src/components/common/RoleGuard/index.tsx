import type { ReactNode } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import type { UserRole } from '../../../utils/rbac'

interface RoleGuardProps {
  allowedRoles: UserRole[]
  children: ReactNode
  fallback?: ReactNode
}

export default function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      fallback || (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600">Please log in to access this feature.</p>
          </div>
        </div>
      )
    )
  }

  if (!allowedRoles.includes(user.role as UserRole)) {
    return (
      fallback || (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600">
              You don&apos;t have permission to access this feature.
              Required roles: {allowedRoles.join(', ')}
            </p>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
