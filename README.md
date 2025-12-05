# React TypeScript Starter

A modern, feature-rich React application built with TypeScript, Vite, and a carefully curated set of libraries for excellent developer experience and robust functionality.

## 🚀 Features

### Core Features
- ⚡ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern features
- 🔷 **TypeScript** - Type safety and better developer experience
- 🎨 **Ant Design** - Professional UI component library
- 🔄 **React Query** - Powerful data fetching and state management
- 🧭 **React Router** - Declarative routing for React
- 📝 **Zod** - TypeScript-first schema validation
- 🎭 **MSW** - API mocking for development and testing
- 🚨 **Error Boundaries** - Graceful error handling
- 🔧 **ESLint & Prettier** - Code quality and formatting
- 📱 **Responsive Design** - Mobile-first approach with collapsible sidebar

### 🔥 Enhanced Features

#### Authentication & Security
- 🔐 **JWT Token Management** - Secure token handling with expiration checks
- 🛡️ **Role-based Access Control (RBAC)** - Component and route protection
- 🔑 **Password Management** - Secure password change with validation

#### UI & UX
- 🌙 **Dark/Light Theme Toggle** - System preference aware theming
- 🔔 **Toast Notifications** - Global notification system with multiple types
- 🌍 **Internationalization (i18n)** - Multi-language support (EN, ZH)
- 💀 **Skeleton Loaders** - Better loading states with skeleton screens
- 📭 **Empty States** - Informative empty state components
- 🍞 **Breadcrumb Navigation** - Automatic breadcrumb generation
- 📱 **Mobile Responsive** - Collapsible sidebar, touch-friendly interface

#### Data Management
- 📊 **Dashboard** - Statistics cards with charts (recharts integration)
- 📤 **File Upload** - Drag-and-drop file upload with preview and validation
- 📋 **Enhanced Data Table** - Export to CSV, bulk actions, column visibility, advanced filtering
- 🔍 **Search & Filter** - Real-time search with role-based filtering
- ⚙️ **Settings Page** - User preferences, notifications, appearance, and security

#### Developer Experience
- 📱 **PWA Support** - Progressive Web App with offline capabilities
- 🎯 **TypeScript Strict Mode** - Full type safety across the application
- 🎨 **Component Library** - Reusable, well-documented components

> 📖 **[View Complete Feature Documentation →](./FEATURES.md)**

## 🛠️ Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### State Management & Data Fetching
- **@tanstack/react-query** - Server state management
- **@tanstack/react-query-devtools** - DevTools for React Query

### UI & Styling
- **Ant Design** - Component library
- **@ant-design/icons** - Icon library
- **recharts** - Chart library for data visualization

### Routing
- **React Router Dom** - Client-side routing

### Validation
- **Zod** - Schema validation

### File Management
- **react-dropzone** - File upload with drag-and-drop
- **papaparse** - CSV parsing and export

### Utilities
- **date-fns** - Modern date utility library

### Development Tools
- **MSW** - API mocking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **React Error Boundary** - Error handling

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components
│   │   ├── Breadcrumb/ # Breadcrumb navigation
│   │   ├── EmptyState/ # Empty state component
│   │   ├── ErrorBoundary/ # Error boundary wrapper
│   │   ├── ErrorDisplay/ # Error display component
│   │   ├── ErrorFallback/ # Error fallback UI
│   │   ├── LanguageSwitcher/ # Language selector
│   │   ├── LoadingSpinner/ # Loading indicator
│   │   ├── ProtectedRoute/ # Auth route guard
│   │   ├── RoleGuard/  # RBAC component guard
│   │   ├── Skeleton/   # Skeleton loading states
│   │   ├── ThemeToggle/ # Theme switcher
│   │   ├── Toast/      # Toast notification service
│   │   └── ToastProvider/ # Toast context provider
│   ├── FileUpload/     # File upload component
│   ├── UserForm/       # User form component
│   └── UserList/       # Enhanced user list with table
├── constants/          # Application constants
├── contexts/           # React contexts (Auth, Theme)
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useNotification.ts # Notification hook
│   ├── useTheme.ts     # Theme hook
│   ├── useTranslation.ts # i18n hook
│   └── useUsers.ts     # User data hook
├── i18n/               # Internationalization setup
├── mocks/              # MSW mock handlers
├── pages/              # Page components
│   ├── About.tsx       # About page
│   ├── Dashboard.tsx   # Dashboard with charts
│   ├── Features.tsx    # Feature demo page
│   ├── Home.tsx        # Home page
│   ├── Login.tsx       # Login page
│   ├── Profile.tsx     # User profile page
│   ├── Settings.tsx    # Settings page
│   └── Users.tsx       # User management page
├── router/             # Router configuration
├── schemas/            # Zod validation schemas
├── services/           # API service layer
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
    ├── index.ts        # General utilities
    ├── rbac.ts         # Role-based access control
    └── tokenManager.ts # JWT token management
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vite-react-ts-starter
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and visit `http://localhost:5173`

## 📜 Available Scripts

- `pnpm dev` - Start development server with HMR
- `pnpm build` - Build for production with optimizations
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint to check code quality

## 🚀 Deployment

### Build for Production

**Standard build**:
```bash
pnpm build
```

**Preview locally**:
```bash
pnpm preview
```

### Docker Deployment

**Build image**:
```bash
docker build -t vite-react-app .
```

**Run container**:
```bash
docker run -p 80:80 vite-react-app
```

**Docker Compose (development)**:
```bash
docker-compose -f docker-compose.dev.yml up
```

**Docker Compose (production)**:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

> 📖 **For detailed deployment options and configurations, see:**
> - [Docker Documentation →](./docs/DOCKER.md)
> - [Backend Integration Guide →](./docs/BACKEND_INTEGRATION.md)

## 💡 Usage Examples

### Using Toast Notifications

```typescript
import { toast } from '@/components/common/Toast'

// Show different types of notifications
toast.success('User created successfully')
toast.error('Failed to delete user')
toast.warning('Please save your changes')
toast.info('New feature available')
```

### File Upload Component

```typescript
import FileUpload from '@/components/FileUpload'

<FileUpload
  maxSize={10}           // 10MB max file size
  maxFiles={5}           // Maximum 5 files
  multiple={true}        // Allow multiple files
  accept="image/*"       // Accept only images
  onUpload={handleUpload}
  onRemove={handleRemove}
/>
```

### Protected Routes with RBAC

```typescript
import RoleGuard from '@/components/common/RoleGuard'

// Protect content by role
<RoleGuard allowedRoles={['admin', 'moderator']}>
  <AdminPanel />
</RoleGuard>
```

### Skeleton Loading States

```typescript
import { Skeleton, TableSkeleton } from '@/components/common/Skeleton'

// Basic skeleton
<Skeleton loading={isLoading} rows={3}>
  <YourContent />
</Skeleton>

// Table skeleton
<TableSkeleton rows={5} />
```

## 🏗️ Architecture

### Component Structure

The application follows a modular component architecture:

- **Pages**: Top-level route components
- **Components**: Reusable UI components organized by feature
- **Common Components**: Shared utilities like LoadingSpinner and ErrorDisplay

### State Management

- **React Query** handles server state, caching, and synchronization
- **Local state** managed with React hooks for UI state

### API Layer

- **Service layer** abstracts API calls
- **MSW** provides realistic API mocking for development
- **Error handling** with custom ApiError class

### Validation

- **Zod schemas** ensure type safety and runtime validation
- **Form validation** integrated with Ant Design forms

## 🎯 Key Features

### Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Welcome landing page |
| `/dashboard` | Dashboard | Statistics, charts, and analytics overview |
| `/users` | Users | User management with enhanced data table |
| `/profile` | Profile | User profile information and avatar |
| `/settings` | Settings | User preferences, notifications, security |
| `/about` | About | About page |
| `/features` | Features | Interactive demo of all features |
| `/login` | Login | Authentication page |

### Dashboard
- **Statistics Cards** - Key metrics with trend indicators
- **Charts** - Line, bar, and pie charts using recharts
- **Recent Activity** - Table showing recent user actions
- **Responsive Layout** - Adapts to all screen sizes

### User Management

- **Enhanced Data Table**:
  - Export to CSV functionality
  - Bulk delete operations
  - Column visibility toggle
  - Advanced search across name/email
  - Role-based filtering
  - Sortable columns
  - Pagination with configurable page size
- **CRUD Operations**: Create, read, update, and delete users
- **Form Validation**: Real-time validation with Zod schemas
- **Optimistic Updates**: Instant UI updates with React Query
- **Loading States**: Skeleton loaders for better UX
- **Empty States**: Informative messages when no data

### File Upload

- **Drag & Drop**: Intuitive file upload interface
- **Multiple Files**: Support for multiple file uploads
- **Validation**: File type and size validation
- **Preview**: Image preview with zoom capability
- **Progress**: Upload progress indicators
- **Actions**: Download and remove uploaded files

### Settings & Preferences

- **Profile Settings**: Edit name, email, bio, and avatar
- **Notification Settings**: Configure email, push, and digest notifications
- **Appearance**: Theme toggle (dark/light) and language selection
- **Security**: Change password with validation

### Developer Experience

- Hot module replacement with Vite
- TypeScript integration with strict mode
- ESLint and Prettier configuration
- Mock API with MSW for development
- React Query DevTools for debugging
- Component library with TypeScript types

### UI/UX

- Responsive design with Ant Design
- Professional layout with collapsible sidebar
- Breadcrumb navigation for better context
- Sticky header for persistent access
- Loading states with skeleton screens
- Empty states with actionable messages
- Toast notifications for user feedback
- Dark/light theme with smooth transitions
- Multi-language support (English, Chinese)

## 🔧 Configuration

### ESLint

The project uses a modern ESLint configuration with:
- TypeScript support
- React best practices
- Prettier integration

### TypeScript

Configured with strict mode and modern settings:
- Strict type checking
- Path mapping support
- Latest ECMAScript features

### Vite

Optimized build configuration:
- Fast development server
- Hot module replacement
- Production optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [Ant Design](https://ant.design/) - Enterprise-class UI design language
- [React Query](https://tanstack.com/query) - Powerful data synchronization for React
- [MSW](https://mswjs.io/) - Seamless API mocking library
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
