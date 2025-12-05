import { Button } from '~/components/ui/button'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'
import { cn } from '~/lib/utils'

interface IBaseFilterLayoutProps {
  children: React.ReactNode
  onSearch?: () => void
  className?: string
}
const BaseLayoutFilterItem = ({ className, children, onSearch }: IBaseFilterLayoutProps) => {
  const { t } = useAppTranslations()
  return (
    <section
      className={cn(
        'px-space-main py-[9.5px] rounded-space-main flex flex-wrap items-center justify-between gap-[30px]',
        className
      )}
    >
      <section className='flex flex-wrap items-center gap-[30px]'>{children}</section>
      {onSearch && (
        <Button className='bg-[#A4B5BA] w-[85px] text-white !hidden lg:!block rounded-[10px]' onClick={onSearch}>
          {t(TRANSLATE_KEYS.ACTION, 'search')}
        </Button>
      )}
    </section>
  )
}

export default BaseLayoutFilterItem
