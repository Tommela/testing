import { CategoryIcon, EditIcon } from '~/assets/icons'
import { Button } from '~/components/ui/button'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'

interface IYarnCodeActionProps {
  onNewRegistrationAction: () => void
  onSettingYarnClassfication: () => void
  onResetFilter: () => void
  onDeleteSelection: () => void
}
const YarnCodeAction = ({
  onResetFilter,
  onNewRegistrationAction,
  onSettingYarnClassfication,
  onDeleteSelection
}: IYarnCodeActionProps) => {
  const { t } = useAppTranslations()
  return (
    <section className='flex flex-wrap items-center justify-between gap-5'>
      <p className='text-black-main text-base leading-[20px] font-[700] tracking-[-0.5%]'>
        {t(TRANSLATE_KEYS.TITLE, 'yarnCode')}
      </p>
      <section className='flex flex-wrap items-center gap-5'>
        <Button className='bg-[white] text-black-main main-shadow h-[40px] text-[12px] font-[600]' onClick={onDeleteSelection}>
          {t(TRANSLATE_KEYS.ACTION, 'deleteSelection')}
        </Button>
        <Button className='bg-[#965EF5] h-[40px] text-[12px] font-[600]' onClick={onSettingYarnClassfication}>
          <CategoryIcon className='!w-5 !h-5 text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'settingYarnClassification')}</span>
        </Button>
        <Button className='h-[40px] text-[12px] font-[600]' onClick={onNewRegistrationAction}>
          <EditIcon className='!w-[28px] !h-[28px] text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'newRegistration')}</span>
        </Button>
      </section>
    </section>
  )
}

export default YarnCodeAction
