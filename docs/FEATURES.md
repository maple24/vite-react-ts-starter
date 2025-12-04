# Enhanced Features Guide

This document provides a comprehensive guide to all the enhanced features added to the React TypeScript starter.

## 🔐 Authentication & Security Enhancements

### JWT Token Management

Enhanced token management with secure utilities:

```typescript
import { tokenManager } from '../utils/tokenManager'

// Basic operations
const token = tokenManager.getToken()
tokenManager.setToken('your-jwt-token')
tokenManager.removeToken()

// Advanced operations
const isExpired = await tokenManager.isTokenExpired(token)
const payload = await tokenManager.decodeToken(token)
tokenManager.clearTokens() // Clear all auth tokens
```

### Role-based Access Control (RBAC)

Protect components and routes based on user roles:

```tsx
import RoleGuard from '../components/common/RoleGuard'
import { hasPermission, isAdmin } from '../utils/rbac'

// Component protection
<RoleGuard allowedRoles={['admin', 'moderator']}>
  <AdminPanel />
</RoleGuard>

// Programmatic checks
const canManageUsers = hasPermission(userRole, 'users', 'manage')
const isUserAdmin = isAdmin(userRole)
```

**Available Roles:**
- `admin` - Full access
- `moderator` - Limited management access  
- `user` - Basic user access
- `guest` - Read-only access

## 🎨 UI/UX Enhancements

### Dark/Light Theme Toggle

Automatic theme switching with system preference detection:

```tsx
import { useTheme } from '../hooks/useTheme'
import ThemeToggle from '../components/common/ThemeToggle'

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme()
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <ThemeToggle size="small" />
    </div>
  )
}
```

**Features:**
- Automatic system preference detection
- Persistent theme storage
- Antd theme integration with comprehensive component overrides
- Meta theme-color updates for mobile
- CSS variables for consistent theming across all components
- Smooth transitions between theme changes
- Theme-aware scrollbar styling

### Notifications/Toast System

Elegant notification system with Antd integration:

```tsx
import { useNotification } from '../hooks/useNotification'

function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo, contextHolder } = useNotification()
  
  const handleSuccess = () => {
    showSuccess({
      message: 'Success!',
      description: 'Operation completed successfully',
      duration: 4.5,
      placement: 'topRight'
    })
  }
  
  return (
    <div>
      {contextHolder}
      <button onClick={handleSuccess}>Show Success</button>
    </div>
  )
}
```

## 🌍 Performance & Developer Experience

### Internationalization (i18n)

Multi-language support with react-i18next:

```tsx
import { useTranslation } from '../hooks/useTranslation'
import LanguageSwitcher from '../components/common/LanguageSwitcher'

function MyComponent() {
  const { t, changeLanguage, currentLanguage } = useTranslation()
  
  return (
    <div>
      <h1>{t('navigation.home')}</h1>
      <p>{t('auth.loginSuccess')}</p>
      <LanguageSwitcher />
    </div>
  )
}
```

**Supported Languages:**
- English (en) - Default
- Chinese (zh)

**Adding New Languages:**
1. Add translations to `src/i18n/index.ts`
2. Update the `languages` array in `LanguageSwitcher`
3. Configure language detection in i18n config

### PWA (Progressive Web App) Support

Full PWA configuration with offline support:

**Features:**
- App installation capability
- Offline functionality with service worker
- Automatic updates
- Cache strategies for API calls
- App-like navigation

**Installation:**
- Users can install the app from their browser
- Works on desktop and mobile devices
- Provides native app-like experience

## 📁 File Structure

```
src/
├── components/common/
│   ├── LanguageSwitcher/     # Language selection component
│   ├── RoleGuard/            # Role-based access control
│   └── ThemeToggle/          # Dark/light theme switcher
├── contexts/
│   ├── ThemeContext.tsx      # Theme provider
│   └── theme-context.ts      # Theme context types
├── hooks/
│   ├── useNotification.ts    # Notification utilities
│   ├── useTheme.ts          # Theme management
│   └── useTranslation.ts    # i18n utilities
├── i18n/
│   └── index.ts             # Internationalization config
├── pages/
│   └── Features.tsx         # Feature demonstration page
└── utils/
    ├── rbac.ts              # Role-based access control
    └── tokenManager.ts      # JWT token management
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   ```

3. **Login with demo credentials:**
   - Admin: `admin@example.com` / `password123`
   - User: `user@example.com` / `password123`

4. **Explore features:**
   - Visit `/features` to see all enhancements in action
   - Toggle between light/dark themes
   - Switch languages
   - Test role-based access control
   - Try notifications

## 🔧 Configuration

### Environment Variables

Add to your `.env` file:

```env
VITE_JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
VITE_APP_NAME=Your App Name
```

### Customize Themes

Modify theme tokens in `src/contexts/ThemeContext.tsx`:

```typescript
token: {
  colorPrimary: '#1677ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#f5222d',
  borderRadius: 6,
}
```

### Add New Roles

Update `src/utils/rbac.ts`:

```typescript
export const ROLE_PERMISSIONS: RolePermissions = {
  newRole: [
    { resource: 'dashboard', action: 'view' },
    { resource: 'reports', action: 'read' },
  ],
}
```

## 📱 PWA Setup

1. **Generate icons:**
   - Use tools like https://realfavicongenerator.net/
   - Place icons in the `public/` directory
   - Update paths in `vite.config.ts`

2. **Test installation:**
   - Open dev tools → Application → Manifest
   - Check for installability
   - Test offline functionality

## 🎯 Best Practices

1. **Authentication:**
   - Always check token expiration
   - Use refresh tokens for better UX
   - Clear sensitive data on logout

2. **RBAC:**
   - Use RoleGuard for component protection
   - Check permissions programmatically
   - Provide meaningful fallback content

3. **Theming:**
   - Test both light and dark modes
   - Ensure good contrast ratios
   - Use semantic color tokens

4. **i18n:**
   - Keep translation keys organized
   - Use namespaces for large apps
   - Test right-to-left languages if needed

5. **Notifications:**
   - Don't overuse notifications
   - Provide clear, actionable messages
   - Use appropriate notification types

## 🔍 Troubleshooting

**Theme not persisting:**
- Check localStorage permissions
- Verify ThemeProvider is wrapping your app

**Dark mode not reflecting on all components:**
- Ensure CSS variables are properly defined in `src/index.css`
- Check that components use theme-aware styling with CSS variables
- Verify Antd ConfigProvider includes all necessary component theme overrides
- Make sure the ThemeProvider is wrapping the entire app

**Translations not loading:**
- Ensure i18n is imported in main.tsx
- Check browser console for loading errors

**PWA not installing:**
- Verify all required icons exist
- Check manifest.json in network tab
- Test HTTPS requirement (use dev server)

**Role protection not working:**
- Verify AuthProvider is properly configured
- Check user role values match RBAC definitions
