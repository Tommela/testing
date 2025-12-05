import { useState } from 'react'

import SelectCustom from '~/components/customs/select-custom'
import { FilterField } from '~/components/features/filters/filter-field'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { SelectItem } from '~/components/ui/select'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'
import { BaseLayoutFilter } from '~/layouts/base-layout-filter'
import BaseLayoutFilterItem from '~/layouts/base-layout-filter-item'

export interface FabricCodeFilterTypes {
  fabricPart?: string
  itemName?: string
  directPurchase?: string | undefined
  discontinuedInProd?: 'Y' | 'N' | undefined
  printDesign?: string
  color?: string
  btNo?: string
  prodSpec?: 'ALL' | string
  prodUnits?: 'ALL' | string
  saleUnits?: 'ALL' | string
}

interface FabricCodeFiltersProps {
  values: FabricCodeFilterTypes
  onChange: (values: FabricCodeFilterTypes) => void
  onSearch: () => void
}

const FabricCodeFilters = ({ values, onChange, onSearch }: FabricCodeFiltersProps) => {
  const { t } = useAppTranslations()

  const handleChange = <K extends keyof FabricCodeFilterTypes>(key: K, value: FabricCodeFilterTypes[K]) => {
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

  const handleDisContinuedInProduction = (value: 'Y' | 'N') => {
    // Toggle: if same value clicked, uncheck it
    if (values.discontinuedInProd === value) {
      handleChange('discontinuedInProd', undefined)
    } else {
      handleChange('discontinuedInProd', value)
    }
  }
  return (
    <BaseLayoutFilter onSearchMobile={onSearch}>
      <BaseLayoutFilterItem>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.fabricCode.fabricPart')} labelWidth={150} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.ENUMS, 'filtersPlaceholder.fabricCode.fabricPart')}
            classNameSelectTrigger='w-[130px] text-[12px]'
            value={values.fabricPart}
            onChange={(v) => handleChange('fabricPart', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='bodyboard' className='text-[12px] font-[400]'>Bodyboard</SelectItem>
            <SelectItem value='sleeve' className='text-[12px] font-[400]'>Sleeve</SelectItem>
            <SelectItem value='collar' className='text-[12px] font-[400]'>Collar</SelectItem>
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.fabricCode.itemName')} labelWidth={150} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.ENUMS, 'filtersPlaceholder.fabricCode.itemName')}
            classNameSelectTrigger='w-[130px] text-[12px]'
            value={values.itemName}
            onChange={(v) => handleChange('itemName', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='raw-a' className='text-[12px] font-[400]'>Raw A</SelectItem>
            <SelectItem value='raw-b' className='text-[12px] font-[400]'>Raw B</SelectItem>
            <SelectItem value='raw-c' className='text-[12px] font-[400]'>Raw C</SelectItem>
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.fabricCode.directPurchase')} labelWidth={130} labelClassName='text-[12px] font-[600]'>
          <section className='flex items-center gap-4'>
            <section className='flex items-center gap-2'>
              <Checkbox
                checked={values.directPurchase === 'Y'}
                onCheckedChange={() => handleDirectPurchaseChange('Y')}
                id='direct-purchase-y'
              />
              <label htmlFor='direct-purchase-y' className='text-black-main text-[12px] tracking-[-0.5%] cursor-pointer'>
                Y
              </label>
            </section>
          </section>
        </FilterField>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.fabricCode.discontinuedInProd')} labelWidth={130} labelClassName='text-[12px] font-[600]'>
          <section className='flex items-center gap-4'>
            <section className='flex items-center gap-2'>
              <Checkbox
                checked={values.discontinuedInProd === 'Y'}
                onCheckedChange={() => handleDisContinuedInProduction('Y')}
                id='direct-purchase-y'
              />
              <label htmlFor='direct-purchase-y' className='text-black-main text-[12px] tracking-[-0.5%] cursor-pointer'>
                Y
              </label>
            </section>
          </section>
        </FilterField>
      </BaseLayoutFilterItem>
      <BaseLayoutFilterItem>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.fabricCode.printDesign')} labelWidth={150} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.ENUMS, 'filtersPlaceholder.fabricCode.printDesign')}
            classNameSelectTrigger='w-[130px] text-[12px]'
            value={values.printDesign}
            onChange={(v) => handleChange('printDesign', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='design-A' className='text-[12px] font-[400]'>Design A</SelectItem>
            <SelectItem value='design-B' className='text-[12px] font-[400]'>Design B</SelectItem>
            <SelectItem value='design-C' className='text-[12px] font-[400]'>Design C</SelectItem>
          </SelectCustom>
        </FilterField>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.fabricCode.color')} labelWidth={150} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.ENUMS, 'filtersPlaceholder.fabricCode.color')}
            classNameSelectTrigger='w-[130px] text-[12px]'
            value={values.color}
            onChange={(v) => handleChange('color', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='black' className='text-[12px] font-[400]'>Black</SelectItem>
            <SelectItem value='white' className='text-[12px] font-[400]'>White</SelectItem>
            <SelectItem value='yellow' className='text-[12px] font-[400]'>Yellow</SelectItem>
          </SelectCustom>
        </FilterField>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.fabricCode.btNo')} labelWidth={150} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.ENUMS, 'filtersPlaceholder.fabricCode.btNo')}
            classNameSelectTrigger='w-[130px] text-[12px]'
            value={values.btNo}
            onChange={(v) => handleChange('btNo', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='165B' className='text-[12px] font-[400]'>165B</SelectItem>
            <SelectItem value='166B' className='text-[12px] font-[400]'>166B</SelectItem>
            <SelectItem value='167B' className='text-[12px] font-[400]'>167B</SelectItem>
          </SelectCustom>
        </FilterField>
      </BaseLayoutFilterItem>
      <BaseLayoutFilterItem>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.fabricCode.prodSpec')} labelWidth={150} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder='Select'
            classNameSelectTrigger='w-[130px] text-[12px]'
            value={values.prodSpec}
            onChange={(v) => handleChange('prodSpec', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='ALL' className='text-[12px] font-[400]'>ALL</SelectItem>
            <SelectItem value='greige' className='text-[12px] font-[400]'>Greige Weight</SelectItem>
            <SelectItem value='processed' className='text-[12px] font-[400]'>Processed Weight</SelectItem>
            <SelectItem value='length' className='text-[12px] font-[400]'>Length (YD)</SelectItem>
          </SelectCustom>
        </FilterField>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.fabricCode.prodUnits')} labelWidth={150} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder='Select'
            classNameSelectTrigger='w-[130px] text-[12px]'
            value={values.prodUnits}
            onChange={(v) => handleChange('prodUnits', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='ALL' className='text-[12px] font-[400]'>ALL</SelectItem>
            <SelectItem value='yd' className='text-[12px] font-[400]'>YD</SelectItem>
            <SelectItem value='kg' className='text-[12px] font-[400]'>KG</SelectItem>
            <SelectItem value='ed' className='text-[12px] font-[400]'>ED</SelectItem>
            <SelectItem value='set' className='text-[12px] font-[400]'>SET</SelectItem>
          </SelectCustom>
        </FilterField>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.fabricCode.saleUnits')} labelWidth={150} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder='Select'
            classNameSelectTrigger='w-[130px] text-[12px]'
            value={values.saleUnits || 'ALL'}
            onChange={(v) => handleChange('saleUnits', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='ALL' className='text-[12px] font-[400]'>ALL</SelectItem>
            <SelectItem value='yd' className='text-[12px] font-[400]'>YD</SelectItem>
            <SelectItem value='kg' className='text-[12px] font-[400]'>KG</SelectItem>
            <SelectItem value='ed' className='text-[12px] font-[400]'>ED</SelectItem>
            <SelectItem value='set' className='text-[12px] font-[400]'>SET</SelectItem>
          </SelectCustom>
        </FilterField>
      </BaseLayoutFilterItem>
      <BaseLayoutFilterItem onSearch={onSearch}>
        <FilterField label={t(TRANSLATE_KEYS.ACTION, 'search')} labelWidth={250} labelClassName='text-[12px] font-[600]'>
          <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterSearchKeyword')} className='border-none'/>
        </FilterField>
      </BaseLayoutFilterItem>
    </BaseLayoutFilter>
  )
}

export default FabricCodeFilters

