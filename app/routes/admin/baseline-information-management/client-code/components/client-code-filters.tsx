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

export interface ClientCodeFilterTypes {
  clientCategory?: string
  clientTiers?: string
  companyName?: string
  brandName?: string
}

interface ClientCodeFiltersProps {
  values: ClientCodeFilterTypes
  onChange: (values: ClientCodeFilterTypes) => void
  onSearch: () => void
}

const FabricCodeFilters = ({ values, onChange, onSearch }: ClientCodeFiltersProps) => {
  const { t } = useAppTranslations()

  const handleChange = <K extends keyof ClientCodeFilterTypes>(key: K, value: ClientCodeFilterTypes[K]) => {
    onChange({ ...values, [key]: value })
  }

  return (
    <BaseLayoutFilter onSearchMobile={onSearch}>
      <BaseLayoutFilterItem onSearch={onSearch}>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.clientCode.clientCategory')} labelWidth={80} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.ENUMS, 'filtersPlaceholder.clientCode.clientCategory')}
            classNameSelectTrigger='w-[120px] text-[12px]'
            value={values.clientCategory}
            onChange={(v) => handleChange('clientCategory', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='ALL' className='text-[12px] font-[400]'>ALL</SelectItem>
            <SelectItem value='greige' className='text-[12px] font-[400]'>Greige Weight</SelectItem>
            <SelectItem value='processed' className='text-[12px] font-[400]'>Processed Weight</SelectItem>
            <SelectItem value='length' className='text-[12px] font-[400]'>Length (YD)</SelectItem>
          </SelectCustom>
        </FilterField>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.clientCode.clientTiers')} labelWidth={80} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.ENUMS, 'filtersPlaceholder.clientCode.clientTiers')}
            classNameSelectTrigger='w-[120px] text-[12px]'
            value={values.clientTiers}
            onChange={(v) => handleChange('clientTiers', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='ALL' className='text-[12px] font-[400]'>ALL</SelectItem>
            <SelectItem value='yd' className='text-[12px] font-[400]'>YD</SelectItem>
            <SelectItem value='kg' className='text-[12px] font-[400]'>KG</SelectItem>
            <SelectItem value='ed' className='text-[12px] font-[400]'>ED</SelectItem>
            <SelectItem value='set' className='text-[12px] font-[400]'>SET</SelectItem>
          </SelectCustom>
        </FilterField>
        <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.clientCode.companyName')} labelWidth={80} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.ENUMS, 'filtersPlaceholder.clientCode.companyName')}
            classNameSelectTrigger='w-[120px] text-[12px]'
            value={values.companyName}
            onChange={(v) => handleChange('companyName', v)}
            className='text-[12px] font-[400]'
          >
            <SelectItem value='ALL' className='text-[12px] font-[400]'>ALL</SelectItem>
            <SelectItem value='yd' className='text-[12px] font-[400]'>YD</SelectItem>
            <SelectItem value='kg' className='text-[12px] font-[400]'>KG</SelectItem>
            <SelectItem value='ed' className='text-[12px] font-[400]'>ED</SelectItem>
            <SelectItem value='set' className='text-[12px] font-[400]'>SET</SelectItem>
          </SelectCustom>
        </FilterField>
         <FilterField label={t(TRANSLATE_KEYS.ENUMS, 'filters.clientCode.brandName')} labelWidth={100} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.ENUMS, 'filtersPlaceholder.clientCode.brandName')}
            classNameSelectTrigger='w-[120px] text-[12px]'
            value={values.brandName}
            onChange={(v) => handleChange('brandName', v)}
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
    </BaseLayoutFilter>
  )
}

export default FabricCodeFilters

