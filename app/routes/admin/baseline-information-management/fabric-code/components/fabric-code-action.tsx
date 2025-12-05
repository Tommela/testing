import { CategoryIcon, EditIcon } from '~/assets/icons'
import { Button } from '~/components/ui/button'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'

interface FabricCodeActionProps {
  searchResults?: number
  onDeleteSelection: () => void
  onUnitsSetting: () => void
  onAddNewFabric: () => void
  onAddNewDirectPurchase: () => void
}

const FabricCodeAction = ({
  searchResults = 0,
  onDeleteSelection,
  onUnitsSetting,
  onAddNewFabric,
  onAddNewDirectPurchase
}: FabricCodeActionProps) => {
  const { t } = useAppTranslations()
  return (
    <section className='flex flex-wrap items-center justify-between gap-5'>
      <p className='text-black-main text-base leading-[20px] tracking-[-0.5%]'>
        {t(TRANSLATE_KEYS.COMMON, 'searchResults')}({searchResults})
      </p>
      <section className='flex flex-wrap items-center gap-5'>
        <Button className='bg-[white] text-black-main card-shadow h-[40px] text-[12px] font-[600]' onClick={onDeleteSelection}>
          {t(TRANSLATE_KEYS.ACTION, 'deleteSelection')}
        </Button>
        <Button className='bg-[#965EF5] h-[40px] text-[12px] font-[600]' onClick={onUnitsSetting}>
          <CategoryIcon className='!w-5 !h-5 text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'unitSetting')}</span>
        </Button>
        <Button className=' h-[40px] text-[12px] font-[600]' onClick={onAddNewFabric}>
          <EditIcon className='!w-[28px] !h-[28px] text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'newFabricRegister')}</span>
        </Button>
        <Button className=' h-[40px] text-[12px] font-[600]' onClick={onAddNewDirectPurchase}>
          <EditIcon className='!w-[28px] !h-[28px] text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'newDirectPurchaseFabricRegister')}</span>
        </Button>
      </section>
    </section>
  )
}

export default FabricCodeAction

