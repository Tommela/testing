import clsx from 'clsx'
import { useNavigate } from 'react-router'
import { ErpIcon, LogoIcon } from '~/assets/icons'
import { useSidebar } from '~/components/ui/sidebar'
import { ROUTES } from '~/constants'

const Trademark = () => {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'
  const navigate = useNavigate()
  return (
    <section
      className={clsx(
        'flex items-center justify-center gap-[10px] cursor-pointer',
        !isCollapsed ? 'justify-start' : 'justify-center'
      )}
      onClick={() => {
        navigate(`/${ROUTES.ADMIN.BASE}/${ROUTES.ADMIN.BASE_LINE_INFORMATION_MANAGEMENT.YARN_CODE}`)
      }}
    >
      <LogoIcon className='w-6 h-6 shrink-0 text-primary-main' />
      {!isCollapsed && <ErpIcon className='w-[126px] h-5' />}
    </section>
  )
}

export default Trademark
