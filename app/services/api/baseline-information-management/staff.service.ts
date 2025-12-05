import fetchClient from '~/configs/fetch.config'
import { API_STAFF } from '~/constants/api.constant'
import type { IResponseDto } from '~/types'
import type { IPermission } from '~/services/api/baseline-information-management/hr-information.service'

export interface IStaffResponse {
  id: string
  email: string
  employeeNo: string
  name: string
  department: string
  jobTitle: string
  employmentStatus: 'Active' | 'On Leave' | 'Resigned'
  dateOfHire: string
  exitDate?: string
  contact: string
  contractTypes: string
  permissions: string
  payrollAccountInfo?: {
    bankName: string
    accountNumber: string
    depository: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface IStaffListResponse {
  dataList: IStaffResponse[]
  totalItems: number
  currentPage: number
  totalPages: number
}

export interface IHRInfoObject {
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

export interface IStaffCreatePayload {
  id?: string
  basic_information: {
    name: string
    email: string
    password: string
    contact: string
  }
  contract_information: {
    contact: string
    employment_status: IHRInfoObject
    department: IHRInfoObject
    jobtitle: IHRInfoObject
    contracttype: IHRInfoObject
    dateofhire: string
    exitdate?: string
    permission: IPermission
  }
  payroll_infromation: {
    bankname: IHRInfoObject
    accountnum: string
    accountholder: string
  }
}

export interface IStaffUpdatePayload {
  id: string
  basic_information: {
    name: string
    email: string
    password: string
    contact: string
  }
  contract_information: {
    contact: string
    employment_status: IHRInfoObject
    department: IHRInfoObject
    jobtitle: IHRInfoObject
    contracttype: IHRInfoObject
    dateofhire: string
    exitdate?: string
    permission: IPermission
  }
  payroll_infromation: {
    bankname: IHRInfoObject
    accountnum: string
    accountholder: string
  }
}

export interface IUniqueNameResponse {
  dataList: string[]
  totalItems: number
  currentPage: number
  totalPages: number
}

export interface IUniqueEmpnoResponse {
  dataList: string[]
  totalItems: number
  currentPage: number
  totalPages: number
}

export interface IStaffQueryParams {
  page?: number
  pageSize?: number
  jobtitle?: string
  name?: string
  employeeNo?: string
  department?: string
}

export const StaffService = {
  getAll: async (params?: IStaffQueryParams): Promise<IStaffListResponse> => {
    let url = API_STAFF.GET_ALL.URL

    if (params) {
      const searchParams = new URLSearchParams()

      // Add pagination parameters with defaults
      searchParams.append('page', (params.page || 1).toString())
      searchParams.append('pageSize', (params.pageSize || 10).toString())

      // Add filter parameters only if they have values
      if (params.jobtitle) searchParams.append('jobtitle', params.jobtitle)
      if (params.name) searchParams.append('name', params.name)
      if (params.employeeNo) searchParams.append('employeeNo', params.employeeNo)
      if (params.department) searchParams.append('department', params.department)

      url = `${url}?${searchParams.toString()}`
    }

    return await fetchClient.get(url)
  },

  getDetail: async (id: string): Promise<IStaffResponse> => {
    return await fetchClient.get(API_STAFF.GET_DETAIL.URL(id))
  },

  create: async (payload: IStaffCreatePayload): Promise<IResponseDto> => {
    return await fetchClient.post(API_STAFF.CREATE.URL, payload)
  },

  update: async (payload: IStaffUpdatePayload): Promise<IResponseDto> => {
    return await fetchClient.put(API_STAFF.UPDATE.URL, payload)
  },

  delete: async (id: string): Promise<IResponseDto> => {
    return await fetchClient.delete(API_STAFF.DELETE.URL(id))
  },

  getUniqueName: async (): Promise<IUniqueNameResponse> => {
    return await fetchClient.get(API_STAFF.GET_UNIQUE_NAME.URL)
  },

  getUniqueEmpno: async (): Promise<IUniqueEmpnoResponse> => {
    return await fetchClient.get(API_STAFF.GET_UNIQUE_EMPNO.URL)
  }
}