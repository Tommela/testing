import { Settings2, SettingsIcon } from 'lucide-react'
import { CategoryIcon, EditIcon } from '~/assets/icons'
import { Button } from '~/components/ui/button'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'

interface FabricCodeActionProps {
  searchResults?: number
  onDeleteSelection: () => void
  onClientTierSettings: () => void
  onPlatformSetting: () => void
  onAddNewClient: () => void
}

const FabricCodeAction = ({
  searchResults = 0,
  onDeleteSelection,
  onClientTierSettings,
  onPlatformSetting,
  onAddNewClient
}: FabricCodeActionProps) => {
  const { t } = useAppTranslations()
  return (
    <section className='flex flex-wrap items-center justify-between gap-5'>
      <p className='text-black-main text-[18px] font-[700] text-base leading-[20px] tracking-[-0.5%]'>
        {t(TRANSLATE_KEYS.TITLE, 'clientCode')}
      </p>
      <section className='flex flex-wrap items-center gap-5'>
        <Button className='bg-[white] text-black-main card-shadow h-[40px] text-[12px] font-[600]' onClick={onDeleteSelection}>
          {t(TRANSLATE_KEYS.ACTION, 'deleteSelection')}
        </Button>
        <Button className='bg-[#965EF5] h-[40px] text-[12px] font-[600]' onClick={onClientTierSettings}>
          <SettingsIcon className='!w-5 !h-5 text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'clientSetting')}</span>
        </Button>
        <Button className=' h-[40px] bg-[#00C6A2] text-[12px] font-[600]' onClick={onPlatformSetting}>
          <SettingsIcon className='!w-5 !h-5 text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'platformSetting')}</span>
        </Button>
        <Button className=' h-[40px] text-[12px] font-[600]' onClick={onAddNewClient}>
          <EditIcon className='!w-[28px] !h-[28px] text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'addNew')}</span>
        </Button>
      </section>
    </section>
  )
}

export default FabricCodeAction

