import { ReactNode } from 'react'
import { App as AntdApp } from 'antd'
import { toast } from '../Toast'

interface ToastProviderProps {
  children: ReactNode
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const { message } = AntdApp.useApp()

  // Set the message API instance for the toast service
  toast.setMessageApi(message)

  return <>{children}</>
}
