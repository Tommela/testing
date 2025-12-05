import fetchClient from '~/configs/fetch.config'
import { API_CATEGORY } from '~/constants/api.constant'
import type {
  ICategory,
  ICategoryCreatePayload,
  ICategoryUpdatePayload,
  ICategoryListResponse,
  IResponseDto
} from '~/types'

export const CategoryService = {
  getAll: async (): Promise<ICategoryListResponse> => {
    return await fetchClient.get(API_CATEGORY.GET_ALL.URL)
  },

  getDetail: async (id: string): Promise<IResponseDto<ICategory>> => {
    return await fetchClient.get(API_CATEGORY.GET_DETAIL.URL(id))
  },

  create: async (payload: ICategoryCreatePayload): Promise<IResponseDto> => {
    return await fetchClient.post(API_CATEGORY.CREATE.URL, payload)
  },

  update: async (payload: ICategoryUpdatePayload): Promise<IResponseDto> => {
    return await fetchClient.put(API_CATEGORY.UPDATE.URL, payload)
  },

  delete: async (id: string): Promise<IResponseDto> => {
    return await fetchClient.delete(API_CATEGORY.DELETE.URL(id))
  }
}