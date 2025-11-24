import { Empty, Button } from 'antd'
import { PlusOutlined, InboxOutlined } from '@ant-design/icons'

interface EmptyStateProps {
  title?: string
  description?: string
  action?: {
    text: string
    onClick: () => void
    icon?: React.ReactNode
  }
  image?: React.ReactNode
}

export default function EmptyState({ 
  title = 'No Data', 
  description = 'There is no data to display',
  action,
  image
}: EmptyStateProps) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '300px',
      padding: '2rem'
    }}>
      <Empty
        image={image || <InboxOutlined style={{ fontSize: '64px', color: '#bfbfbf' }} />}
        imageStyle={{ height: 80 }}
        description={
          <div>
            <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>
              {title}
            </div>
            <div style={{ color: '#8c8c8c' }}>
              {description}
            </div>
          </div>
        }
      >
        {action && (
          <Button 
            type="primary" 
            icon={action.icon || <PlusOutlined />}
            onClick={action.onClick}
          >
            {action.text}
          </Button>
        )}
      </Empty>
    </div>
  )
}
