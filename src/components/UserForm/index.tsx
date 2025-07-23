import { Form, Input, Select, Button, Card, message } from 'antd'
import { useCreateUser, useUpdateUser } from '../../hooks/useUsers'
import { createUserSchema } from '../../schemas/user'
import type { User } from '../../types'

interface UserFormProps {
  user?: User
  onSuccess?: () => void
  onCancel?: () => void
}

export default function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const [form] = Form.useForm()
  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()

  const isEditing = !!user
  const isLoading = createUserMutation.isPending || updateUserMutation.isPending

  const handleSubmit = async (values: unknown) => {
    try {
      const validatedData = createUserSchema.parse(values)
      
      if (isEditing) {
        await updateUserMutation.mutateAsync({ 
          id: user.id, 
          ...validatedData 
        })
        message.success('User updated successfully!')
      } else {
        await createUserMutation.mutateAsync(validatedData)
        message.success('User created successfully!')
        form.resetFields()
      }
      
      onSuccess?.()
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        message.error('An error occurred')
      }
    }
  }

  return (
    <Card title={isEditing ? 'Edit User' : 'Create User'}>
      <Form
        form={form}
        layout="vertical"
        initialValues={user}
        onFinish={handleSubmit}
        disabled={isLoading}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Name is required' },
            { max: 100, message: 'Name is too long' },
          ]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Invalid email address' },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          initialValue="user"
        >
          <Select placeholder="Select user role">
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="moderator">Moderator</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ marginRight: 8 }}
          >
            {isEditing ? 'Update' : 'Create'} User
          </Button>
          {onCancel && (
            <Button onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  )
}
