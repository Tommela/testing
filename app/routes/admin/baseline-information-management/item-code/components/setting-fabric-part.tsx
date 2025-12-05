import { useEffect, useImperativeHandle, useState, forwardRef } from 'react'

import clsx from 'clsx'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { TRANSLATE_KEYS } from '~/constants'
import type { SettingFabricPartFormSchema } from '~/helpers'
import useAppTranslations from '~/hooks/use-app-translations'
import { eSettingFabricPartFormKey } from '~/types/enums/form.enum'

export interface IFabricPartOption {
  value: string
  label: string
}

interface ISettingFabricPartProps {
  form: UseFormReturn<SettingFabricPartFormSchema>
  fabricPartsList: IFabricPartOption[]
  setFabricPartsList: React.Dispatch<React.SetStateAction<IFabricPartOption[]>>
}

export interface ISettingFabricPartRef {
  addCurrentFormValueToList: () => void
}

// Mock data for fabric part options - replace with actual API call
const MOCK_FABRIC_PART_OPTIONS: IFabricPartOption[] = [
  { value: 'Bodyboard', label: 'Bodyboard' },
  { value: 'Sleeve', label: 'Sleeve' },
  { value: 'Collar', label: 'Collar' },
  { value: 'Pocket', label: 'Pocket' }
]

const SettingFabricPart = forwardRef<ISettingFabricPartRef, ISettingFabricPartProps>(({ form, fabricPartsList, setFabricPartsList }, ref) => {
  const { t } = useAppTranslations()
  const [fabricPartActive, setFabricPartActive] = useState<string | undefined>(fabricPartsList[0]?.value)
  // Track the original value being edited (undefined means adding new)
  const [editingOriginalValue, setEditingOriginalValue] = useState<string | undefined>(fabricPartsList[0]?.value)

  // Initialize form when component mounts or list changes
  useEffect(() => {
    if (fabricPartsList.length > 0) {
      if (!fabricPartActive) {
        const firstItem = fabricPartsList[0]
        setFabricPartActive(firstItem.value)
        setEditingOriginalValue(firstItem.value)
        form.reset({
          [eSettingFabricPartFormKey.FabricPart]: firstItem.value
        })
      } else {
        // If there's an active item, make sure it still exists in the list
        const activeExists = fabricPartsList.some((item) => item.value === fabricPartActive)
        if (!activeExists && fabricPartsList.length > 0) {
          const firstItem = fabricPartsList[0]
          setFabricPartActive(firstItem.value)
          setEditingOriginalValue(firstItem.value)
          form.reset({
            [eSettingFabricPartFormKey.FabricPart]: firstItem.value
          })
        } else if (activeExists) {
          form.reset({
            [eSettingFabricPartFormKey.FabricPart]: fabricPartActive
          })
        }
      }
    } else {
      // If list is empty, clear everything
      setFabricPartActive(undefined)
      setEditingOriginalValue(undefined)
      form.reset({
        [eSettingFabricPartFormKey.FabricPart]: ''
      })
    }
  }, [fabricPartsList.length])

  // Expose function to save current form value (add or update)
  useImperativeHandle(ref, () => ({
    addCurrentFormValueToList: () => {
      const formValue = form.getValues(eSettingFabricPartFormKey.FabricPart)
      
      if (formValue && formValue.trim() !== '') {
        const trimmedValue = formValue.trim()
        
        setFabricPartsList((prev) => {
          if (editingOriginalValue) {
            // Edit mode: update existing item
            const updated = prev.map((item) =>
              item.value === editingOriginalValue
                ? { value: trimmedValue, label: trimmedValue }
                : item
            )
            setFabricPartActive(trimmedValue)
            setEditingOriginalValue(trimmedValue) // Update the editing reference
            return updated
          } else {
            // Add mode: check if it already exists
            const exists = prev.some((item) => item.value === trimmedValue)
            
            if (!exists) {
              // Add new fabric part to list
              const newFabricPart: IFabricPartOption = {
                value: trimmedValue,
                label: trimmedValue
              }
              setFabricPartActive(trimmedValue)
              setEditingOriginalValue(trimmedValue) // Now it's in edit mode
              return [...prev, newFabricPart]
            } else {
              // If it exists, just set it as active and enter edit mode
              setFabricPartActive(trimmedValue)
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
    setFabricPartsList((prev) => prev.filter((item) => item.value !== valueToDelete))
    
    // If deleted item was active, clear the form and exit edit mode
    if (valueToDelete === fabricPartActive || valueToDelete === editingOriginalValue) {
      form.setValue(eSettingFabricPartFormKey.FabricPart, '')
      form.clearErrors(eSettingFabricPartFormKey.FabricPart)
      setFabricPartActive(undefined)
      setEditingOriginalValue(undefined)
    }
  }

  // Handle "New Fabric Part" button - clear form and exit edit mode
  const handleAddNewFabricPart = () => {
    form.setValue(eSettingFabricPartFormKey.FabricPart, '')
    form.clearErrors(eSettingFabricPartFormKey.FabricPart)
    setFabricPartActive(undefined)
    setEditingOriginalValue(undefined) // Exit edit mode
  }

  return (
    <section className='grid grid-cols-2'>
      <article className='flex flex-col'>
        <section
          className='flex items-center gap-1 py-3 px-space-main cursor-pointer'
          onClick={handleAddNewFabricPart}
        >
          <PlusCircleIcon className='w-[22px] h-[22px] text-black-main' />
          <p className='text-[12px] font-[400] leading-[20px] tracking-[-0.5%]'>{t(TRANSLATE_KEYS.LABEL, 'newFabricPart')}</p>
        </section>
        <section className='flex flex-col max-h-[300px] overflow-y-auto'>
          {fabricPartsList.length === 0 ? (
            <p className='py-[10px] px-space-main text-gray-main text-sm'>
              {t(TRANSLATE_KEYS.FORM, 'noFabricPartAdded')}
            </p>
          ) : (
            fabricPartsList.map((fabricPart) => {
              const isActive = fabricPart.value === fabricPartActive
              return (
                <section
                  key={fabricPart.value}
                  className={clsx(
                    'group flex items-center justify-between gap-5 py-[10px] px-space-main cursor-pointer hover:bg-primary-main/5',
                    isActive ? 'bg-primary-main/5 text-primary-main' : 'bg-white text-black-main'
                  )}
                  onClick={() => {
                    form.setValue(eSettingFabricPartFormKey.FabricPart, fabricPart.value)
                    form.trigger(eSettingFabricPartFormKey.FabricPart)
                    setFabricPartActive(fabricPart.value)
                    setEditingOriginalValue(fabricPart.value) // Enter edit mode for this item
                  }}
                >
                  <p className='text-[12px] font-[400] leading-[20px] tracking-[-0.5%]'>{fabricPart.value}</p>
                  <button
                    type='button'
                    className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer p-1 hover:bg-red-50 rounded flex items-center justify-center'
                    onClick={(e) => handleDelete(fabricPart.value, e)}
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
          {/* Fabric part */}
          <FormField
            control={form.control}
            name={eSettingFabricPartFormKey.FabricPart}
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired className='text-[12px] font-[600]'>{t(TRANSLATE_KEYS.LABEL, 'fabricPart')}</FormLabel>
                <FormControl>
                  <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectPart')} className='!text-[12px] md:!text-[12px] !font-normal' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  )
})

SettingFabricPart.displayName = 'SettingFabricPart'

export default SettingFabricPart

