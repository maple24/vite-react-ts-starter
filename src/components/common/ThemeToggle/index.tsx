import { Button } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '../../../hooks/useTheme'

interface ThemeToggleProps {
  size?: 'small' | 'middle' | 'large'
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text'
}

export default function ThemeToggle({ size = 'middle', type = 'text' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      type={type}
      size={size}
      icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </Button>
  )
}
