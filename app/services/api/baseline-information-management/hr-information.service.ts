import fetchClient from '~/configs/fetch.config'
import { API_HR_INFORMATION } from '~/constants/api.constant'
import type { IResponseDto } from '~/types'

export interface IHRInformationType {
  id: string
  createddate: string
  updateddate: string
  recordstatus: number
  user_id: string
  name: string
}

export interface IHRInformationResponse {
  id: string
  createddate: string
  updateddate: string
  recordstatus: number
  user_id: string
  name: string
  type: IHRInformationType
}

export interface IHRInformationListResponse {
  data: IHRInformationResponse[]
  total?: number
  page?: number
  limit?: number
}

export interface IHRInformationCreatePayload {
  name: string
  type: {
    id: string
    createddate: string
    updateddate: string
    recordstatus: number
    user_id: string
    name: string
  }
}

export interface IHRInformationUpdatePayload {
  id: string
  createddate: string
  updateddate: string
  recordstatus: number
  user_id: string
  name: string
  type: {
    id: string
    createddate: string
    updateddate: string
    recordstatus: number
    user_id: string
    name: string
  }
}

// HR Information Types
export enum HRInformationType {
  DEPARTMENT = 'department',
  JOB_TITLE = 'jobTitle',
  EMPLOYMENT_STATUS = 'employmentStatus',
  LEAVE_DETAILS = 'leaveDetails',
  CONTRACT_TYPES = 'contractTypes'
}

export interface IPermission {
  id: string
  name: string
  readable: boolean
  editable: boolean
  createddate?: string
  updateddate?: string
  recordstatus?: number
  user_id?: string
}

export interface IPermissionsResponse {
  data: IPermission[]
  status: boolean
  message: string
  status_code: number
}

export const HRInformationService = {
  getTypeAll: async (): Promise<IHRInformationListResponse> => {
    return await fetchClient.get(API_HR_INFORMATION.GET_TYPE_ALL.URL)
  },

  getByType: async (type: string): Promise<IHRInformationListResponse> => {
    return await fetchClient.get(API_HR_INFORMATION.GET_BY_TYPE.URL(type))
  },

  getDetail: async (id: string): Promise<IResponseDto> => {
    return await fetchClient.get(API_HR_INFORMATION.GET_DETAIL.URL(id))
  },

  create: async (payload: IHRInformationCreatePayload): Promise<IResponseDto> => {
    return await fetchClient.post(API_HR_INFORMATION.CREATE.URL, payload)
  },

  update: async (payload: IHRInformationUpdatePayload): Promise<IResponseDto> => {
    return await fetchClient.put(API_HR_INFORMATION.UPDATE.URL, payload)
  },

  delete: async (id: string): Promise<IResponseDto> => {
    return await fetchClient.delete(API_HR_INFORMATION.DELETE.URL(id))
  },

  getPermissions: async (): Promise<IPermissionsResponse> => {
    return await fetchClient.get(API_HR_INFORMATION.GET_PERMISSIONS.URL)
  }
}