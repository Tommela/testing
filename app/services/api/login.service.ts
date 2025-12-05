import fetchClient from '~/configs/fetch.config'
import { API_LOGIN } from '~/constants/api.constant'
import type { ILoginPayload, ILoginResponse } from '~/types'

export const LoginService = {
  signIn: async (payload: ILoginPayload): Promise<ILoginResponse> => {
    return await fetchClient.post(API_LOGIN.SIGN_IN.URL, payload)
  }
}