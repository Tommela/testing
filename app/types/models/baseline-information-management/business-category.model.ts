export interface IBusinessCategory {
  id?: string
  createddate?: string
  updateddate?: string
  recordstatus?: number
  user_id?: string
  name: string | null
}

export interface IBusinessCategoryCreatePayload {
  user_id?: string
  name: string
}

export interface IBusinessCategoryUpdatePayload {
  name: string
}

export interface IBusinessCategoryListResponse {
  status: boolean
  message: string
  status_code: number
  data: IBusinessCategory[]
}

