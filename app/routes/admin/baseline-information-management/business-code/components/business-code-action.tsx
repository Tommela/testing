import { CategoryIcon, EditIcon } from '~/assets/icons'
import { Button } from '~/components/ui/button'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'

interface IBusinessCodeActionProps {
  onCompanyTypeSetting: () => void
  onAddNew: () => void
}

const BusinessCodeAction = ({ onCompanyTypeSetting, onAddNew }: IBusinessCodeActionProps) => {
  const { t } = useAppTranslations()
  return (
    <section className='flex flex-wrap items-center justify-between gap-5'>
      <p className='text-black-main text-base leading-[20px] font-bold tracking-[-0.5%]'>
        {t(TRANSLATE_KEYS.TITLE, 'businessCode')}
      </p>
      <section className='flex flex-wrap items-center gap-5'>
        <Button className='bg-[#965EF5]' onClick={onCompanyTypeSetting}>
          <CategoryIcon className='w-5! h-5! text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'companyTypeSetting')}</span>
        </Button>
        <Button onClick={onAddNew}>
          <EditIcon className='w-[28px]! h-[28px]! text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'newRegistration')}</span>
        </Button>
      </section>
    </section>
  )
}

export default BusinessCodeAction

