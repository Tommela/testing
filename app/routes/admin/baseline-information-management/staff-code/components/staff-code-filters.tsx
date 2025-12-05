import { useState } from 'react'

import SelectCustom from '~/components/customs/select-custom'
import { FilterField } from '~/components/features/filters/filter-field'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { SelectItem } from '~/components/ui/select'
import { Button } from '~/components/ui/button'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'
import { BaseLayoutFilter } from '~/layouts/base-layout-filter'
import BaseLayoutFilterItem from '~/layouts/base-layout-filter-item'
import type { IHRInformationResponse } from '~/services/api/baseline-information-management/hr-information.service'

export interface IStaffCodeFilters {
  department?: string
  name?: string
  employeeNo?: string
  jobTitle?: string
  employmentStatus?: string[] // Array of selected employment status IDs
  searchTerm?: string
}

interface IStaffCodeFiltersProps {
  values: IStaffCodeFilters
  onChange: (values: IStaffCodeFilters) => void
  onSearch: () => void
  // HR data for filters
  departmentData: IHRInformationResponse[]
  jobTitleData: IHRInformationResponse[]
  employmentStatusData: IHRInformationResponse[]
  uniqueNamesData: string[]
  uniqueEmpnoData: string[]
  isLoadingHRData?: boolean
}

const StaffCodeFilters = ({
  values,
  onChange,
  onSearch,
  departmentData,
  jobTitleData,
  employmentStatusData,
  uniqueNamesData,
  uniqueEmpnoData,
  isLoadingHRData = false
}: IStaffCodeFiltersProps) => {
  const { t } = useAppTranslations()
  const [searchTerm, setSearchTerm] = useState(values.searchTerm || '')

  const handleChange = <K extends keyof IStaffCodeFilters>(key: K, value: IStaffCodeFilters[K]) => {
    onChange({ ...values, [key]: value })
  }

  const handleEmploymentStatusChange = (statusId: string, checked: boolean) => {
    const currentStatuses = Array.isArray(values.employmentStatus)
      ? values.employmentStatus
      : []
    if (checked) {
      // Add status ID to array if not already present
      if (!currentStatuses.includes(statusId)) {
        handleChange('employmentStatus', [...currentStatuses, statusId])
      }
    } else {
      // Remove status ID from array
      handleChange('employmentStatus', currentStatuses.filter(id => id !== statusId))
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
      {/* First Row: 4 Dropdowns */}
      <BaseLayoutFilterItem>
        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'department')} labelWidth={82} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectDepartment')}
            classNameSelectTrigger='w-[147px]'
            value={values.department}
            onChange={(v) => handleChange('department', v)}
            className='text-[12px] font-[400]'
          >
            {departmentData.length > 0 ? (
              departmentData.map((department) => (
                <SelectItem key={department.id} value={department.id} className='text-[12px]'>
                  {department.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value='no-data' disabled className='text-[12px] text-gray-400'>
                {t(TRANSLATE_KEYS.MESSAGE, 'noDataAvailable') || 'No data available'}
              </SelectItem>
            )}
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'name')} labelWidth={82} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectName')}
            classNameSelectTrigger='w-[153px]'
            value={values.name}
            onChange={(v) => handleChange('name', v)}
            className='text-[12px] font-[400]'
          >
            {uniqueNamesData.length > 0 ? (
              uniqueNamesData.map((name) => (
                <SelectItem key={name} value={name} className='text-[12px]'>
                  {name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value='no-data' disabled className='text-[12px] text-gray-400'>
                {t(TRANSLATE_KEYS.MESSAGE, 'noDataAvailable') || 'No data available'}
              </SelectItem>
            )}
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'employeeNo')} labelWidth={82} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectEmployeeNo')}
            classNameSelectTrigger='w-[153px]'
            value={values.employeeNo}
            onChange={(v) => handleChange('employeeNo', v)}
            className='text-[12px] font-[400]'
          >
            {uniqueEmpnoData.length > 0 ? (
              uniqueEmpnoData.map((empNo) => (
                <SelectItem key={empNo} value={empNo} className='text-[12px]'>
                  {empNo}
                </SelectItem>
              ))
            ) : (
              <SelectItem value='no-data' disabled className='text-[12px] text-gray-400'>
                {t(TRANSLATE_KEYS.MESSAGE, 'noDataAvailable') || 'No data available'}
              </SelectItem>
            )}
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'jobTitle')} labelWidth={82} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectJobTitle')}
            classNameSelectTrigger='w-[153px]'
            value={values.jobTitle}
            onChange={(v) => handleChange('jobTitle', v)}
            className='text-[12px] font-[400]'
          >
            {jobTitleData.length > 0 ? (
              jobTitleData.map((jobTitle) => (
                <SelectItem key={jobTitle.id} value={jobTitle.id} className='text-[12px]'>
                  {jobTitle.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value='no-data' disabled className='text-[12px] text-gray-400'>
                {t(TRANSLATE_KEYS.MESSAGE, 'noDataAvailable') || 'No data available'}
              </SelectItem>
            )}
          </SelectCustom>
        </FilterField>
      </BaseLayoutFilterItem>

      {/* Second Row: Employment Status */}
      <BaseLayoutFilterItem>
        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'employmentStatus')} labelWidth={85} labelClassName='text-[12px] font-[600] py-2'>
          <section className='flex items-center gap-4'>
            {isLoadingHRData ? (
              <section className='flex items-center gap-2'>
                <span className='text-[12px] text-gray-500'>
                  {'Loading...'}
                </span>
              </section>
            ) : employmentStatusData.length > 0 ? (
              employmentStatusData.map((status) => {
                const employmentStatusArray = Array.isArray(values.employmentStatus)
                  ? values.employmentStatus
                  : []
                const isChecked = employmentStatusArray.includes(status.id)
                return (
                  <section key={status.id} className='flex items-center gap-2'>
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => handleEmploymentStatusChange(status.id, !!checked)}
                      id={`employment-status-${status.id}`}
                      disabled={isLoadingHRData}
                    />
                    <label htmlFor={`employment-status-${status.id}`} className={`text-black-main ${isChecked && 'font-[600]'} text-[12px] leading-[20px] tracking-[-0.5%] cursor-pointer`}>
                      {status.name}
                    </label>
                  </section>
                )
              })
            ) : (
              <section className='flex items-center gap-2'>
                <span className='text-[12px] text-gray-400'>
                  {t(TRANSLATE_KEYS.MESSAGE, 'noDataAvailable') || 'No employment status data available'}
                </span>
              </section>
            )}
          </section>
        </FilterField>
      </BaseLayoutFilterItem>

      {/* Third Row: Search Bar */}
      <BaseLayoutFilterItem onSearch={handleSearch}>
        <FilterField label={t(TRANSLATE_KEYS.ACTION, 'search')} labelWidth={75} labelClassName='text-[12px] font-[600]'>
          <Input
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterSearchTerm')}
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            className=' border-none w-[300px]'
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

export default StaffCodeFilters

