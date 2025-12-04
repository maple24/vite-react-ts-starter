import { createContext } from 'react'

export interface ToastContextType {
  // Empty for now, service is accessed via ToastService singleton
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)


export const ToastContext = createContext<ToastContextType | undefined>(undefined)
