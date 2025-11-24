import { Card, Form, Input, Switch, Button, Select, Divider, Space, Typography, Row, Col, Avatar, Upload } from 'antd'
import { UserOutlined, BellOutlined, LockOutlined, GlobalOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { useTranslation } from '../hooks/useTranslation'
import { toast } from '../components/common/Toast'

const { Title, Text } = Typography

interface ProfileFormValues {
  name: string
  email: string
  bio?: string
}

interface NotificationFormValues {
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyDigest: boolean
  newMessages: boolean
  updates: boolean
}

interface PasswordFormValues {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function Settings() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { currentLanguage, changeLanguage } = useTranslation()
  const [form] = Form.useForm()

  const handleSaveProfile = (values: ProfileFormValues) => {
    console.log('Profile values:', values)
    toast.success('Profile updated successfully')
  }

  const handleSaveNotifications = (values: NotificationFormValues) => {
    console.log('Notification values:', values)
    toast.success('Notification settings updated')
  }

  const handleSavePassword = (values: PasswordFormValues) => {
    console.log('Password values:', values)
    toast.success('Password changed successfully')
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: '1.5rem' }}>Settings</Title>

      <Row gutter={[16, 16]}>
        {/* Profile Settings */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <UserOutlined />
                <span>Profile Settings</span>
              </Space>
            }
            bordered={false}
            style={{ height: '100%' }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSaveProfile}
              initialValues={{
                name: user?.name,
                email: user?.email,
                bio: 'Software developer passionate about creating great user experiences.',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <Avatar size={100} src={user?.avatar} icon={<UserOutlined />} />
                <div style={{ marginTop: '1rem' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />}>Change Avatar</Button>
                  </Upload>
                </div>
              </div>

              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item label="Bio" name="bio">
                <Input.TextArea rows={3} placeholder="Tell us about yourself" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} block>
                  Save Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Notification Settings */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <BellOutlined />
                <span>Notification Settings</span>
              </Space>
            }
            bordered={false}
            style={{ height: '100%' }}
          >
            <Form
              layout="vertical"
              onFinish={handleSaveNotifications}
              initialValues={{
                emailNotifications: true,
                pushNotifications: false,
                weeklyDigest: true,
                newMessages: true,
                updates: false,
              }}
            >
              <Form.Item label="Email Notifications" name="emailNotifications" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Text type="secondary" style={{ display: 'block', marginTop: '-1rem', marginBottom: '1rem' }}>
                Receive email notifications for important updates
              </Text>

              <Form.Item label="Push Notifications" name="pushNotifications" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Text type="secondary" style={{ display: 'block', marginTop: '-1rem', marginBottom: '1rem' }}>
                Receive push notifications on your device
              </Text>

              <Form.Item label="Weekly Digest" name="weeklyDigest" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Text type="secondary" style={{ display: 'block', marginTop: '-1rem', marginBottom: '1rem' }}>
                Get a weekly summary of your activity
              </Text>

              <Form.Item label="New Messages" name="newMessages" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Text type="secondary" style={{ display: 'block', marginTop: '-1rem', marginBottom: '1rem' }}>
                Notify me when I receive new messages
              </Text>

              <Form.Item label="Product Updates" name="updates" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Text type="secondary" style={{ display: 'block', marginTop: '-1rem', marginBottom: '1rem' }}>
                Stay informed about new features and updates
              </Text>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} block>
                  Save Notifications
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Appearance & Language */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <GlobalOutlined />
                <span>Appearance & Language</span>
              </Space>
            }
            bordered={false}
          >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>Theme</Text>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text type="secondary">Current theme: {theme === 'dark' ? 'Dark' : 'Light'}</Text>
                  <Switch checked={theme === 'dark'} onChange={toggleTheme} />
                </div>
              </div>

              <Divider style={{ margin: 0 }} />

              <div>
                <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>Language</Text>
                <Select
                  value={currentLanguage}
                  onChange={changeLanguage}
                  style={{ width: '100%' }}
                  options={[
                    { label: 'English', value: 'en' },
                    { label: '中文', value: 'zh' },
                  ]}
                />
              </div>
            </Space>
          </Card>
        </Col>

        {/* Security Settings */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <LockOutlined />
                <span>Security Settings</span>
              </Space>
            }
            bordered={false}
          >
            <Form
              layout="vertical"
              onFinish={handleSavePassword}
            >
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: 'Please enter your current password' }]}
              >
                <Input.Password placeholder="Enter current password" />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: 'Please enter a new password' },
                  { min: 6, message: 'Password must be at least 6 characters' }
                ]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>

              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Passwords do not match'))
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} block>
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
