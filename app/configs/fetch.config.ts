import cookieHelper from '~/helpers/cookie.helper'
import { eErrorCode } from '~/types/enums/errors-code.enum'
import { ENV_CONFIG } from '~/configs/env.config'

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  params?: Record<string, any>
  timeout?: number
}

interface ApiResponse<T = any> {
  data?: T
  message: string
  status: boolean
  status_code: number
}

let hasShow401Toast = false

class FetchClient {
  private baseURL: string
  private defaultTimeout: number

  constructor(baseURL?: string, timeout?: number) {
    this.baseURL = baseURL || ENV_CONFIG.API_BASE_URL
    this.defaultTimeout = timeout || ENV_CONFIG.API_TIMEOUT
  }

  private async request<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      params,
      timeout = this.defaultTimeout
    } = config

    // Build full URL with query parameters
    let fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`

    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value))
      })
      fullUrl += `?${searchParams.toString()}`
    }

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      ...headers
    }

    // Add authorization if available
    const token = cookieHelper.getAccessToken()
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`
    }

    // Handle refresh token
    if (url.includes('auth/refresh-token')) {
      requestHeaders['refresh'] = cookieHelper.getRefreshToken()
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(fullUrl, {
        ...requestOptions,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      // Handle response
      if (!response.ok) {
        if (response.status === Number(eErrorCode.Unauthorized)) {
          cookieHelper.removeAccessToken()
          if (!hasShow401Toast) {
            hasShow401Toast = true
            setTimeout(() => {
              window.location.href = '/'
            }, 500)
          }
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Check if response has content
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json()

        // Handle API response format
        if (data && typeof data === 'object' && 'status' in data) {
          if (!data.status && data.message) {
            // API returned error
            throw new Error(data.message)
          }
          return data
        }

        return data
      }

      // Return empty object for non-JSON responses
      return {} as T

    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout')
        }
        throw error
      }

      throw new Error('Network error')
    }
  }

  async get<T = any>(url: string, config: Omit<RequestConfig, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' })
  }

  async post<T = any>(url: string, body?: any, config: Omit<RequestConfig, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(url, { ...config, method: 'POST', body })
  }

  async put<T = any>(url: string, body?: any, config: Omit<RequestConfig, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PUT', body })
  }

  async delete<T = any>(url: string, config: Omit<RequestConfig, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' })
  }

  async patch<T = any>(url: string, body?: any, config: Omit<RequestConfig, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PATCH', body })
  }
}

// Create and export the fetch client instance using environment config
const fetchClient = new FetchClient()

export default fetchClient
export type { RequestConfig, ApiResponse }