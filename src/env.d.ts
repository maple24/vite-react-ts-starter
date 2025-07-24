/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENABLE_DEV_TOOLS: string
  readonly VITE_ENABLE_MSW: string
  readonly VITE_LOG_LEVEL: string
  readonly VITE_HOT_RELOAD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
