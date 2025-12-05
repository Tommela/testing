export interface ILoginPayload {
  email: string
  password: string
}

export interface ILoginResponse {
  email: string
  role_name: string
  role_syskey: string
  token: string
  user_name: string
  user_syskey: string
}

export interface ILoginErrorResponse {
  status: boolean
  message: string
  status_code: number
  data: null
}