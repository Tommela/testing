interface EnvironmentConfig {
  API_BASE_URL: string
  API_TIMEOUT: number
  APP_NAME: string
  APP_VERSION: string
  NODE_ENV: string
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  return {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
    APP_NAME: import.meta.env.VITE_APP_NAME || 'ERP Frontend',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    NODE_ENV: import.meta.env.NODE_ENV || 'development'
  }
}

export const ENV_CONFIG = getEnvironmentConfig()

export default ENV_CONFIG