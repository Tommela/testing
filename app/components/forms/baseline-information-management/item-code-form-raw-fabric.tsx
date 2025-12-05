import { useEffect, useRef, useState } from 'react'

import { Search } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Checkbox } from '~/components/ui/checkbox'
import { Button } from '~/components/ui/button'
import { DATA, TRANSLATE_KEYS } from '~/constants'
import { commonHelper } from '~/helpers'
import type { ItemCodeFormSchema } from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import { type IItemCode } from '~/types'
import { eItemCodeFormKey } from '~/types/enums/form.enum'
import { Trash2 } from 'lucide-react'

interface IYarnComposition {
  id: string
  category: string
  yarnName: string
  yarnColor: string
  ratio: number
  loss: number
}

interface IItemCodeFormRawFabricProps {
  form: UseFormReturn<ItemCodeFormSchema, any, ItemCodeFormSchema>
  data?: IItemCode
  onCompositionChange?: (changed: boolean) => void
}

import { MOCK_YARN_CODE_DATA } from '~/mocks/item-code.mock'

// Use mock yarn data from centralized mock file
const mockYarnData = MOCK_YARN_CODE_DATA

// Mock data for dropdowns - replace with actual API calls
const MOCK_FABRIC_PART_OPTIONS = [
  { value: 'Bodyboard', label: 'Bodyboard' },
  { value: 'Sleeve', label: 'Sleeve' },
  { value: 'Collar', label: 'Collar' },
  { value: 'Pocket', label: 'Pocket' }
]

const MOCK_BUSINESS_CATEGORY_OPTIONS = [
  { value: 'Originator', label: 'Originator' },
  { value: 'Manufacturer', label: 'Manufacturer' },
  { value: 'Supplier', label: 'Supplier' },
  { value: 'Partner', label: 'Partner' }
]

const MOCK_PRODUCED_BY_OPTIONS = [
  { value: 'KnittingFactoryA', label: 'Knitting Factory A' },
  { value: 'KnittingFactoryB', label: 'Knitting Factory B' },
  { value: 'DyeingFactoryA', label: 'Dyeing Factory A' },
  { value: 'WeavingFactoryA', label: 'Weaving Factory A' }
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

const getCompositionSignature = (list: IYarnComposition[]) =>
  list
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((comp) => `${comp.id}:${comp.ratio}:${comp.loss}`)
    .join('|')

const ItemCodeFormRawFabric = ({ form, data, onCompositionChange }: IItemCodeFormRawFabricProps) => {
  const { t } = useAppTranslations()
  const [selectedYarns, setSelectedYarns] = useState<string[]>([])
  const [yarnComposition, setYarnComposition] = useState<IYarnComposition[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories')
  const initialCompositionSignatureRef = useRef<string>('')

  useEffect(() => {
    if (!commonHelper.isEmpty(data)) {
      setTimeout(() => {
        form.reset({
          directPurchase: data?.directPurchase || 'N',
          fabricPart: data?.fabricPart || '',
          businessCategory: data?.businessCategory || '',
          producedBy: data?.producedBy || '',
          productionUnit: data?.productionUnit || '',
          salesUnit: data?.salesUnit || '',
          discontinued: (data?.discontinued || 'N') as 'N' | 'Y',
          itemName: data?.itemName || '',
          remarks: data?.remarks || ''
        })
        const yarnDetails = data?.yarnDetails ?? []
        if (yarnDetails.length) {
          setSelectedYarns(yarnDetails.map((detail) => detail.id))
          const mapped = yarnDetails.map((detail) => ({
            id: detail.id,
            category: detail.category,
            yarnName: detail.yarnName,
            yarnColor: detail.yarnColor,
            ratio: detail.ratio,
            loss: detail.loss
          }))
          setYarnComposition(mapped)
          initialCompositionSignatureRef.current = getCompositionSignature(mapped)
        } else {
          setSelectedYarns([])
          setYarnComposition([])
          initialCompositionSignatureRef.current = ''
        }
        onCompositionChange?.(false)
      })
    } else {
      setSelectedYarns([])
      setYarnComposition([])
      initialCompositionSignatureRef.current = ''
      onCompositionChange?.(false)
    }
  }, [data, form, onCompositionChange])

  useEffect(() => {
    if (!data) {
      onCompositionChange?.(false)
      return
    }
    const currentSignature = getCompositionSignature(yarnComposition)
    const hasChanged = currentSignature !== initialCompositionSignatureRef.current
    onCompositionChange?.(hasChanged)
  }, [yarnComposition, data, onCompositionChange])

  const filteredYarns = mockYarnData.filter((yarn) => {
    const matchesCategory = selectedCategory === 'All Categories' || yarn.category === selectedCategory
    const matchesSearch = yarn.yarnName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleYarnSelect = (yarnId: string) => {
    if (selectedYarns.includes(yarnId)) {
      setSelectedYarns(selectedYarns.filter((id) => id !== yarnId))
      setYarnComposition(yarnComposition.filter((comp) => comp.id !== yarnId))
    } else {
      const yarn = mockYarnData.find((y) => y.id === yarnId)
      if (yarn) {
        setSelectedYarns([...selectedYarns, yarnId])
        setYarnComposition([
          ...yarnComposition,
          {
            id: yarnId,
            category: yarn.category,
            yarnName: yarn.yarnName,
            yarnColor: yarn.yarnColor,
            ratio: 0,
            loss: 0
          }
        ])
      }
    }
  }

  const handleDeleteComposition = (id: string) => {
    setSelectedYarns(selectedYarns.filter((yarnId) => yarnId !== id))
    setYarnComposition(yarnComposition.filter((comp) => comp.id !== id))
  }

  const handleRatioChange = (id: string, value: string) => {
    const numValue = parseInt(value) || 0
    setYarnComposition(
      yarnComposition.map((comp) => (comp.id === id ? { ...comp, ratio: numValue } : comp))
    )
  }

  const handleLossChange = (id: string, value: string) => {
    const numValue = parseInt(value) || 0
    setYarnComposition(
      yarnComposition.map((comp) => (comp.id === id ? { ...comp, loss: numValue } : comp))
    )
  }

  const totalRatio = yarnComposition.reduce((sum, comp) => sum + comp.ratio, 0)
  const hasRatioError = totalRatio > 100
  const hasLossError = yarnComposition.some((comp) => comp.loss > 100)

  return (
    <Form {...form}>
      <form className='flex flex-col gap-5'>
        {/* General Fabric Details */}
        <section className='grid grid-cols-6 gap-5'>
          <FormField
            control={form.control}
            name={eItemCodeFormKey.DirectPurchase}
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'directPurchase')}</FormLabel>
                <Select onValueChange={field.onChange} value='N' disabled>
                  <FormControl>
                    <SelectTrigger className='w-full !text-[12px] !font-[400]'>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='N' className='text-[12px] font-[400]'>N</SelectItem>
                  </SelectContent>
                </Select>
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

        <section className='grid grid-cols-4 gap-5'>
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
                <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'itemName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'itemName')} className='w-full' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={eItemCodeFormKey.Remarks}
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'remarks')}</FormLabel>
                <FormControl>
                  <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} className='w-full' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* Yarn Selection and Composition */}
        <div className='pt-1.5 mt-4'>
          <hr className='mb-5' />
          <section className='grid gap-5' style={{ gridTemplateColumns: '2fr 3fr' }}>
            {/* Left: Search and Select Yarns */}
            <div className='flex flex-col gap-5'>
              <h3 className='text-[15px] font-[600]'>{t(TRANSLATE_KEYS.FORM, 'yarnSearchAndSelection')}</h3>

              {/* Category and Search */}
              <div className='flex gap-2'>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className='w-[150px] !text-[12px] !font-[400]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='All Categories' className='text-[12px] font-[400]'>{t(TRANSLATE_KEYS.FORM, 'allCategories')}</SelectItem>
                    <SelectItem value='Spun yarn' className='text-[12px] font-[400]'>{t(TRANSLATE_KEYS.ENUMS, 'yarnType.spunYarn')}</SelectItem>
                    {/* Add more categories */}
                  </SelectContent>
                </Select>

                <div className='relative flex-1'>
                  <Input
                    placeholder={t(TRANSLATE_KEYS.FORM, 'searchYarnName')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pr-10'
                  />
                  <Search className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                </div>
              </div>

              {/* Yarn List Table */}
              <div className='border rounded-lg overflow-hidden flex flex-col h-[400px]'>
                <div className='overflow-y-auto flex-1'>
                  <table className='w-full'>
                    <thead className='bg-gray-50 sticky top-0 z-10'>
                      <tr>
                        <th className='px-4 py-2 text-left text-[12px] font-[400]'>{t(TRANSLATE_KEYS.FORM, 'select')}</th>
                        <th className='px-4 py-2 text-left text-[12px] font-[400]'>{t(TRANSLATE_KEYS.FORM, 'category')}</th>
                        <th className='px-4 py-2 text-left text-[12px] font-[400]'>{t(TRANSLATE_KEYS.FORM, 'yarnName')}</th>
                        <th className='px-4 py-2 text-left text-[12px] font-[400]'>{t(TRANSLATE_KEYS.FORM, 'yarnColor')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredYarns.length > 0 ? (
                        filteredYarns.map((yarn) => {
                          const isSelected = selectedYarns.includes(yarn.id)
                          return (
                            <tr
                              key={yarn.id}
                              className='border-t hover:bg-gray-50'
                              style={{
                                backgroundColor: isSelected ? '#00C6A21A' : 'transparent'
                              }}
                            >
                              <td className='px-4 py-2'>
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => handleYarnSelect(yarn.id)}
                                  className='data-[state=checked]:bg-[#00C6A2] data-[state=checked]:border-[#00C6A2]'
                                />
                              </td>
                              <td className='px-4 py-2 text-[12px] font-[400]'>{yarn.category}</td>
                              <td className='px-4 py-2 text-[12px] font-[400]'>{yarn.yarnName}</td>
                              <td className='px-4 py-2 text-[12px] font-[400]'>{yarn.yarnColor}</td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className='px-4 py-8 h-full'>
                            <div className='flex items-center justify-center h-full text-sm text-gray-500'>
                              {t(TRANSLATE_KEYS.FORM, 'noYarnAdded')}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right: Yarn Composition */}
            <div className='flex flex-col gap-4'>
              <h3 className='text-[15px] font-[600]'>{t(TRANSLATE_KEYS.FORM, 'yarnComposition')}</h3>

              {/* Validation Messages */}
              {(hasRatioError || hasLossError) && (
                <div className='flex gap-4'>
                  {hasRatioError && (
                    <p className='text-sm text-red-500'>{t(TRANSLATE_KEYS.FORM, 'ratioError')}</p>
                  )}
                  {hasLossError && (
                    <p className='text-sm text-red-500'>{t(TRANSLATE_KEYS.FORM, 'lossError')}</p>
                  )}
                </div>
              )}

              {/* Composition Table */}
              <div className='border rounded-lg overflow-hidden flex flex-col h-[400px] border-r'>
                <div className='overflow-y-auto flex-1'>
                  <table className='w-full'>
                    <thead className='bg-gray-50 sticky top-0 z-10'>
                      <tr>
                        <th className='px-4 py-2 text-left text-[12px] font-[400] relative'>{t(TRANSLATE_KEYS.FORM, 'category')}</th>
                        <th className='px-4 py-2 text-left text-[12px] font-[400] relative'>{t(TRANSLATE_KEYS.FORM, 'yarnName')}</th>
                        <th className='px-4 py-2 text-left text-[12px] font-[400] relative'>{t(TRANSLATE_KEYS.FORM, 'yarnColor')}</th>
                        <th className='px-4 py-2 text-left text-[12px] font-[400] relative'>{t(TRANSLATE_KEYS.FORM, 'ratio')}</th>
                        <th className='px-4 py-2 text-left text-[12px] font-[400] relative'>{t(TRANSLATE_KEYS.FORM, 'loss')}</th>
                        <th className='px-4 py-2 text-left text-[12px] font-[400] relative after:content-[""] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-gray-200'>{t(TRANSLATE_KEYS.FORM, 'delete')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yarnComposition.length > 0 ? (
                        yarnComposition.map((comp) => {
                          const ratioHasError = comp.ratio > 100
                          const lossHasError = comp.loss > 100
                          return (
                            <tr key={comp.id} className='border-t hover:bg-gray-50'>
                              <td className='px-4 py-2 text-[12px] font-[400] relative after:content-[""] after:absolute after:right-0 after:top-2 after:bottom-2 after:w-px after:bg-gray-200'>
                                {comp.category}
                              </td>
                              <td className='px-4 py-2 text-[12px] font-[400] relative after:content-[""] after:absolute after:right-0 after:top-2 after:bottom-2 after:w-px after:bg-gray-200'>
                                {comp.yarnName}
                              </td>
                              <td className='px-4 py-2 text-[12px] font-[400] relative after:content-[""] after:absolute after:right-0 after:top-2 after:bottom-2 after:w-px after:bg-gray-200'>
                                {comp.yarnColor}
                              </td>
                              <td className='px-4 py-2 relative after:content-[""] after:absolute after:right-0 after:top-2 after:bottom-2 after:w-px after:bg-gray-200'>
                                <Input
                                  type='number'
                                  value={comp.ratio}
                                  onChange={(e) => handleRatioChange(comp.id, e.target.value)}
                                  className={`w-20 !text-[12px] !font-[400] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] ${
                                    ratioHasError ? 'border-red-500 focus-visible:ring-red-500' : ''
                                  }`}
                                  min={0}
                                  max={100}
                                />
                              </td>
                              <td className='px-4 py-2 relative after:content-[""] after:absolute after:right-0 after:top-2 after:bottom-2 after:w-px after:bg-gray-200'>
                                <Input
                                  type='number'
                                  value={comp.loss}
                                  onChange={(e) => handleLossChange(comp.id, e.target.value)}
                                  className={`w-20 !text-[12px] !font-[400] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] ${
                                    lossHasError ? 'border-red-500 focus-visible:ring-red-500' : ''
                                  }`}
                                  min={0}
                                  max={100}
                                />
                              </td>
                              <td className='px-4 py-2 relative after:content-[""] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-gray-200'>
                                <Button
                                  type='button'
                                  variant='ghost'
                                  size='sm'
                                  onClick={() => handleDeleteComposition(comp.id)}
                                >
                                  <Trash2 className='w-4 h-4' />
                                </Button>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className='px-4 py-8 h-full'>
                            <div className='flex items-center justify-center h-full text-sm text-gray-500'>
                              {t(TRANSLATE_KEYS.FORM, 'noYarnAdded')}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </form>
    </Form>
  )
}

export default ItemCodeFormRawFabric

