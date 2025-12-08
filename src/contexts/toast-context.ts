import { createContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToastContextType {
  // Empty for now, service is accessed via ToastService singleton
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

