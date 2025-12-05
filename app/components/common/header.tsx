import clsx from 'clsx'
import { Bell, Calendar } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { SidebarTrigger, useSidebar } from '~/components/ui/sidebar'

interface IHeaderProps {
  pageTitle?: string
}
const Header = ({ pageTitle }: IHeaderProps) => {
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'
  return (
    <header
      className={clsx(
        'flex flex-wrap gap-space-main shrink-0 items-center justify-between transition-all ease-linear py-5 px-[30px] shadow-sm',
        'fixed top-0 right-0 z-50',
        'bg-[#fafafa]/20 backdrop-blur-sm',
        !isMobile && (isCollapsed ? 'left-[4.5rem]' : 'left-[16rem]'),
        isMobile && 'left-0'
      )}
    >
      <section className='flex items-center gap-[30px]'>
        <SidebarTrigger className='cursor-pointer' />
        <p className='font-[700] text-[18px] leading-[30px] tracking-[-0.5%] hidden lg:block'>{pageTitle}</p>
      </section>
      <section className='flex flex-wrap items-center gap-[30px]'>
        {/* Icon */}
        <section className='flex items-center gap-space-main'>
          {/* Notification */}
          <section className='relative cursor-pointer hidden md:block'>
            <Bell className='w-7 h-7' />
            <Badge
              className='absolute -top-2 -right-2 h-5 min-w-5 rounded-full p-1 font-mono tabular-nums bg-[#F66C7D]'
              variant='destructive'
            >
              10
            </Badge>
          </section>
          {/* Calendar */}
          <section className='relative cursor-pointer hidden md:block'>
            <Calendar className='w-7 h-7' />
            <Badge
              className='absolute -top-2 -right-2 h-5 min-w-5 rounded-full p-1 font-mono tabular-nums bg-[#00C6A2]'
              variant='destructive'
            >
              10
            </Badge>
          </section>
        </section>
        {/* Admin information */}
        <section className='flex items-center gap-[10px] cursor-pointer'>
          <section className='flex flex-col'>
            <p className='font-semibold leading-[20px] tracking-[-0.5%]'>대표 관리자</p>
            <p className='text-[11px] font-semibold leading-[16px] tracking-[0%] text-[#A4B5BA]'>admin@gmail.com</p>
          </section>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>ERP</AvatarFallback>
          </Avatar>
        </section>

        {/* Action */}
        <Button className='bg-[#F2F4F7] text-[#A4B5BA] border-[2px]'>종료</Button>
      </section>
    </header>
  )
}

export default Header
