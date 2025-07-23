import { Result, Button } from 'antd'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary?: () => void
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle={error.message}
      extra={
        resetErrorBoundary && (
          <Button type="primary" onClick={resetErrorBoundary}>
            Try again
          </Button>
        )
      }
    />
  )
}
