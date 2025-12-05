import { CategoryIcon, EditIcon } from '~/assets/icons'
import { Button } from '~/components/ui/button'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'

interface IItemCodeActionProps {
  onDeleteSelection: () => void
  onUnitSetting: () => void
  onFabricPartSetting: () => void
  onAddNewRawFabric: () => void
  onAddNewDirectPurchase: () => void
}

const ItemCodeAction = ({
  onDeleteSelection,
  onUnitSetting,
  onFabricPartSetting,
  onAddNewRawFabric,
  onAddNewDirectPurchase
}: IItemCodeActionProps) => {
  const { t } = useAppTranslations()
  return (
    <section className='flex flex-wrap items-center justify-between gap-5'>
      <p className='text-black-main text-base leading-[20px] font-bold tracking-[-0.5%]'>
        {t(TRANSLATE_KEYS.TITLE, 'itemCode')}
      </p>
      <section className='flex flex-wrap items-center gap-5'>
        <Button className='bg-[white] text-black-main main-shadow' onClick={onDeleteSelection}>
          {t(TRANSLATE_KEYS.ACTION, 'deleteSelection')}
        </Button>
        <Button className='bg-[#965EF5]' onClick={onUnitSetting}>
          <CategoryIcon className='w-5! h-5! text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'unitSetting')}</span>
        </Button>
        <Button className='bg-[#965EF5]' onClick={onFabricPartSetting}>
          <CategoryIcon className='!w-5 !h-5 text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'fabricPartSetting')}</span>
        </Button>
        <Button onClick={onAddNewRawFabric}>
          <EditIcon className='!w-[28px] !h-[28px] text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'newRegistrationRawFabric')}</span>
        </Button>
        <Button onClick={onAddNewDirectPurchase}>
          <EditIcon className='!w-[28px] !h-[28px] text-white' />
          <span>{t(TRANSLATE_KEYS.ACTION, 'newRegistrationDirectPurchase')}</span>
        </Button>
      </section>
    </section>
  )
}

export default ItemCodeAction

