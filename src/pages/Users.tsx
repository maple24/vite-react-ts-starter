import { useState } from 'react'
import { Row, Col, Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import UserList from '../components/UserList'
import UserForm from '../components/UserForm'
import type { User } from '../types'

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined)

  const handleCreate = () => {
    setEditingUser(undefined)
    setIsModalOpen(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingUser(undefined)
  }

  const handleSuccess = () => {
    handleModalClose()
  }

  return (
    <div style={{ padding: '1rem' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>User Management</h1>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleCreate}
            >
              Add User
            </Button>
          </div>
        </Col>
        
        <Col span={24}>
          <UserList onEdit={handleEdit} />
        </Col>
      </Row>

      <Modal
        title={editingUser ? 'Edit User' : 'Create User'}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        <UserForm
          user={editingUser}
          onSuccess={handleSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  )
}
