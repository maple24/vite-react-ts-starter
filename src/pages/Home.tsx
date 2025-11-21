import { Typography, Space } from 'antd'

const { Title, Paragraph } = Typography

export default function Home() {
  return (
    <div style={{ 
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh'
    }}>
      <Space direction="vertical" size="large" align="center">
        <Title level={1}>Hello World! 👋</Title>
        <Paragraph style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px' }}>
          Welcome to Vite React TypeScript Starter
        </Paragraph>
        <Paragraph style={{ textAlign: 'center', color: '#666' }}>
          A modern React TypeScript starter template built with Vite, featuring routing, state management, and more.
        </Paragraph>
      </Space>
    </div>
  )
}
