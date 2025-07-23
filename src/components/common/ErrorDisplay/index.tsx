import { Alert } from 'antd'
import type { ReactNode } from 'react'

interface ErrorDisplayProps {
  error: Error | null
  title?: string
  showIcon?: boolean
  type?: 'error' | 'warning'
  action?: ReactNode
}

export default function ErrorDisplay({ 
  error, 
  title = 'Something went wrong',
  showIcon = true,
  type = 'error',
  action
}: ErrorDisplayProps) {
  if (!error) return null

  return (
    <Alert
      message={title}
      description={error.message}
      type={type}
      showIcon={showIcon}
      action={action}
      style={{ margin: '1rem 0' }}
    />
  )
}
