import { Button, Card, List, Tag, Space, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
import { useUsers, useDeleteUser } from '../../hooks/useUsers'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorDisplay from '../common/ErrorDisplay'
import type { User } from '../../types'

interface UserListProps {
  onEdit?: (user: User) => void
}

export default function UserList({ onEdit }: UserListProps) {
  const { data: users, isLoading, error } = useUsers()
  const deleteUserMutation = useDeleteUser()

  const handleDelete = (userId: number) => {
    deleteUserMutation.mutate(userId)
  }

  if (isLoading) {
    return <LoadingSpinner tip="Loading users..." />
  }

  if (error) {
    return <ErrorDisplay error={error} title="Failed to load users" />
  }

  return (
    <Card title="Users" style={{ width: '100%' }}>
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit?.(user)}
                disabled={deleteUserMutation.isPending}
              >
                Edit
              </Button>,
              <Popconfirm
                key="delete"
                title="Are you sure you want to delete this user?"
                onConfirm={() => handleDelete(user.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  loading={deleteUserMutation.isPending}
                >
                  Delete
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<UserOutlined style={{ fontSize: 24 }} />}
              title={user.name}
              description={
                <Space direction="vertical" size="small">
                  <span>{user.email}</span>
                  {user.role && (
                    <Tag color={user.role === 'admin' ? 'red' : user.role === 'moderator' ? 'orange' : 'blue'}>
                      {user.role.toUpperCase()}
                    </Tag>
                  )}
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
