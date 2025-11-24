import { message } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading'

class ToastService {
  private messageApi: MessageInstance = message

  setMessageApi(api: MessageInstance) {
    this.messageApi = api
  }

  success(content: string, duration: number = 3) {
    this.messageApi.success(content, duration)
  }

  error(content: string, duration: number = 3) {
    this.messageApi.error(content, duration)
  }

  warning(content: string, duration: number = 3) {
    this.messageApi.warning(content, duration)
  }

  info(content: string, duration: number = 3) {
    this.messageApi.info(content, duration)
  }

  loading(content: string, duration: number = 0) {
    return this.messageApi.loading(content, duration)
  }

  destroy() {
    this.messageApi.destroy()
  }
}

export const toast = new ToastService()
