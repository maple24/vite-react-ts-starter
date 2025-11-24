import { Card, Row, Col, Statistic, Space, Typography, Table, Tag } from 'antd'
import { UserOutlined, TeamOutlined, RiseOutlined, FileTextOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useUsers } from '../hooks/useUsers'

const { Title, Text } = Typography

// Mock data for charts
const userGrowthData = [
  { month: 'Jan', users: 400 },
  { month: 'Feb', users: 600 },
  { month: 'Mar', users: 800 },
  { month: 'Apr', users: 1000 },
  { month: 'May', users: 1200 },
  { month: 'Jun', users: 1400 },
]

const roleDistributionData = [
  { name: 'Admin', value: 25, color: '#ff4d4f' },
  { name: 'User', value: 60, color: '#1677ff' },
  { name: 'Guest', value: 15, color: '#52c41a' },
]

const activityData = [
  { day: 'Mon', logins: 120, signups: 40 },
  { day: 'Tue', logins: 150, signups: 50 },
  { day: 'Wed', logins: 100, signups: 30 },
  { day: 'Thu', logins: 180, signups: 60 },
  { day: 'Fri', logins: 200, signups: 70 },
  { day: 'Sat', logins: 90, signups: 20 },
  { day: 'Sun', logins: 80, signups: 15 },
]

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Logged in', time: '5 min ago', type: 'info' },
  { id: 2, user: 'Jane Smith', action: 'Created account', time: '10 min ago', type: 'success' },
  { id: 3, user: 'Bob Wilson', action: 'Updated profile', time: '15 min ago', type: 'warning' },
  { id: 4, user: 'Alice Brown', action: 'Logged out', time: '20 min ago', type: 'default' },
  { id: 5, user: 'Charlie Davis', action: 'Changed password', time: '25 min ago', type: 'warning' },
]

export default function Dashboard() {
  const { data: users } = useUsers()

  const stats = [
    {
      title: 'Total Users',
      value: users?.length || 0,
      icon: <UserOutlined style={{ fontSize: '24px', color: '#1677ff' }} />,
      trend: 12,
      color: '#1677ff'
    },
    {
      title: 'Active Users',
      value: Math.floor((users?.length || 0) * 0.7),
      icon: <TeamOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      trend: 8,
      color: '#52c41a'
    },
    {
      title: 'Growth Rate',
      value: '24%',
      icon: <RiseOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
      trend: 5,
      color: '#faad14'
    },
    {
      title: 'Total Posts',
      value: 1234,
      icon: <FileTextOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
      trend: -3,
      color: '#722ed1'
    },
  ]

  const activityColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text: string) => <Text type="secondary">{text}</Text>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'success' ? 'green' : type === 'warning' ? 'orange' : type === 'info' ? 'blue' : 'default'}>
          {type.toUpperCase()}
        </Tag>
      )
    },
  ]

  return (
    <div style={{ padding: '1.5rem' }}>
      <Title level={2} style={{ marginBottom: '1.5rem' }}>Dashboard</Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card bordered={false} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {stat.icon}
                  <Statistic
                    value={stat.trend}
                    precision={0}
                    valueStyle={{ 
                      fontSize: '14px',
                      color: stat.trend > 0 ? '#52c41a' : '#ff4d4f'
                    }}
                    prefix={stat.trend > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    suffix="%"
                  />
                </div>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  valueStyle={{ color: stat.color, fontSize: '24px', fontWeight: 600 }}
                />
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        {/* User Growth Chart */}
        <Col xs={24} lg={12}>
          <Card title="User Growth" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#1677ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Role Distribution Chart */}
        <Col xs={24} lg={12}>
          <Card title="Role Distribution" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roleDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Activity Chart */}
        <Col xs={24}>
          <Card title="Weekly Activity" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="logins" fill="#1677ff" />
                <Bar dataKey="signups" fill="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity Table */}
      <Card title="Recent Activity" bordered={false}>
        <Table
          columns={activityColumns}
          dataSource={recentActivities}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  )
}
