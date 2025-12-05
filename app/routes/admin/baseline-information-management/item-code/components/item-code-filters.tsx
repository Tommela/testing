import { useState } from 'react'

import SelectCustom from '~/components/customs/select-custom'
import { FilterField } from '~/components/features/filters/filter-field'
import { Checkbox } from '~/components/ui/checkbox'
import { SelectItem } from '~/components/ui/select'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'
import { BaseLayoutFilter } from '~/layouts/base-layout-filter'
import BaseLayoutFilterItem from '~/layouts/base-layout-filter-item'

export interface IItemCodeFilters {
  fabricPart?: string
  itemName?: string
  producedBy?: string
  directPurchase?: 'Y' | 'N' | undefined
}

interface IItemCodeFiltersProps {
  values: IItemCodeFilters
  onChange: (values: IItemCodeFilters) => void
  onSearch: () => void
}

const ItemCodeFilters = ({ values, onChange, onSearch }: IItemCodeFiltersProps) => {
  const { t } = useAppTranslations()

  const handleChange = <K extends keyof IItemCodeFilters>(key: K, value: IItemCodeFilters[K]) => {
    onChange({ ...values, [key]: value })
  }

  const handleDirectPurchaseChange = (value: 'Y' | 'N') => {
    // Toggle: if same value clicked, uncheck it
    if (values.directPurchase === value) {
      handleChange('directPurchase', undefined)
    } else {
      handleChange('directPurchase', value)
    }
  }

  return (
    <BaseLayoutFilter onSearchMobile={onSearch}>
      <BaseLayoutFilterItem onSearch={onSearch}>
        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'fabricPart')} labelWidth={85} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectFabricPart')}
            classNameSelectTrigger='w-[147px]'
            value={values.fabricPart}
            onChange={(v) => handleChange('fabricPart', v)}
          >
            <SelectItem value='bodyboard'>Bodyboard</SelectItem>
            <SelectItem value='sleeve'>Sleeve</SelectItem>
            <SelectItem value='collar'>Collar</SelectItem>
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'itemCodeName')} labelWidth={85} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectItemCodeName')}
            classNameSelectTrigger='w-[153px]'
            value={values.itemName}
            onChange={(v) => handleChange('itemName', v)}
          >
            <SelectItem value='raw-a'>Raw A</SelectItem>
            <SelectItem value='raw-b'>Raw B</SelectItem>
            <SelectItem value='raw-c'>Raw C</SelectItem>
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'producedBy')} labelWidth={50} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectProducedBy')}
            classNameSelectTrigger='w-[100px]'
            value={values.producedBy}
            onChange={(v) => handleChange('producedBy', v)}
          >
            <SelectItem value='company-a'>Knitting Factory A</SelectItem>
            <SelectItem value='company-b'>Knitting Factory B</SelectItem>
            <SelectItem value='company-c'>Knitting Factory C</SelectItem>
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'directPurchase')} labelWidth={85} labelClassName='text-[12px] font-[600]'>
          <section className='flex items-center gap-4'>
            <section className='flex items-center gap-2'>
              <Checkbox
                checked={values.directPurchase === 'Y'}
                onCheckedChange={() => handleDirectPurchaseChange('Y')}
                id='direct-purchase-y'
              />
              <label htmlFor='direct-purchase-y' className='text-black-main text-[12px] font-[600] leading-[20px] tracking-[-0.5%] cursor-pointer'>
                Y
              </label>
            </section>
            <section className='flex items-center gap-2'>
              <Checkbox
                checked={values.directPurchase === 'N'}
                onCheckedChange={() => handleDirectPurchaseChange('N')}
                id='direct-purchase-n'
              />
              <label htmlFor='direct-purchase-n' className='text-black-main text-[12px] font-[600] leading-[20px] tracking-[-0.5%] cursor-pointer'>
                N
              </label>
            </section>
          </section>
        </FilterField>
      </BaseLayoutFilterItem>
    </BaseLayoutFilter>
  )
}

export default ItemCodeFilters

