import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '~/components/ui/sidebar'
import type { ISidebarMenu } from '~/types'

export interface ISidebarMenuProps {
  sidebarMenu: ISidebarMenu[]
}

export function NavMain({ sidebarMenu }: ISidebarMenuProps) {
  const { openMobile, isMobile, setOpenMobile, state } = useSidebar()
  const isCollapsed = state === 'collapsed'
  const location = useLocation()
  return (
    <SidebarGroup className='p-[15px]'>
      <SidebarMenu>
        {sidebarMenu.map((item) => {
          const isParentActive = item.items?.some((sub) => location.pathname === sub.url)
          const isChildActive = item.items?.some((sub) => location.pathname === sub.url)
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isParentActive || isChildActive}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    data-active={isParentActive}
                    className={clsx(
                      'data-[active=true]:bg-primary-main data-[active=true]:text-white h-[45px] py-[12.5px] px-space-main ',
                      !isMobile && (isCollapsed ? 'rounded-[6px]' : 'rounded-[12px]'),
                      isParentActive ? 'hover:bg-primary-main! hover:text-white!' : 'hover:bg-gray-300!'
                    )}
                  >
                    <Link to={item.url} className='flex items-center gap-space-main'>
                      {item.icon && (
                        <item.icon
                          style={{ width: 20, height: 20 }}
                          className={clsx(isParentActive ? 'text-white' : 'text-[#A4B5BA]')}
                        />
                      )}
                      <span className='font-bold'>{item.title}</span>
                      <ChevronDown className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180' />
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul
                    onClick={() => {
                      if (isMobile) {
                        setOpenMobile(!openMobile)
                      }
                    }}
                  >
                    {item?.items?.map((subItem) => {
                      const isSubActive = location.pathname === subItem.url
                      return (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          className='py-2.5 px-5 h-10 flex items-center justify-start'
                        >
                          <SidebarMenuSubButton asChild data-active={isSubActive} className='bg-transparent!'>
                            <Link to={subItem.url} className='flex items-center gap-space-main group/item '>
                              <section className='w-5 h-5 flex items-center justify-center'>
                                <span
                                  className={clsx(
                                    'w-1 h-1 rounded-full group-hover/item:bg-primary-main transition-all duration-300',
                                    isSubActive ? 'bg-primary-main' : 'bg-black'
                                  )}
                                ></span>
                              </section>
                              <span
                                className={clsx(
                                  'group-hover/item:text-primary-main transition-all duration-300',
                                  isSubActive ? 'text-primary-main' : 'text-black'
                                )}
                              >
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </ul>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
