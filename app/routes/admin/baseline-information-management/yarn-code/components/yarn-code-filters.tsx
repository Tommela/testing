import SelectCustom from '~/components/customs/select-custom'
import { FilterField } from '~/components/features/filters/filter-field'
import { SelectItem } from '~/components/ui/select'
import { DATA, TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'
import { BaseLayoutFilter } from '~/layouts/base-layout-filter'
import BaseLayoutFilterItem from '~/layouts/base-layout-filter-item'
import type { ICategory, IYarnCodeFilters, eYarnType } from '~/types'

interface IYarnCodeFiltersProps {
  values: IYarnCodeFilters
  onChange: (values: IYarnCodeFilters) => void
  onSearch: () => void
  categories: ICategory[]
  uniqueYarnNames: string[]
  uniqueYarnColors: string[]
}

const YarnCodeFilters = ({ values, onChange, onSearch, categories, uniqueYarnNames, uniqueYarnColors }: IYarnCodeFiltersProps) => {
  const { t } = useAppTranslations()

  const handleChange = <K extends keyof IYarnCodeFilters>(key: K, value: IYarnCodeFilters[K]) => {
    onChange({ ...values, [key]: value })
  }

  return (
    <BaseLayoutFilter onSearchMobile={onSearch}>
      <BaseLayoutFilterItem onSearch={onSearch}>
        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'yarnType')} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectYarnType')}
            classNameSelectTrigger='w-[129px] text-[12px]'
            value={values.yarnType}
            onChange={(v) => handleChange('yarnType', v as eYarnType)}
            className='text-[12px] font-[400]'
          >
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id || ''} className='text-[12px] font-[400]'>
                {category.name}
              </SelectItem>
            ))}
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'yarnName')} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectTheOriginalName')}
            classNameSelectTrigger='w-[115px] text-[12px]'
            className='text-[12px] font-[400]'
            value={values.yarnName}
            onChange={(v) => handleChange('yarnName', v as string)}
          >
            {uniqueYarnNames.map((name) => (
              <SelectItem key={name} value={name} className='text-[12px] font-[400]'>
                {name}
              </SelectItem>
            ))}
          </SelectCustom>
        </FilterField>

        <FilterField label={t(TRANSLATE_KEYS.LABEL, 'yarnColor')} labelClassName='text-[12px] font-[600]'>
          <SelectCustom
            placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectTheColor')}
            classNameSelectTrigger='w-[102px] text-[12px]'
            className='text-[12px] font-[400]'
            value={values.yarnColor}
            onChange={(v) => handleChange('yarnColor', v as string)}
          >
            {uniqueYarnColors.map((color) => (
              <SelectItem key={color} value={color} className='text-[12px] font-[400]'>
                {color}
              </SelectItem>
            ))}
          </SelectCustom>
        </FilterField>
      </BaseLayoutFilterItem>
    </BaseLayoutFilter>
  )
}

export default YarnCodeFilters
