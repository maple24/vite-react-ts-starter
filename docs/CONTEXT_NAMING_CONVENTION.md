# Context Naming Convention

## Overview
The `src/contexts` folder follows a consistent naming pattern to separate type definitions from provider implementations, which is required for Vite's Fast Refresh (HMR) to work properly.

## File Structure

### Pattern
Each context consists of **two files**:

1. **`{name}-context.ts`** (lowercase with hyphen)
   - Contains TypeScript type definitions and interfaces
   - Exports the `createContext` call
   - Does NOT contain React components
   
2. **`{Name}Context.tsx`** (PascalCase)
   - Contains the Provider component implementation
   - Imports types from the corresponding `-context.ts` file
   - Exports the Provider component

### Why This Pattern?
Vite's Fast Refresh requires that:
- Files that export React components should ONLY export components
- Context definitions (createContext calls) should be in separate files from providers

Attempting to combine both in a single file will result in the error:
```
Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.
```

## Current Contexts

### 1. Authentication Context
- **`auth-context.ts`**
  - Exports: `AuthContextType` interface, `AuthContext`
  - Contains: User authentication type definitions
  
- **`AuthContext.tsx`**
  - Exports: `AuthProvider` component
  - Imports: `AuthContext` from `./auth-context`
  - Contains: Authentication state management logic

### 2. Theme Context
- **`theme-context.ts`**
  - Exports: `Theme` type, `ThemeContextType` interface, `ThemeContext`
  - Contains: Theme-related type definitions
  
- **`ThemeContext.tsx`**
  - Exports: `ThemeProvider` component
  - Imports: `ThemeContext`, `Theme`, `ThemeContextType` from `./theme-context`
  - Contains: Theme state management and Ant Design ConfigProvider integration

### 3. Toast Context
- **`toast-context.ts`**
  - Exports: `ToastContextType` interface, `ToastContext`
  - Contains: Toast context type definitions (placeholder)
  
- **`ToastContext.tsx`**
  - Exports: `ToastProvider` component
  - Imports: `ToastContext` from `./toast-context`
  - Contains: Toast service initialization with Ant Design message API

## Usage in Hooks

Hooks should import from the `-context.ts` files to access the context and types:

```typescript
// src/hooks/useAuth.ts
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth-context'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

## Usage in main.tsx

Import Provider components from the `Context.tsx` files:

```typescript
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ToastProvider } from './contexts/ToastContext'
```

## Adding New Contexts

When adding a new context, follow these steps:

1. **Create the context definition file** (`{name}-context.ts`):
   ```typescript
   import { createContext } from 'react'
   
   export interface YourContextType {
     // Your context type definition
   }
   
   export const YourContext = createContext<YourContextType | undefined>(undefined)
   ```

2. **Create the provider file** (`{Name}Context.tsx`):
   ```typescript
   import React, { useState } from 'react'
   import type { ReactNode } from 'react'
   import { YourContext, type YourContextType } from './your-context'
   
   interface YourProviderProps {
     children: ReactNode
   }
   
   export const YourProvider: React.FC<YourProviderProps> = ({ children }) => {
     // Your provider logic
     
     const value: YourContextType = {
       // Your context value
     }
     
     return (
       <YourContext.Provider value={value}>
         {children}
       </YourContext.Provider>
     )
   }
   ```

3. **Create the hook** (`src/hooks/useYour.ts`):
   ```typescript
   import { useContext } from 'react'
   import { YourContext } from '../contexts/your-context'
   
   export const useYour = () => {
     const context = useContext(YourContext)
     if (context === undefined) {
       throw new Error('useYour must be used within a YourProvider')
     }
     return context
   }
   ```

## Summary

✅ **DO:**
- Separate context definitions (`.ts`) from provider implementations (`.tsx`)
- Use lowercase-with-hyphens for context definition files
- Use PascalCase for provider component files
- Import types from `-context.ts` files in hooks
- Import Provider components from `Context.tsx` files in main.tsx

❌ **DON'T:**
- Combine context definitions and provider components in a single file
- Export non-component code from provider files (breaks Fast Refresh)
- Use inconsistent naming patterns
