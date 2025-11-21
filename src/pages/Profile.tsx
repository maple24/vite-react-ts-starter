import { Card, Descriptions, Avatar, Space, Typography, Button } from 'antd'
import { UserOutlined, MailOutlined, SafetyOutlined, CalendarOutlined } from '@ant-design/icons'
import { useAuth } from '../hooks/useAuth'

const { Title } = Typography

export default function Profile() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              size={120} 
              src={user.avatar}
              icon={<UserOutlined />}
              style={{ marginBottom: '1rem' }}
            />
            <Title level={2} style={{ margin: 0 }}>
              {user.name}
            </Title>
            <Typography.Text type="secondary" style={{ fontSize: '16px' }}>
              {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
            </Typography.Text>
          </div>

          <Descriptions 
            bordered 
            column={1}
            labelStyle={{ width: '150px', fontWeight: 'bold' }}
          >
            <Descriptions.Item 
              label={<Space><UserOutlined /> Name</Space>}
            >
              {user.name}
            </Descriptions.Item>
            <Descriptions.Item 
              label={<Space><MailOutlined /> Email</Space>}
            >
              {user.email}
            </Descriptions.Item>
            <Descriptions.Item 
              label={<Space><SafetyOutlined /> Role</Space>}
            >
              {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
            </Descriptions.Item>
            {user.createdAt && (
              <Descriptions.Item 
                label={<Space><CalendarOutlined /> Created At</Space>}
              >
                {new Date(user.createdAt).toLocaleDateString()}
              </Descriptions.Item>
            )}
          </Descriptions>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Button type="primary" size="large">
              Edit Profile
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  )
}
