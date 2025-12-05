import fetchClient from '~/configs/fetch.config'
import { API_YARN } from '~/constants/api.constant'
import type {
  IYarn,
  IYarnCreatePayload,
  IYarnUpdatePayload,
  IYarnGetAllParams,
  IYarnListResponse,
  IYarnUniqueNamesResponse,
  IYarnUniqueColorsResponse,
  IResponseDto
} from '~/types'

export const YarnService = {
  getAll: async (params: IYarnGetAllParams): Promise<IYarnListResponse> => {
    return await fetchClient.get(API_YARN.GET_ALL.URL, { params })
  },

  getDetail: async (id: string): Promise<IResponseDto<IYarn>> => {
    return await fetchClient.get(API_YARN.GET_DETAIL.URL(id))
  },

  getUniqueNames: async (): Promise<IYarnUniqueNamesResponse> => {
    return await fetchClient.get(API_YARN.GET_UNIQUE_NAMES.URL)
  },

  getUniqueColors: async (): Promise<IYarnUniqueColorsResponse> => {
    return await fetchClient.get(API_YARN.GET_UNIQUE_COLORS.URL)
  },

  create: async (payload: IYarnCreatePayload): Promise<IResponseDto> => {
    return await fetchClient.post(API_YARN.CREATE.URL, payload)
  },

  update: async (payload: IYarnUpdatePayload): Promise<IResponseDto> => {
    return await fetchClient.put(API_YARN.UPDATE.URL, payload)
  },

  delete: async (id: string): Promise<IResponseDto> => {
    return await fetchClient.delete(API_YARN.DELETE.URL(id))
  },

  deleteMulti: async (ids: string[]): Promise<IResponseDto> => {
    return await fetchClient.post(API_YARN.DELETE_MULTI.URL, ids)
  }
}