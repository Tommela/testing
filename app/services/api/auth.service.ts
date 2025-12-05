import fetchClient from '~/configs/fetch.config'
import { API_AUTH } from '~/constants/api.constant'
import type { IApiResponse, IPayloadLogin, IResponseLogin } from '~/types'

export const AuthService = {
  login: async (payload?: IPayloadLogin): Promise<IApiResponse<IResponseLogin>> => {
    return await fetchClient.post(API_AUTH.LOGIN.URL, payload)
  },
  test: async (): Promise<IApiResponse<any>> => {
    return await fetchClient.get(API_AUTH.LOGIN.URL)
  }
}
