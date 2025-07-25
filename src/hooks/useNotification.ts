import { notification } from 'antd'
import type { NotificationArgsProps } from 'antd'

export interface NotificationOptions {
  message: string
  description?: string
  duration?: number
  placement?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'
}

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification()

  const showSuccess = (options: NotificationOptions) => {
    api.success({
      message: options.message,
      description: options.description,
      duration: options.duration || 4.5,
      placement: options.placement || 'topRight',
    } as NotificationArgsProps)
  }

  const showError = (options: NotificationOptions) => {
    api.error({
      message: options.message,
      description: options.description,
      duration: options.duration || 4.5,
      placement: options.placement || 'topRight',
    } as NotificationArgsProps)
  }

  const showWarning = (options: NotificationOptions) => {
    api.warning({
      message: options.message,
      description: options.description,
      duration: options.duration || 4.5,
      placement: options.placement || 'topRight',
    } as NotificationArgsProps)
  }

  const showInfo = (options: NotificationOptions) => {
    api.info({
      message: options.message,
      description: options.description,
      duration: options.duration || 4.5,
      placement: options.placement || 'topRight',
    } as NotificationArgsProps)
  }

  const destroy = (key?: string) => {
    if (key) {
      api.destroy(key)
    } else {
      api.destroy()
    }
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    destroy,
    contextHolder,
  }
}
