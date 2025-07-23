import { Card, Typography, List, Space, Tag } from 'antd'
import { 
  ReadOutlined, 
  BuildOutlined, 
  CodeOutlined, 
  DatabaseOutlined 
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

const technologies = [
  { name: 'React 19', icon: <ReadOutlined />, color: 'blue' },
  { name: 'TypeScript', icon: <CodeOutlined />, color: 'blue' },
  { name: 'Vite', icon: <BuildOutlined />, color: 'green' },
  { name: 'Ant Design', icon: <BuildOutlined />, color: 'volcano' },
  { name: 'React Query', icon: <DatabaseOutlined />, color: 'purple' },
  { name: 'React Router', icon: <ReadOutlined />, color: 'orange' },
  { name: 'Zod', icon: <CodeOutlined />, color: 'geekblue' },
  { name: 'MSW', icon: <DatabaseOutlined />, color: 'cyan' },
  { name: 'ESLint', icon: <CodeOutlined />, color: 'red' },
  { name: 'Prettier', icon: <CodeOutlined />, color: 'magenta' },
]

export default function About() {
  return (
    <div style={{ padding: '1rem' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Typography>
            <Title level={2}>About This Project</Title>
            <Paragraph>
              This is a modern React application built with TypeScript and a carefully curated set of 
              libraries to provide an excellent developer experience and robust functionality.
            </Paragraph>
            <Paragraph>
              The application demonstrates best practices for state management, API integration, 
              form handling, and error management in a React ecosystem.
            </Paragraph>
          </Typography>
        </Card>

        <Card title="Technology Stack">
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={technologies}
            renderItem={(tech) => (
              <List.Item>
                <Space>
                  {tech.icon}
                  <Tag color={tech.color}>{tech.name}</Tag>
                </Space>
              </List.Item>
            )}
          />
        </Card>

        <Card title="Features">
          <List
            dataSource={[
              'User CRUD operations with React Query',
              'Form validation with Zod schemas',
              'Responsive design with Ant Design',
              'API mocking with MSW',
              'Error boundaries for better UX',
              'TypeScript for type safety',
              'ESLint and Prettier for code quality',
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Card>
      </Space>
    </div>
  )
}
