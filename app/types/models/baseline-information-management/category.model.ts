export interface ICategory {
  id?: string
  createddate?: string
  updateddate?: string
  recordstatus?: number
  user_id?: string
  name: string
}

export interface ICategoryCreatePayload {
  name: string
}

export interface ICategoryUpdatePayload {
  id: string
  name: string
}

export interface ICategoryListResponse {
  status: boolean
  message: string
  status_code: number
  data: ICategory[]
}