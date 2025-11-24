import { useState } from 'react'
import { Button, Card, Table, Tag, Space, Popconfirm, Input, Select, Checkbox, Dropdown } from 'antd'
import { DeleteOutlined, EditOutlined, DownloadOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useUsers, useDeleteUser } from '../../hooks/useUsers'
import { TableSkeleton } from '../common/Skeleton'
import EmptyState from '../common/EmptyState'
import ErrorDisplay from '../common/ErrorDisplay'
import { toast } from '../common/Toast'
import type { User } from '../../types'

interface UserListProps {
  onEdit?: (user: User) => void
}

export default function UserList({ onEdit }: UserListProps) {
  const { data: users, isLoading, error } = useUsers()
  const deleteUserMutation = useDeleteUser()
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [searchText, setSearchText] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['name', 'email', 'role', 'actions'])

  const handleDelete = (userId: number) => {
    deleteUserMutation.mutate(userId)
  }

  const handleBulkDelete = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning('Please select users to delete')
      return
    }
    
    // Simulate bulk delete
    selectedRowKeys.forEach((key) => {
      deleteUserMutation.mutate(Number(key))
    })
    setSelectedRowKeys([])
    toast.success(`${selectedRowKeys.length} user(s) deleted`)
  }

  const exportToCSV = () => {
    if (!users || users.length === 0) {
      toast.warning('No data to export')
      return
    }

    const csvData = users.map(user => ({
      Name: user.name,
      Email: user.email,
      Role: user.role || 'N/A',
      'Created At': user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'
    }))

    const headers = Object.keys(csvData[0])
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => 
        headers.map(header => `"${row[header as keyof typeof row]}"`).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('Data exported successfully')
  }

  const allColumns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => 
        record.name.toLowerCase().includes(String(value).toLowerCase()) ||
        record.email.toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Moderator', value: 'moderator' },
        { text: 'User', value: 'user' },
      ],
      filteredValue: roleFilter !== 'all' ? [roleFilter] : null,
      onFilter: (value, record) => record.role === value,
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : role === 'moderator' ? 'orange' : 'blue'}>
          {role?.toUpperCase() || 'USER'}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => {
        if (!a.createdAt || !b.createdAt) return 0
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      },
      render: (date: string) => date ? new Date(date).toLocaleDateString() : 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_: unknown, record: User) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit?.(record)}
          />
          <Popconfirm
            title="Delete user?"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              loading={deleteUserMutation.isPending}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const columns = allColumns.filter(col => visibleColumns.includes(col.key as string))

  const columnVisibilityMenu = {
    items: allColumns.map(col => ({
      key: col.key as string,
      label: (
        <Checkbox
          checked={visibleColumns.includes(col.key as string)}
          onChange={(e) => {
            if (e.target.checked) {
              setVisibleColumns([...visibleColumns, col.key as string])
            } else {
              setVisibleColumns(visibleColumns.filter(k => k !== col.key))
            }
          }}
        >
          {col.title as string}
        </Checkbox>
      ),
    })),
  }

  if (isLoading) {
    return (
      <Card>
        <TableSkeleton rows={5} />
      </Card>
    )
  }

  if (error) {
    return <ErrorDisplay error={error} title="Failed to load users" />
  }

  if (!users || users.length === 0) {
    return (
      <Card>
        <EmptyState
          title="No Users Found"
          description="Start by adding your first user"
        />
      </Card>
    )
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  const pagination: TablePaginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
  }

  return (
    <Card
      title="Users"
      extra={
        <Space>
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
            allowClear
          />
          <Select
            value={roleFilter}
            onChange={setRoleFilter}
            style={{ width: 120 }}
            options={[
              { label: 'All Roles', value: 'all' },
              { label: 'Admin', value: 'admin' },
              { label: 'Moderator', value: 'moderator' },
              { label: 'User', value: 'user' },
            ]}
          />
          <Dropdown menu={columnVisibilityMenu} trigger={['click']}>
            <Button icon={<SettingOutlined />}>Columns</Button>
          </Dropdown>
          <Button
            icon={<DownloadOutlined />}
            onClick={exportToCSV}
          >
            Export CSV
          </Button>
        </Space>
      }
    >
      {selectedRowKeys.length > 0 && (
        <Space style={{ marginBottom: 16 }}>
          <span>{selectedRowKeys.length} selected</span>
          <Popconfirm
            title="Delete selected users?"
            description={`Are you sure you want to delete ${selectedRowKeys.length} user(s)?`}
            onConfirm={handleBulkDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete Selected
            </Button>
          </Popconfirm>
        </Space>
      )}
      
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={pagination}
        scroll={{ x: 800 }}
      />
    </Card>
  )
}
