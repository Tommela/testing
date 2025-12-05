import { useEffect, useState } from 'react'

import type { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Checkbox } from '~/components/ui/checkbox'
import { DATA, TRANSLATE_KEYS } from '~/constants'
import { commonHelper } from '~/helpers'
import type { ItemCodeFormSchema } from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import { type IItemCode } from '~/types'
import { eItemCodeFormKey } from '~/types/enums/form.enum'

const MOCK_FABRIC_PART_OPTIONS = [
  { value: 'Bodyboard', label: 'Body' },
  { value: 'Sleeve', label: 'Sleeve' },
  { value: 'Collar', label: 'Collar' }
]

const MOCK_BUSINESS_CATEGORY_OPTIONS = [
  { value: 'Originator', label: 'Originator' },
  { value: 'Subcontractor', label: 'Subcontractor' },
  { value: 'Partner', label: 'Partner' }
]

const MOCK_PRODUCED_BY_OPTIONS = [
  { value: 'KnittingFactoryA', label: 'Knitting Factory A' },
  { value: 'KnittingFactoryB', label: 'Knitting Factory B' },
  { value: 'DyeingFactoryA', label: 'Dyeing Factory A' }
]

const MOCK_UNIT_OPTIONS = [
  { value: 'KG', label: 'KG' },
  { value: 'M', label: 'M' },
  { value: 'PCS', label: 'PCS' },
  { value: 'YARD', label: 'YARD' },
  { value: 'M2', label: 'M²' }
]

// Helper to get options including current value from data if not in options
const getOptionsWithCurrentValue = (options: Array<{ value: string; label: string }>, currentValue?: string, dataValue?: string) => {
  const result = [...options]
  // Use dataValue first (from props), then currentValue (from form field)
  const valueToCheck = dataValue || currentValue
  // If current value exists and is not in options, add it
  if (valueToCheck && !result.find((opt) => opt.value === valueToCheck)) {
    result.push({ value: valueToCheck, label: valueToCheck })
  }
  return result
}

// Helper to get unit options including current value from data
const getUnitOptions = (currentValue?: string, dataValue?: string) => {
  return getOptionsWithCurrentValue(MOCK_UNIT_OPTIONS, currentValue, dataValue)
}

interface IItemCodeFormDirectPurchaseProps {
  form: UseFormReturn<ItemCodeFormSchema, any, ItemCodeFormSchema>
  data?: IItemCode
}

const ItemCodeFormDirectPurchase = ({ form, data }: IItemCodeFormDirectPurchaseProps) => {
  const { t } = useAppTranslations()
  const [sameAsPurchase, setSameAsPurchase] = useState(false)

  useEffect(() => {
    if (!commonHelper.isEmpty(data)) {
      setTimeout(() => {
        form.reset({
          directPurchase: data?.directPurchase || 'Y',
          fabricPart: data?.fabricPart || '',
          businessCategory: data?.businessCategory || '',
          producedBy: data?.producedBy || '',
          productionUnit: data?.productionUnit || '',
          salesUnit: data?.salesUnit || '',
          discontinued: (data?.discontinued || 'N') as 'N' | 'Y',
          itemName: data?.itemName || '',
          saleItemName: data?.saleItemName || '',
          remarks: data?.remarks || ''
        })
      })
    }
  }, [data, form])

  const purchaseItemName = form.watch(eItemCodeFormKey.ItemName)

  useEffect(() => {
    if (sameAsPurchase) {
      form.setValue(eItemCodeFormKey.SaleItemName, purchaseItemName || '', { shouldValidate: true })
      form.clearErrors(eItemCodeFormKey.SaleItemName)
    }
  }, [sameAsPurchase, purchaseItemName, form])

  return (
    <Form {...form}>
      <form className='flex flex-col' style={{ gap: '30px' }}>
        {/* General Fabric Details */}
        <section className='grid grid-cols-6' style={{ gap: '30px' }}>
          <FormField
            control={form.control}
            name={eItemCodeFormKey.DirectPurchase}
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'directPurchase')}</FormLabel>
                {data ? (
                  <FormControl>
                    <Input value='Y' disabled className='w-full bg-gray-100' />
                  </FormControl>
                ) : (
                  <Select onValueChange={field.onChange} value='Y' disabled>
                    <FormControl>
                      <SelectTrigger className='w-full !text-[12px] !font-[400]'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Y' className='text-[12px] font-[400]'>Y</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={eItemCodeFormKey.FabricPart}
            render={({ field }) => {
              const fabricPartOptions = getOptionsWithCurrentValue(MOCK_FABRIC_PART_OPTIONS, field.value)
              return (
              <FormItem>
                <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'fabricPart')}</FormLabel>
                {data ? (
                  <FormControl>
                    <Input value={field.value || ''} disabled className='w-full bg-gray-100' />
                  </FormControl>
                ) : (
                  <>
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <FormControl>
                        <SelectTrigger className='w-full !text-[12px] !font-[400]'>
                          <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectPart')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          {fabricPartOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className='text-[12px] font-[400]'>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </>
                )}
              </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name={eItemCodeFormKey.BusinessCategory}
            render={({ field }) => {
              const businessCategoryOptions = getOptionsWithCurrentValue(MOCK_BUSINESS_CATEGORY_OPTIONS, field.value)
              return (
              <FormItem>
                <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'businessCategory')}</FormLabel>
                {data ? (
                  <FormControl>
                    <Input value={field.value || ''} disabled className='w-full bg-gray-100' />
                  </FormControl>
                ) : (
                  <>
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <FormControl>
                        <SelectTrigger className='w-full !text-[12px] !font-[400]'>
                          <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectCategory')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          {businessCategoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className='text-[12px] font-[400]'>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </>
                )}
              </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name={eItemCodeFormKey.ProducedBy}
            render={({ field }) => {
              const producedByOptions = getOptionsWithCurrentValue(MOCK_PRODUCED_BY_OPTIONS, field.value)
              return (
              <FormItem>
                <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.producedBy')}</FormLabel>
                {data ? (
                  <FormControl>
                    <Input value={field.value || ''} disabled className='w-full bg-gray-100' />
                  </FormControl>
                ) : (
                  <>
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <FormControl>
                        <SelectTrigger className='w-full !text-[12px] !font-[400]'>
                          <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectCompany')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          {producedByOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className='text-[12px] font-[400]'>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </>
                )}
              </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name={eItemCodeFormKey.ProductionUnit}
            render={({ field }) => {
              const unitOptions = getUnitOptions(field.value, data?.productionUnit)
              return (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'productionUnit')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || data?.productionUnit || ''}>
                    <FormControl>
                      <SelectTrigger className='w-full !text-[12px] !font-[400]'>
                        <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {unitOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className='text-[12px] font-[400]'>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name={eItemCodeFormKey.SalesUnit}
            render={({ field }) => {
              const unitOptions = getUnitOptions(field.value, data?.salesUnit)
              return (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'salesUnit')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || data?.salesUnit || ''}>
                    <FormControl>
                      <SelectTrigger className='w-full !text-[12px] !font-[400]'>
                        <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {unitOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className='text-[12px] font-[400]'>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', gap: '30px' }}>
          <FormField
            control={form.control}
            name={eItemCodeFormKey.Discontinued}
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'discontinued')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || 'N'}>
                  <FormControl>
                    <SelectTrigger className='w-full !text-[12px] !font-[400]'>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='N' className='text-[12px] font-[400]'>N</SelectItem>
                    <SelectItem value='Y' className='text-[12px] font-[400]'>Y</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={eItemCodeFormKey.ItemName}
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'purchaseItemName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'itemName')} className='w-full' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={eItemCodeFormKey.SaleItemName}
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between mb-2'>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'saleItemName')}</FormLabel>
                  <div className='flex items-center gap-2'>
                    <Checkbox
                      checked={sameAsPurchase}
                      onCheckedChange={(checked) => {
                        const isChecked = Boolean(checked)
                        setSameAsPurchase(isChecked)
                        if (isChecked) {
                          form.setValue(eItemCodeFormKey.SaleItemName, purchaseItemName || '', { shouldValidate: true })
                          form.clearErrors(eItemCodeFormKey.SaleItemName)
                        }
                      }}
                    />
                    <span className='text-sm text-gray-700'>{t(TRANSLATE_KEYS.LABEL, 'sameAsPurchase')}</span>
                  </div>
                </div>
                <FormControl>
                  <Input
                    placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'itemName')}
                    className={`w-full ${sameAsPurchase ? 'bg-gray-100' : ''}`}
                    disabled={sameAsPurchase}
                    {...field}
                  />
                </FormControl>
                {!sameAsPurchase && <FormMessage />}
              </FormItem>
            )}
          />
        </section>

        <section>
          <FormField
            control={form.control}
            name={eItemCodeFormKey.Remarks}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'remarks')}</FormLabel>
                <FormControl>
                  <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} className='w-full' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
      </form>
    </Form>
  )
}

export default ItemCodeFormDirectPurchase

