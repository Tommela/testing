import fetchClient from '~/configs/fetch.config'
import { API_AUTH, API_INTRODUCE } from '~/constants/api.constant'
import type { IApiResponse, IIntroduce, IPayloadLogin, IResponseLogin, IUpserIntroduce } from '~/types'

export const IntroduceService = {
  getList: async (): Promise<IApiResponse<IIntroduce[]>> => {
    return await fetchClient.get(API_INTRODUCE.GET_LIST.URL)
  },
  create: async (payload?: IUpserIntroduce): Promise<IApiResponse<IIntroduce[]>> => {
    return await fetchClient.post(API_INTRODUCE.CREATE.URL, payload)
  }
}
