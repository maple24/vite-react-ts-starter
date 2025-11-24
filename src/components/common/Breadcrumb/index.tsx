import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'

const breadcrumbNameMap: Record<string, string> = {
  '/': 'Home',
  '/users': 'Users',
  '/profile': 'Profile',
  '/about': 'About',
  '/features': 'Features',
  '/dashboard': 'Dashboard',
  '/settings': 'Settings',
}

export default function BreadcrumbNav() {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter(i => i)

  const breadcrumbItems = [
    {
      title: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      const isLast = index === pathSnippets.length - 1
      
      return {
        title: isLast ? (
          <span>{breadcrumbNameMap[url] || pathSnippets[index]}</span>
        ) : (
          <Link to={url}>{breadcrumbNameMap[url] || pathSnippets[index]}</Link>
        ),
      }
    }),
  ]

  // Don't show breadcrumb on home page
  if (location.pathname === '/') {
    return null
  }

  return (
    <Breadcrumb
      items={breadcrumbItems}
      style={{ margin: '16px 0' }}
    />
  )
}
