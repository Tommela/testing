import fetchClient from '~/configs/fetch.config'
import { API_BUSINESS_CATEGORY } from '~/constants/api.constant'
import type {
  IBusinessCategory,
  IBusinessCategoryCreatePayload,
  IBusinessCategoryUpdatePayload,
  IBusinessCategoryListResponse,
  IResponseDto
} from '~/types'

export const BusinessCategoryService = {
  getAll: async (): Promise<IBusinessCategoryListResponse> => {
    return await fetchClient.get(API_BUSINESS_CATEGORY.GET_ALL.URL)
  },

  getDetail: async (id: string): Promise<IResponseDto<IBusinessCategory>> => {
    return await fetchClient.get(API_BUSINESS_CATEGORY.GET_DETAIL.URL(id))
  },

  create: async (payload: IBusinessCategoryCreatePayload): Promise<IResponseDto> => {
    return await fetchClient.post(API_BUSINESS_CATEGORY.CREATE.URL, payload)
  },

  update: async (payload: IBusinessCategoryUpdatePayload): Promise<IResponseDto> => {
    return await fetchClient.put(API_BUSINESS_CATEGORY.UPDATE.URL, payload)
  },
  
  delete: async (id: string): Promise<IResponseDto> => {
    return await fetchClient.delete(API_BUSINESS_CATEGORY.DELETE.URL(id))
  }
}

