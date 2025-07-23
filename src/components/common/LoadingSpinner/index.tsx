import { Spin } from 'antd'
import type { ReactNode } from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large'
  tip?: string
  children?: ReactNode
  spinning?: boolean
}

export default function LoadingSpinner({ 
  size = 'default', 
  tip = 'Loading...', 
  children,
  spinning = true 
}: LoadingSpinnerProps) {
  return (
    <Spin size={size} tip={tip} spinning={spinning}>
      {children}
    </Spin>
  )
}
