import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { API_AUTH } from '~/constants'
import { IntroduceService } from '~/services/api/introduct.service'
import type { IIntroduce } from '~/types'

type UseIntroduceQueryOptions = Omit<UseQueryOptions<IIntroduce[]>, 'queryKey' | 'queryFn'>

export const useIntroduce = (options?: UseIntroduceQueryOptions) => {
  return useQuery({
    queryKey: [API_AUTH.LOGIN.KEY],
    queryFn: async () => {
      const res = await IntroduceService.getList()
      return (
        res?.result?.data || [
          {
            id: 1,
            name: 'A'
          },
          {
            id: 2,
            name: 'A'
          },
          {
            id: 3,
            name: 'A'
          }
        ]
      )
    },
    ...options
  })
}
