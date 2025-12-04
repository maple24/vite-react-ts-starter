import React from 'react'
import { ReactNode } from 'react'
import { App as AntdApp } from 'antd'
import { ToastContext } from './toast-context'
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

