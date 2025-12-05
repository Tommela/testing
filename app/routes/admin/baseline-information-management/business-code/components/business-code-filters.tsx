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

export interface IBusinessCodeFilters {
  businessCategory?: string
  partnerName?: string
  vatStatus?: 'Y' | 'N' | undefined
  transactionEndStatus?: 'Y' | 'N' | undefined
  searchTerm?: string
}

interface IBusinessCodeFiltersProps {
  values: IBusinessCodeFilters
  onChange: (values: IBusinessCodeFilters) => void
  onSearch: () => void
}

const BusinessCodeFilters = ({ values, onChange, onSearch }: IBusinessCodeFiltersProps) => {
  const { t } = useAppTranslations()
  const [searchTerm, setSearchTerm] = useState(values.searchTerm || '')

  const handleChange = <K extends keyof IBusinessCodeFilters>(key: K, value: IBusinessCodeFilters[K]) => {
    onChange({ ...values, [key]: value })
  }

  const handleVatStatusChange = (value: 'Y' | 'N') => {
    // Toggle: if same value clicked, uncheck it
    if (values.vatStatus === value) {
      handleChange('vatStatus', undefined)
    } else {
      handleChange('vatStatus', value)
    }
  }

  const handleTransactionEndStatusChange = (value: 'Y' | 'N') => {
    // Toggle: if same value clicked, uncheck it
    if (values.transactionEndStatus === value) {
      handleChange('transactionEndStatus', undefined)
    } else {
      handleChange('transactionEndStatus', value)
    }
  }

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value)
    handleChange('searchTerm', value)
  }

  const handleSearch = () => {
    handleChange('searchTerm', searchTerm)
    onSearch()
  }

  return (
    <BaseLayoutFilter onSearchMobile={onSearch}>
      {/* First Row: Company Type, Company Name, VAT Status, Transaction End Status */}
      <BaseLayoutFilterItem>
        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'companyType')} labelWidth={100} labelClassName='text-[12px] font-[600] whitespace-nowrap'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectCompanyType')}
            classNameSelectTrigger='w-[147px]'
            value={values.businessCategory}
            onChange={(v) => handleChange('businessCategory', v)}
          >
            <SelectItem value='originator'>Originator</SelectItem>
            <SelectItem value='manufacturer'>Manufacturer</SelectItem>
            <SelectItem value='supplier'>Supplier</SelectItem>
            <SelectItem value='partner'>Partner</SelectItem>
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'companyName')} labelWidth={100} labelClassName='text-[12px] font-[600] whitespace-nowrap'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectCompanyName')}
            classNameSelectTrigger='w-[153px]'
            value={values.partnerName}
            onChange={(v) => handleChange('partnerName', v)}
          >
            <SelectItem value='company-a'>Company A</SelectItem>
            <SelectItem value='company-b'>Company B</SelectItem>
            <SelectItem value='company-c'>Company C</SelectItem>
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'vatStatus')} labelWidth={110} labelClassName='text-[12px] font-[600] whitespace-nowrap'>
          <section className='flex items-center gap-2'>
            <Checkbox
              checked={values.vatStatus === 'Y'}
              onCheckedChange={() => handleVatStatusChange('Y')}
              id='vat-status-y'
            />
            <label htmlFor='vat-status-y' className='text-black-main leading-[20px] tracking-[-0.5%] cursor-pointer'>
              Y
            </label>
          </section>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'transactionEndStatus')} labelWidth={140} labelClassName='text-[12px] font-[600] whitespace-nowrap'>
          <section className='flex items-center gap-2'>
            <Checkbox
              checked={values.transactionEndStatus === 'Y'}
              onCheckedChange={() => handleTransactionEndStatusChange('Y')}
              id='transaction-end-status-y'
            />
            <label htmlFor='transaction-end-status-y' className='text-black-main leading-[20px] tracking-[-0.5%] cursor-pointer'>
              Y
            </label>
          </section>
        </FilterField>
      </BaseLayoutFilterItem>

      {/* Second Row: Search Bar */}
      <BaseLayoutFilterItem onSearch={handleSearch}>
        <FilterField label={t(TRANSLATE_KEYS.ACTION, 'search')} labelWidth={100} labelClassName='text-[12px] font-[600] whitespace-nowrap'>
          <Input
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterSearchTerm')}
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            className='w-[300px]'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
        </FilterField>
      </BaseLayoutFilterItem>
    </BaseLayoutFilter>
  )
}

export default BusinessCodeFilters

