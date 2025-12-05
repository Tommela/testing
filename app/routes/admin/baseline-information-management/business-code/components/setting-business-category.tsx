import { useEffect, useImperativeHandle, useState, forwardRef } from 'react'

import clsx from 'clsx'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { TRANSLATE_KEYS } from '~/constants'
import type { SettingBusinessCategoryFormSchema } from '~/helpers'
import useAppTranslations from '~/hooks/use-app-translations'
import { eSettingBusinessCategoryFormKey } from '~/types/enums/form.enum'

export interface IBusinessCategoryOption {
  id?: string
  value: string
  label: string
}

interface ISettingBusinessCategoryProps {
  form: UseFormReturn<SettingBusinessCategoryFormSchema>
  businessCategoriesList: IBusinessCategoryOption[]
  setBusinessCategoriesList: React.Dispatch<React.SetStateAction<IBusinessCategoryOption[]>>
}

export interface ISettingBusinessCategoryRef {
  addCurrentFormValueToList: () => void
}

// Mock data for business category options - replace with actual API call
const MOCK_BUSINESS_CATEGORY_OPTIONS: IBusinessCategoryOption[] = [
  { value: 'Originator', label: 'Originator' },
  { value: 'Knitting mills', label: 'Knitting mills' },
  { value: 'Pretreatment Plant', label: 'Pretreatment Plant' },
  { value: 'Dyehouse', label: 'Dyehouse' },
  { value: 'Processing plants', label: 'Processing plants' }
]

const SettingBusinessCategory = forwardRef<ISettingBusinessCategoryRef, ISettingBusinessCategoryProps>(
  ({ form, businessCategoriesList, setBusinessCategoriesList }, ref) => {
    const { t } = useAppTranslations()
    const [businessCategoryActive, setBusinessCategoryActive] = useState<string | undefined>(
      businessCategoriesList[0]?.value
    )
    // Track the original value being edited (undefined means adding new)
    const [editingOriginalValue, setEditingOriginalValue] = useState<string | undefined>(
      businessCategoriesList[0]?.value
    )
    // Track the ID of the category being edited (undefined means adding new)
    const [editingCategoryId, setEditingCategoryId] = useState<string | undefined>(
      businessCategoriesList[0]?.id
    )

    // Initialize form when component mounts or list changes
    useEffect(() => {
      if (businessCategoriesList.length > 0) {
        if (!businessCategoryActive) {
          const firstItem = businessCategoriesList[0]
          setBusinessCategoryActive(firstItem.value)
          setEditingOriginalValue(firstItem.value)
          form.reset({
            [eSettingBusinessCategoryFormKey.BusinessCategory]: firstItem.value
          })
        } else {
          // If there's an active item, make sure it still exists in the list
          const activeExists = businessCategoriesList.some((item) => item.value === businessCategoryActive)
          if (!activeExists && businessCategoriesList.length > 0) {
            const firstItem = businessCategoriesList[0]
            setBusinessCategoryActive(firstItem.value)
            setEditingOriginalValue(firstItem.value)
            form.reset({
              [eSettingBusinessCategoryFormKey.BusinessCategory]: firstItem.value
            })
          } else if (activeExists) {
            form.reset({
              [eSettingBusinessCategoryFormKey.BusinessCategory]: businessCategoryActive
            })
          }
        }
      } else {
        // If list is empty, clear everything
        setBusinessCategoryActive(undefined)
        setEditingOriginalValue(undefined)
        form.reset({
          [eSettingBusinessCategoryFormKey.BusinessCategory]: ''
        })
      }
    }, [businessCategoriesList.length])

    // Expose function to save current form value (add or update)
    useImperativeHandle(ref, () => ({
      addCurrentFormValueToList: () => {
        const formValue = form.getValues(eSettingBusinessCategoryFormKey.BusinessCategory)

        if (formValue && formValue.trim() !== '') {
          const trimmedValue = formValue.trim()

          setBusinessCategoriesList((prev) => {
            if (editingOriginalValue) {
              // Edit mode: update existing item
              const updated = prev.map((item) =>
                item.value === editingOriginalValue
                  ? { value: trimmedValue, label: trimmedValue }
                  : item
              )
              setBusinessCategoryActive(trimmedValue)
              setEditingOriginalValue(trimmedValue) // Update the editing reference
              return updated
            } else {
              // Add mode: check if it already exists
              const exists = prev.some((item) => item.value === trimmedValue)

              if (!exists) {
                // Add new business category to list
                const newBusinessCategory: IBusinessCategoryOption = {
                  value: trimmedValue,
                  label: trimmedValue
                }
                setBusinessCategoryActive(trimmedValue)
                setEditingOriginalValue(trimmedValue) // Now it's in edit mode
                return [...prev, newBusinessCategory]
              } else {
                // If it exists, just set it as active and enter edit mode
                setBusinessCategoryActive(trimmedValue)
                setEditingOriginalValue(trimmedValue)
                return prev
              }
            }
          })
        }
      }
    }))

    // Handle delete - remove item from list
    const handleDelete = (valueToDelete: string, e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      // Remove item from list
      setBusinessCategoriesList((prev) => prev.filter((item) => item.value !== valueToDelete))

      // If deleted item was active, clear the form and exit edit mode
      if (valueToDelete === businessCategoryActive || valueToDelete === editingOriginalValue) {
        form.setValue(eSettingBusinessCategoryFormKey.BusinessCategory, '')
        form.clearErrors(eSettingBusinessCategoryFormKey.BusinessCategory)
        setBusinessCategoryActive(undefined)
        setEditingOriginalValue(undefined)
      }
    }

    // Handle "Add New Category" button - clear form and exit edit mode
    const handleAddNewCategory = () => {
      form.setValue(eSettingBusinessCategoryFormKey.BusinessCategory, '')
      form.clearErrors(eSettingBusinessCategoryFormKey.BusinessCategory)
      setBusinessCategoryActive(undefined)
      setEditingOriginalValue(undefined) // Exit edit mode
    }

    return (
      <section className='grid grid-cols-2'>
        <article className='flex flex-col'>
          <section
            className='flex items-center gap-1 py-3 px-space-main cursor-pointer'
            onClick={handleAddNewCategory}
          >
            <PlusCircleIcon className='w-[22px] h-[22px] text-black-main' />
            <p className='text-[12px] font-[400] leading-[20px] tracking-[-0.5%]'>{t(TRANSLATE_KEYS.LABEL, 'newBusinessCategory')}</p>
          </section>
          <section className='flex flex-col max-h-[300px] overflow-y-auto'>
            {businessCategoriesList.length === 0 ? (
              <p className='py-[10px] px-space-main text-gray-main text-sm'>
                {t(TRANSLATE_KEYS.FORM, 'noBusinessCategoryAdded')}
              </p>
            ) : (
              businessCategoriesList.map((businessCategory) => {
                const isActive = businessCategory.value === businessCategoryActive
                return (
                  <section
                    key={businessCategory.value}
                    className={clsx(
                      'group flex items-center justify-between gap-5 py-[10px] px-space-main cursor-pointer hover:bg-primary-main/5',
                      isActive ? 'bg-primary-main/5 text-primary-main' : 'bg-white text-black-main'
                    )}
                    onClick={() => {
                      form.setValue(eSettingBusinessCategoryFormKey.BusinessCategory, businessCategory.value)
                      form.trigger(eSettingBusinessCategoryFormKey.BusinessCategory)
                      setBusinessCategoryActive(businessCategory.value)
                      setEditingOriginalValue(businessCategory.value) // Enter edit mode for this item
                    }}
                  >
                    <p className='text-[12px] font-[400] leading-[20px] tracking-[-0.5%]'>{businessCategory.value}</p>
                    <button
                      type='button'
                      className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer p-1 hover:bg-red-50 rounded flex items-center justify-center'
                      onClick={(e) => handleDelete(businessCategory.value, e)}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <Trash2Icon className='w-5 h-5 text-gray-main' />
                    </button>
                  </section>
                )
              })
            )}
          </section>
        </article>
        <Form {...form}>
          <form className='w-full p-space-main border-l border-light-gray'>
            {/* Business category */}
            <FormField
              control={form.control}
              name={eSettingBusinessCategoryFormKey.BusinessCategory}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px] font-[600]'>{t(TRANSLATE_KEYS.LABEL, 'businessName')}</FormLabel>
                  <FormControl>
                    <Input placeholder="무신사원사업체" className='!text-[12px] md:!text-[12px] !font-normal' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </section>
    )
  }
)

SettingBusinessCategory.displayName = 'SettingBusinessCategory'

export default SettingBusinessCategory

