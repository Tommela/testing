import { useTranslation } from 'react-i18next'
import type { IAppTranslations } from '~/types'

const useAppTranslations = () => {
  const { t: translate, i18n } = useTranslation()
  const t: IAppTranslations = (key, keyPrefix, values) => {
    return translate(`${key}.${keyPrefix}`, values)
  }
  return { t, i18n }
}

export default useAppTranslations
