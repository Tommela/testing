export interface IApiResponse<T> {
  result: {
    data: T
    total?: number
    status?: boolean
    isBlocked?: boolean
    isBlockedByUser?: boolean
    isBlockedBySeller?: boolean
  }
  message: string
  statusCode: number
  status?: string | number
  errorCode?: string
}

export interface IResponseDto<T = any> {
  status: boolean
  message: string
  status_code: number
  data: T
}

export interface IAppTranslations {
  (key: string, keyPrefix: string, values?: Record<string, any>): string
}

export interface ISidebarMenu {
  title: string
  url: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export interface IOption {
  label?: string
  value: string
}
