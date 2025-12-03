import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from 'react-error-boundary'
import { App as AntdApp } from 'antd'
import { router } from './router'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ToastProvider from './components/common/ToastProvider'
import ErrorFallback from './components/common/ErrorFallback'
import './i18n' // Initialize i18n
import 'antd/dist/reset.css'

const queryClient = new QueryClient()

// Enable MSW mock API conditionally based on environment variable
async function enableMocks() {
  const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true'
  
  if (import.meta.env.DEV && useMockApi) {
    const { worker } = await import('./mocks/browser')
    await worker.start()
  }
}

enableMocks().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AntdApp>
            <ToastProvider>
              <ThemeProvider>
                <AuthProvider>
                  <RouterProvider router={router} />
                </AuthProvider>
              </ThemeProvider>
            </ToastProvider>
          </AntdApp>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
})
