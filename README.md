# React TypeScript Starter

A modern, feature-rich React application built with TypeScript, Vite, and a carefully curated set of libraries for excellent developer experience and robust functionality.

## 🚀 Features

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
- 📱 **Responsive Design** - Mobile-first approach

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

### Routing
- **React Router Dom** - Client-side routing

### Validation
- **Zod** - Schema validation

### Development Tools
- **MSW** - API mocking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **React Error Boundary** - Error handling

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (LoadingSpinner, ErrorDisplay)
│   ├── UserForm/       # User form component
│   └── UserList/       # User list component
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── mocks/              # MSW mock handlers
├── pages/              # Page components
├── router/             # Router configuration
├── schemas/            # Zod validation schemas
├── services/           # API service layer
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
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

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

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

### User Management

- Create, read, update, and delete users
- Form validation with real-time feedback
- Optimistic updates with React Query
- Error handling and loading states

### Developer Experience

- Hot module replacement with Vite
- TypeScript integration
- ESLint and Prettier configuration
- Mock API with MSW

### UI/UX

- Responsive design with Ant Design
- Professional layout with sidebar navigation
- Loading states and error boundaries
- Toast notifications for user feedback

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
