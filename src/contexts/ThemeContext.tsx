import React, { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { ThemeContext, type Theme, type ThemeContextType } from './theme-context'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      return savedTheme
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    return 'light'
  })

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', theme)
    
    // Update document class for global CSS
    document.documentElement.className = theme
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#141414' : '#ffffff')
    }

    // Update body data attribute for additional styling
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setThemeState(e.matches ? 'dark' : 'light')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light')
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: '#1677ff',
            colorSuccess: '#52c41a',
            colorWarning: '#faad14',
            colorError: '#f5222d',
            colorInfo: '#1677ff',
            borderRadius: 6,
            wireframe: false,
            // Enhanced theme tokens
            colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#ffffff',
            colorBgElevated: theme === 'dark' ? '#262626' : '#ffffff',
            colorBgLayout: theme === 'dark' ? '#141414' : '#f5f5f5',
            colorBorder: theme === 'dark' ? '#434343' : '#d9d9d9',
            colorText: theme === 'dark' ? 'rgba(255, 255, 255, 0.88)' : 'rgba(0, 0, 0, 0.88)',
            colorTextSecondary: theme === 'dark' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
          },
          components: {
            Layout: {
              bodyBg: theme === 'dark' ? '#141414' : '#f5f5f5',
              headerBg: theme === 'dark' ? '#001529' : '#ffffff',
              siderBg: theme === 'dark' ? '#001529' : '#ffffff',
              triggerBg: theme === 'dark' ? '#262626' : '#ffffff',
            },
            Menu: {
              itemBg: 'transparent',
              itemSelectedBg: theme === 'dark' ? '#1677ff' : '#e6f4ff',
              itemHoverBg: theme === 'dark' ? '#262626' : '#f5f5f5',
            },
            Card: {
              colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#ffffff',
            },
            Button: {
              defaultBg: theme === 'dark' ? '#1f1f1f' : '#ffffff',
              defaultBorderColor: theme === 'dark' ? '#434343' : '#d9d9d9',
            },
            Input: {
              colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#ffffff',
            },
            Select: {
              colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#ffffff',
            },
            Table: {
              colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#ffffff',
              headerBg: theme === 'dark' ? '#262626' : '#fafafa',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
