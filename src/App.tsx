import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Typography, Avatar, Dropdown, Space, Button } from 'antd'
import { HomeOutlined, UserOutlined, InfoCircleOutlined, LogoutOutlined, ExperimentOutlined, DashboardOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useAuth } from './hooks/useAuth'
import { useTranslation } from './hooks/useTranslation'
import { useTheme } from './hooks/useTheme'
import ThemeToggle from './components/common/ThemeToggle'
import LanguageSwitcher from './components/common/LanguageSwitcher'
import BreadcrumbNav from './components/common/Breadcrumb'
import type { MenuProps } from 'antd'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: t('navigation.home'),
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('navigation.dashboard'),
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: t('navigation.users'),
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: t('navigation.about'),
    },
    {
      key: '/features',
      icon: <ExperimentOutlined />,
      label: t('navigation.features'),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: t('navigation.settings'),
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={250}
        theme={theme}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth={window.innerWidth < 768 ? 0 : 80}
        style={{
          boxShadow: '2px 0 8px var(--shadow)',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ 
          padding: collapsed ? '1rem 0.5rem' : '1rem', 
          borderBottom: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ cursor: 'pointer' }}>
              <Avatar 
                size={collapsed ? 48 : 64} 
                src={user?.avatar}
                icon={<UserOutlined />} 
                style={{ marginBottom: collapsed ? 0 : '0.5rem' }} 
              />
              {!collapsed && (
                <>
                  <Title level={4} style={{ margin: 0 }}>
                    {user?.name || 'Admin Panel'}
                  </Title>
                  {user?.role && (
                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Typography.Text>
                  )}
                </>
              )}
            </div>
          </Dropdown>
        </div>
        
        <Menu 
          mode="inline" 
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ 
            border: 'none',
            marginTop: '1rem'
          }}
        />
      </Sider>
      
      <Layout style={{ marginLeft: collapsed ? (window.innerWidth < 768 ? 0 : 80) : 250, transition: 'margin-left 0.2s' }}>
        <Header style={{ 
          padding: '0 2rem',
          boxShadow: '0 2px 8px var(--shadow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}>
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Title level={3} style={{ margin: 0, display: window.innerWidth < 768 ? 'none' : 'block' }}>
              React TypeScript Starter
            </Title>
          </Space>
          <Space>
            <LanguageSwitcher size="small" />
            <ThemeToggle size="small" />
          </Space>
        </Header>
        
        <Content style={{ 
          margin: '0 1rem',
          overflow: 'initial'
        }}>
          <BreadcrumbNav />
          <div style={{
            padding: '1rem',
            minHeight: 360,
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
