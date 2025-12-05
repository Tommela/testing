import { useState } from 'react'
import clsx from 'clsx'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Label } from '~/components/ui/label'
import DialogCustom from './dialog-custom'
import useAppTranslations from '~/hooks/use-app-translations'
import { TRANSLATE_KEYS } from '~/constants'

export type DuplicateOption = 'detailed' | 'nameOnly'

interface IDuplicateDialogProps {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  onConfirm: (option: DuplicateOption) => void
  isRawFabric?: boolean
}

const DuplicateDialog = ({ open, onOpenChange, onConfirm, isRawFabric = false }: IDuplicateDialogProps) => {
  const { t } = useAppTranslations()
  const [selectedOption, setSelectedOption] = useState<DuplicateOption>('detailed')

  const handleConfirm = () => {
    onConfirm(selectedOption)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
    setSelectedOption('detailed')
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedOption('detailed')
    }
    onOpenChange(isOpen)
  }

  return (
    <DialogCustom
      open={open}
      onOpenChange={handleOpenChange}
      title={t(TRANSLATE_KEYS.TITLE, 'selectWhatYouWantToDuplicate')}
      cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
      okText={t(TRANSLATE_KEYS.ACTION, 'check')}
      onOkAction={handleConfirm}
      onCancelAction={handleCancel}
      classNameContent='sm:max-w-[500px]'
      classNameWrapperChildrenContent='py-6'
    >
      <RadioGroup value={selectedOption} onValueChange={(value) => setSelectedOption(value as DuplicateOption)} className='gap-4'>
        {/* Option 1: Duplicate with detailed information */}
        <div
          className={clsx(
            'flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors',
            selectedOption === 'detailed' ? 'border-primary-main bg-primary-main/5' : 'border-gray-200 hover:border-gray-300'
          )}
          onClick={() => setSelectedOption('detailed')}
        >
          <RadioGroupItem value='detailed' id='detailed' className='mt-1 opacity-0 pointer-events-none' />
          <div className='flex-1'>
            <Label htmlFor='detailed' className='text-base font-semibold text-black-main cursor-pointer block'>
              {t(TRANSLATE_KEYS.DUPLICATE, 'duplicateWithDetailedInformation')}
            </Label>
            <p className='text-sm text-gray-600 mt-1'>
              {t(TRANSLATE_KEYS.DUPLICATE, 'copyAllDetailedDataExceptInventory')}
            </p>
          </div>
        </div>

        {/* Option 2: Duplicate item name only */}
        <div
          className={clsx(
            'flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors',
            selectedOption === 'nameOnly' ? 'border-primary-main bg-primary-main/5' : 'border-gray-200 hover:border-gray-300'
          )}
          onClick={() => setSelectedOption('nameOnly')}
        >
          <RadioGroupItem value='nameOnly' id='nameOnly' className='mt-1 opacity-0 pointer-events-none' />
          <div className='flex-1'>
            <Label htmlFor='nameOnly' className='text-base font-semibold text-black-main cursor-pointer block'>
              {t(TRANSLATE_KEYS.DUPLICATE, 'duplicateItemNameOnly')}
            </Label>
            <p className='text-sm text-gray-600 mt-1'>
              {t(TRANSLATE_KEYS.DUPLICATE, 'copyItemNameOnly')}
            </p>
          </div>
        </div>
      </RadioGroup>
    </DialogCustom>
  )
}

export default DuplicateDialog

