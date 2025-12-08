import React from 'react'
import type { ReactNode } from 'react'
import { App as AntdApp } from 'antd'
import { toast } from '../components/common/Toast'

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const { message } = AntdApp.useApp()

  // Set the message API instance for the toast service
  toast.setMessageApi(message)

  return <>{children}</>
}


