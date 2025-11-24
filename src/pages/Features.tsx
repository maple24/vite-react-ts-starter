import { useState } from 'react'
import { Card, Row, Col, Button, Space, Typography, Divider, Alert, Tabs } from 'antd'
import { useTranslation } from '../hooks/useTranslation'
import { useNotification } from '../hooks/useNotification'
import ThemeToggle from '../components/common/ThemeToggle'
import LanguageSwitcher from '../components/common/LanguageSwitcher'
import RoleGuard from '../components/common/RoleGuard'
import FileUpload from '../components/FileUpload'
import Skeleton, { TableSkeleton, CardSkeleton, ListSkeleton } from '../components/common/Skeleton'
import EmptyState from '../components/common/EmptyState'
import { toast } from '../components/common/Toast'
import type { UserRole } from '../utils/rbac'
import { hasPermission, isAdmin, isModerator } from '../utils/rbac'
import { useAuth } from '../hooks/useAuth'

const { Title, Paragraph, Text } = Typography

export default function Features() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo,
    contextHolder 
  } = useNotification()
  
  const [demoCount, setDemoCount] = useState(0)
  const [showSkeletons, setShowSkeletons] = useState(true)

  const handleNotificationDemo = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: { message: t('common.success'), description: 'This is a success notification demo!' },
      error: { message: t('common.error'), description: 'This is an error notification demo!' },
      warning: { message: t('common.warning'), description: 'This is a warning notification demo!' },
      info: { message: t('common.info'), description: 'This is an info notification demo!' },
    }
    
    const notification = messages[type]
    
    switch (type) {
      case 'success':
        showSuccess(notification)
        break
      case 'error':
        showError(notification)
        break
      case 'warning':
        showWarning(notification)
        break
      case 'info':
        showInfo(notification)
        break
    }
  }

  const handleFileUpload = async (files: File[]) => {
    console.log('Uploading files:', files)
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const tabItems = [
    {
      key: 'ui',
      label: '🎨 UI Components',
      children: (
        <Row gutter={[16, 16]}>
          {/* Theme Toggle */}
          <Col xs={24} md={12}>
            <Card title="🌙 Dark/Light Theme Toggle" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>Switch between dark and light themes:</Text>
                <ThemeToggle />
                <Text type="secondary">
                  Theme preference is automatically saved and synced with system preferences.
                </Text>
              </Space>
            </Card>
          </Col>

          {/* Internationalization */}
          <Col xs={24} md={12}>
            <Card title="🌍 Internationalization (i18n)" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>Change language:</Text>
                <LanguageSwitcher />
                <Text type="secondary">
                  Current: {t('navigation.home')} | {t('auth.login')} | {t('common.loading')}
                </Text>
              </Space>
            </Card>
          </Col>

          {/* Notifications */}
          <Col xs={24} md={12}>
            <Card title="🔔 Toast Notifications" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>Test different notification types:</Text>
                <Space wrap>
                  <Button type="primary" onClick={() => handleNotificationDemo('success')}>Success</Button>
                  <Button danger onClick={() => handleNotificationDemo('error')}>Error</Button>
                  <Button onClick={() => handleNotificationDemo('warning')}>Warning</Button>
                  <Button onClick={() => handleNotificationDemo('info')}>Info</Button>
                  <Button onClick={() => toast.success('Using toast service directly!')}>Toast</Button>
                </Space>
              </Space>
            </Card>
          </Col>

          {/* Skeleton Loaders */}
          <Col xs={24} md={12}>
            <Card title="💀 Skeleton Loaders" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>Loading states with skeleton screens:</Text>
                <Button onClick={() => setShowSkeletons(!showSkeletons)}>
                  {showSkeletons ? 'Show Content' : 'Show Skeletons'}
                </Button>
                <Divider style={{ margin: '12px 0' }} />
                <Skeleton loading={showSkeletons} rows={2}>
                  <Text>This is the actual content that loads after the skeleton.</Text>
                </Skeleton>
              </Space>
            </Card>
          </Col>

          {/* Empty State */}
          <Col xs={24}>
            <Card title="📭 Empty State Component" size="small">
              <EmptyState
                title="No Items Found"
                description="Try adding some items to see them here"
                action={{
                  text: 'Add Item',
                  onClick: () => toast.info('Add item clicked!')
                }}
              />
            </Card>
          </Col>
        </Row>
      )
    },
    {
      key: 'data',
      label: '📊 Data Components',
      children: (
        <Row gutter={[16, 16]}>
          {/* File Upload */}
          <Col xs={24}>
            <Card title="📤 File Upload Component" size="small">
              <FileUpload
                maxSize={5}
                maxFiles={3}
                multiple
                onUpload={handleFileUpload}
              />
            </Card>
          </Col>

          {/* Table Skeleton */}
          <Col xs={24} md={12}>
            <Card title="📋 Table Skeleton" size="small">
              <TableSkeleton rows={3} />
            </Card>
          </Col>

          {/* Card Skeleton */}
          <Col xs={24} md={12}>
            <Card title="🃏 Card Skeleton" size="small">
              <CardSkeleton />
            </Card>
          </Col>

          {/* List Skeleton */}
          <Col xs={24}>
            <Card title="📝 List Skeleton" size="small">
              <ListSkeleton rows={2} />
            </Card>
          </Col>
        </Row>
      )
    },
    {
      key: 'security',
      label: '🔐 Security Features',
      children: (
        <Row gutter={[16, 16]}>
          {/* Role-based Access Control */}
          <Col xs={24}>
            <Card title="🔐 Role-based Access Control" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>Current user role: <Text strong>{user?.role || 'guest'}</Text></Text>
                
                <Divider style={{ margin: '12px 0' }} />
                
                <RoleGuard allowedRoles={['admin']}>
                  <Alert 
                    message="Admin Only Content" 
                    description="This content is only visible to administrators."
                    type="success" 
                    showIcon 
                    style={{ marginBottom: 8 }}
                  />
                </RoleGuard>
                
                <RoleGuard allowedRoles={['admin', 'moderator']}>
                  <Alert 
                    message="Moderator+ Content" 
                    description="This content is visible to moderators and administrators."
                    type="info" 
                    showIcon 
                    style={{ marginBottom: 8 }}
                  />
                </RoleGuard>
                
                <RoleGuard allowedRoles={['admin', 'moderator', 'user']}>
                  <Alert 
                    message="User+ Content" 
                    description="This content is visible to all authenticated users."
                    type="warning" 
                    showIcon 
                  />
                </RoleGuard>

                <Text type="secondary">
                  Permissions: 
                  {user && (
                    <>
                      {' Admin: ' + isAdmin(user.role as UserRole)}
                      {' | Moderator: ' + isModerator(user.role as UserRole)}
                      {' | Can manage users: ' + hasPermission(user.role as UserRole, 'users', 'manage')}
                    </>
                  )}
                </Text>
              </Space>
            </Card>
          </Col>

          {/* JWT Token Management */}
          <Col xs={24}>
            <Card title="🔑 JWT Token Management" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>Enhanced token management with automatic expiration handling:</Text>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  <li>Automatic token validation</li>
                  <li>Refresh token support</li>
                  <li>Secure storage utilities</li>
                  <li>Token expiration checking</li>
                </ul>
                <Text type="secondary">
                  Tokens are securely managed in localStorage with validation.
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
      )
    },
    {
      key: 'pwa',
      label: '📱 PWA & More',
      children: (
        <Row gutter={[16, 16]}>
          {/* PWA Support */}
          <Col xs={24}>
            <Card title="📱 Progressive Web App (PWA)" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>PWA features enabled:</Text>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  <li>Installable app experience</li>
                  <li>Offline functionality</li>
                  <li>Service worker caching</li>
                  <li>App-like navigation</li>
                  <li>Responsive layout with collapsible sidebar</li>
                </ul>
                <Text type="secondary">
                  Try installing this app on your device or test offline functionality.
                </Text>
              </Space>
            </Card>
          </Col>

          {/* Demo Counter */}
          <Col xs={24}>
            <Card title="🎯 Interactive Demo" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>Test the reactive features:</Text>
                <Space>
                  <Button onClick={() => setDemoCount(prev => prev + 1)}>
                    {t('common.next')} ({demoCount})
                  </Button>
                  <Button onClick={() => setDemoCount(0)}>
                    {t('common.reset')}
                  </Button>
                </Space>
                <Text type="secondary">
                  This counter demonstrates i18n translation and theme responsiveness.
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
      )
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      {contextHolder}
      <Title level={2}>🚀 Enhanced Features Demo</Title>
      <Paragraph>
        This page demonstrates all the new features added to the React TypeScript starter.
      </Paragraph>

      <Tabs defaultActiveKey="ui" items={tabItems} />
    </div>
  )
}
