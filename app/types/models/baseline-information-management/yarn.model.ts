import type { ICategory } from './category.model'

export interface IYarn {
  id?: string
  createddate?: string
  updateddate?: string
  recordstatus?: number
  user_id?: string
  category: ICategory
  name: string
  color: string
  note?: string
}

export interface IYarnCreatePayload {
  category: ICategory
  name: string
  color: string
  note?: string
}

export interface IYarnUpdatePayload {
  id: string
  category: ICategory
  name: string
  color: string
  note?: string
}

export interface IYarnGetAllParams {
  page: number
  pageSize: number
  category: string
  name: string
  color: string
}

export interface IYarnListResponse {
  status: boolean
  message: string
  status_code: number
  data: IYarn[]
  dataList: IYarn[]
}

export interface IYarnUniqueNamesResponse {
  status: boolean
  message: string
  status_code: number
  data: string[]
}

export interface IYarnUniqueColorsResponse {
  status: boolean
  message: string
  status_code: number
  data: string[]
}