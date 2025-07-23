import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Typography, Avatar } from 'antd'
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <UserOutlined />,
      label: 'User Management',
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: 'About',
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={250}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ 
          padding: '1rem', 
          borderBottom: '1px solid #f0f0f0',
          textAlign: 'center'
        }}>
          <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '0.5rem' }} />
          <Title level={4} style={{ margin: 0 }}>Admin Panel</Title>
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
      
      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Title level={3} style={{ margin: 0 }}>
            React TypeScript Starter
          </Title>
        </Header>
        
        <Content style={{ 
          margin: '1rem',
          background: '#f5f5f5',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
