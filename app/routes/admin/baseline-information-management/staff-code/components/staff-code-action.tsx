import { Settings2, SettingsIcon } from 'lucide-react'
import { CategoryIcon, EditIcon } from '~/assets/icons'
import { Button } from '~/components/ui/button'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'

interface IStaffCodeActionProps {
  onHrInformationSetting: () => void
  onSetPermissionSetting: () => void
  onAddNew: () => void
}

const StaffCodeAction = ({
  onHrInformationSetting,
  onSetPermissionSetting,
  onAddNew
}: IStaffCodeActionProps) => {
  const { t } = useAppTranslations()
  return (
    <section className='flex flex-wrap items-center justify-between gap-5'>
      <p className='text-black-main text-[18px] font-[700] leading-[18px] tracking-[-0.5%]'>
        {t(TRANSLATE_KEYS.TITLE, 'staffCode')}
      </p>
      <section className='flex flex-wrap items-center gap-5'>
        <Button className='bg-[#965EF5] h-[40px] text-[12px] font-[600]' onClick={onHrInformationSetting}>
          <SettingsIcon className='!w-[18px] !h-[18px] text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'hrInformationSetting')}</span>
        </Button>
        <Button className='bg-[#00C6A2] h-[40px] text-[12px] font-[600]' onClick={onSetPermissionSetting}>
          <CategoryIcon className='!w-[18px] !h-[18px] text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'setPermissionSetting')}</span>
        </Button>
        <Button onClick={onAddNew} className='h-[40px] text-[12px] font-[600]'>
          <EditIcon className='!w-[28px] !h-[28px] text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'addNew')}</span>
        </Button>
      </section>
    </section>
  )
}

export default StaffCodeAction

