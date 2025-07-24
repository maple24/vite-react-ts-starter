/**
 * Environment configuration utility
 * Provides type-safe access to environment variables
 */

export const env = {
  // App configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Vite React TS Starter',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '0.0.0',
  
  // API configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
  
  // Feature flags
  ENABLE_DEV_TOOLS: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
  ENABLE_MSW: import.meta.env.VITE_ENABLE_MSW === 'true',
  
  // Other configurations
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const

// Type for environment configuration
export type EnvConfig = typeof env

// Validation function to ensure required environment variables are set
export const validateEnv = (): void => {
  const requiredVars = [
    'VITE_APP_NAME',
    'VITE_API_BASE_URL',
  ]

  const missingVars = requiredVars.filter(
    (varName) => !import.meta.env[varName]
  )

  if (missingVars.length > 0) {
    console.warn(
      `Missing environment variables: ${missingVars.join(', ')}`
    )
  }
}
