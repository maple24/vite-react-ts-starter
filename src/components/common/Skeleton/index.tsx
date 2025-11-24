import { Skeleton as AntdSkeleton, Card, Space } from 'antd'

interface SkeletonProps {
  rows?: number
  avatar?: boolean
  loading?: boolean
  children?: React.ReactNode
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      {Array.from({ length: rows }).map((_, index) => (
        <AntdSkeleton key={index} active paragraph={{ rows: 1 }} />
      ))}
    </Space>
  )
}

export function CardSkeleton({ avatar = true }: { avatar?: boolean }) {
  return (
    <Card>
      <AntdSkeleton active avatar={avatar} paragraph={{ rows: 3 }} />
    </Card>
  )
}

export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {Array.from({ length: rows }).map((_, index) => (
        <AntdSkeleton key={index} active avatar paragraph={{ rows: 2 }} />
      ))}
    </Space>
  )
}

export default function Skeleton({ rows = 3, avatar = false, loading = true, children }: SkeletonProps) {
  if (!loading && children) {
    return <>{children}</>
  }

  return <AntdSkeleton active avatar={avatar} paragraph={{ rows }} />
}
