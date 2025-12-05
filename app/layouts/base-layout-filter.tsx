import { useState } from 'react'

import clsx from 'clsx'
import { FilterX } from 'lucide-react'
import SheetCustom from '~/components/customs/sheet-custom'
import { Button } from '~/components/ui/button'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'

interface IBaseFilterLayoutProps {
  children: React.ReactNode
  onSearchMobile?: () => void
}

export const BaseLayoutFilter = ({ children, onSearchMobile }: IBaseFilterLayoutProps) => {
  const { t } = useAppTranslations()
  const [openMobileFiter, setOpenMobileFilter] = useState(false)
  return (
    <>
      <section className={clsx('hidden flex-col main-shadow rounded-radius-main lg:flex')}>
        <section className='[&>section:not(:first-child)]:border-t [&>section:not(:first-child)]:border-t-light-gray'>
          {children}
        </section>
      </section>

      <section
        className='flex items-center gap-space-main lg:hidden'
        onClick={() => setOpenMobileFilter(!openMobileFiter)}
      >
        <Button className='flex items-center justify-center gap-4'>
          <FilterX />
          <span>{t(TRANSLATE_KEYS.ACTION, 'search')}</span>
        </Button>
      </section>

      {/* Sheet */}
      <SheetCustom
        open={openMobileFiter}
        onOpenChange={setOpenMobileFilter}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'ok')}
        hiddenHeader
        onOkAction={() => {
          setOpenMobileFilter(false)
          onSearchMobile?.()
        }}
      >
        <section className={clsx('flex flex-col')}>
          <section className='[&>section:not(:first-child)]:border-t [&>section:not(:first-child)]:border-t-light-gray'>
            {children}
          </section>
        </section>
      </SheetCustom>
    </>
  )
}
