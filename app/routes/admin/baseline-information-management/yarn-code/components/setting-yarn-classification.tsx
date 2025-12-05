import { useEffect, useState } from 'react'

import clsx from 'clsx'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { DATA, TRANSLATE_KEYS } from '~/constants'
import type { SettingYarnFormSchema } from '~/helpers'
import useAppTranslations from '~/hooks/use-app-translations'
import { type ICategory, eYarnType } from '~/types'
import { eSettingYarnFormKey } from '~/types/enums/form.enum'

interface ISettingYarnCategoryClassificationProps {
  form: UseFormReturn<SettingYarnFormSchema>
  categories: ICategory[]
  loadingCategories: boolean
  selectedCategory: ICategory | null
  onSelectCategory: (category: ICategory) => void
  onNewCategory: () => void
  onDeleteCategory: (category: ICategory, event: React.MouseEvent) => void
}
const SettingYarnClassification = ({
  form,
  categories,
  loadingCategories,
  selectedCategory,
  onSelectCategory,
  onNewCategory,
  onDeleteCategory
}: ISettingYarnCategoryClassificationProps) => {
  const { t } = useAppTranslations()

  return (
    <section className='grid grid-cols-2 my-[-15px]'>
      <article className='flex flex-col'>
        <section
          className='flex items-center gap-1 py-3 px-space-main cursor-pointer'
          onClick={onNewCategory}
        >
          <PlusCircleIcon className='w-[22px] h-[22px] text-black-main' />
          <p className='text-[12px] font-[400] tracking-[-0.5%]'>{t(TRANSLATE_KEYS.LABEL, 'newYarnClassification')}</p>
        </section>
        <section className='flex flex-col max-h-[300px] overflow-y-auto'>
          {loadingCategories ? (
            <div className="flex items-center justify-center py-4 ">
              <p className="text-gray-500 text-[12px] font-[400]">{t(TRANSLATE_KEYS.MESSAGE, 'loadingCategories')}</p>
            </div>
          ) : categories.length > 0 ? (
            categories.map((category) => {
              const isActive = selectedCategory?.id === category.id
              return (
                <section
                  key={category.id}
                  className={clsx(
                    'border-t-1 last:border-b-1 border-b-[#F2F4F7] border-t-[#F2F4F7] group flex items-center justify-between gap-5 py-3 px-space-main cursor-pointer hover:bg-primary-main/5',
                    isActive ? 'bg-primary-main/5 text-primary-main' : 'bg-white text-black-main'
                  )}
                  onClick={() => onSelectCategory(category)}
                >
                  <p className='text-[12px] font-[400] tracking-[-0.5$]'>{category.name}</p>
                  <Trash2Icon
                    className='w-4 h-4 text-gray-main opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-500 cursor-pointer'
                    onClick={(e) => onDeleteCategory(category, e)}
                  />
                </section>
              )
            })
          ) : (
            <div className="flex items-center justify-center py-4">
              <p className="text-gray-500">{t(TRANSLATE_KEYS.MESSAGE, 'noCategoriesFound')}</p>
            </div>
          )}
        </section>
      </article>
      <Form {...form}>
        <form className='w-full p-space-main border-l border-light-gray'>
          {/* Yarn type */}
          <FormField
            control={form.control}
            name={eSettingYarnFormKey.YarnType}
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired className='text-[12px] font-[600]'>{t(TRANSLATE_KEYS.INPUT_LABEL, 'yarnType')}</FormLabel>
                <FormControl>
                  <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'yarnType')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="mt-4">
            <Button
              type="button"
              onClick={handleAddNewCategory}
              disabled={isAddingNew || !form.getValues(eSettingYarnFormKey.YarnType)?.trim()}
              className="w-full bg-primary-main hover:bg-primary-main/90"
            >
              {isAddingNew ? t(TRANSLATE_KEYS.ACTION, 'saving') || 'Saving...' : t(TRANSLATE_KEYS.ACTION, 'save') || 'Save'}
            </Button>
          </div> */}
        </form>
      </Form>
    </section>
  )
}

export default SettingYarnClassification
