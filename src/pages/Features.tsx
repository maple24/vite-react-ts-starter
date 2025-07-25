import { useState } from 'react'
import { Card, Row, Col, Button, Space, Typography, Divider, Alert } from 'antd'
import { useTranslation } from '../hooks/useTranslation'
import { useNotification } from '../hooks/useNotification'
import ThemeToggle from '../components/common/ThemeToggle'
import LanguageSwitcher from '../components/common/LanguageSwitcher'
import RoleGuard from '../components/common/RoleGuard'
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

  return (
    <div style={{ padding: '24px' }}>
      {contextHolder}
      <Title level={2}>🚀 Enhanced Features Demo</Title>
      <Paragraph>
        This page demonstrates all the new features added to the React TypeScript starter.
      </Paragraph>

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
                <Button 
                  type="primary" 
                  onClick={() => handleNotificationDemo('success')}
                >
                  Success
                </Button>
                <Button 
                  danger 
                  onClick={() => handleNotificationDemo('error')}
                >
                  Error
                </Button>
                <Button 
                  style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
                  onClick={() => handleNotificationDemo('warning')}
                >
                  Warning
                </Button>
                <Button 
                  onClick={() => handleNotificationDemo('info')}
                >
                  Info
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>

        {/* Role-based Access Control */}
        <Col xs={24} md={12}>
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
        <Col xs={24} md={12}>
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

        {/* PWA Support */}
        <Col xs={24} md={12}>
          <Card title="📱 Progressive Web App (PWA)" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>PWA features enabled:</Text>
              <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                <li>Installable app experience</li>
                <li>Offline functionality</li>
                <li>Service worker caching</li>
                <li>App-like navigation</li>
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
    </div>
  )
}
