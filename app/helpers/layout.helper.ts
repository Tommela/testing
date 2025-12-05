import { BaselineInformationManagementIcon } from '~/assets/icons'
import { ROUTES, TRANSLATE_KEYS } from '~/constants'
import type { IAppTranslations } from '~/types'

const layoutHelper = {
  getSidebarMenu: (t: IAppTranslations) => {
    const basePath = `/${ROUTES.ADMIN.BASE}`
    const subRoutes = ROUTES.ADMIN.BASE_LINE_INFORMATION_MANAGEMENT
    const items = Object.entries(subRoutes).map(([key, value]) => {
      const lowerKey = key.toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase())
      return {
        title: t(TRANSLATE_KEYS.SIDEBAR_MENU, `baselineInformationManagement.${lowerKey}`),
        url: `${basePath}/${value}`
      }
    })
    return [
      {
        icon: BaselineInformationManagementIcon,
        title: t(TRANSLATE_KEYS.SIDEBAR_MENU, 'baselineInformationManagement.title'),
        url: '#',
        items
      }
    ]
  }
}

export default layoutHelper
