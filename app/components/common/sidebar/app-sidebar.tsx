import * as React from 'react'

import { NavMain } from '~/components/common/sidebar/nav-main'
import Trademark from '~/components/common/sidebar/trademark'
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '~/components/ui/sidebar'
import layoutHelper from '~/helpers/layout.helper'
import useAppTranslations from '~/hooks/use-app-translations'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useAppTranslations()
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='py-[10px] px-5 mt-5'>
        <Trademark />
      </SidebarHeader>
      <SidebarContent className='mt-space-main scrollbar-hide'>
        <NavMain sidebarMenu={layoutHelper.getSidebarMenu(t)} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
