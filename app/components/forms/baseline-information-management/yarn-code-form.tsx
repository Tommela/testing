import { useEffect } from 'react'

import type { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { DATA, TRANSLATE_KEYS } from '~/constants'
import { commonHelper } from '~/helpers'
import type { YarnCodeFormSchema } from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import { type IYarn, type ICategory } from '~/types'
import { eYarnCodeFormKey } from '~/types/enums/form.enum'

interface IYarnCodeFormProps {
  form: UseFormReturn<YarnCodeFormSchema>
  data?: IYarn
  categories?: ICategory[]
}
const YarnCodeForm = ({ form, data, categories = [] }: IYarnCodeFormProps) => {
  const { t } = useAppTranslations()
  useEffect(() => {
    if (!commonHelper.isEmpty(data)) {
      setTimeout(() => {
        form.reset({
          [eYarnCodeFormKey.YarnType]: data.category?.name || '',
          [eYarnCodeFormKey.YarnName]: data.name || '',
          [eYarnCodeFormKey.YarnColor]: data.color || '',
          [eYarnCodeFormKey.Note]: data.note || ''
        })
      })
    }
  }, [data, form])

  return (
    <Form {...form}>
      <form className='grid grid-cols-2 gap-space-main items-start'>
        {/* Yarn type */}
        <FormField
          control={form.control}
          name={eYarnCodeFormKey.YarnType}
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.INPUT_LABEL, 'yarnType')}</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  form.trigger(eYarnCodeFormKey.YarnType)
                }}
                value={field.value ?? ''}
              >
                <FormControl className='w-full'>
                  <SelectTrigger iconCustom className='text-sm font-medium'>
                    <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'yarnType')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => {
                    return (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {DATA.GET_BASE_INPUT_YARN_CODE(t).map((input) => {
          return (
            <FormField
              key={input.key}
              control={form.control}
              name={input.key}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{input.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={input.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}
      </form>
    </Form>
  )
}

export default YarnCodeForm
