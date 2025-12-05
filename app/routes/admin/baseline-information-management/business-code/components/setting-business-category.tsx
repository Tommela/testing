import {
  type MouseEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef
} from 'react'

import clsx from 'clsx'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { TRANSLATE_KEYS } from '~/constants'
import type { SettingBusinessCategoryFormSchema } from '~/helpers'
import useAppTranslations from '~/hooks/use-app-translations'
import { BusinessCodeBusinessCategoryService } from '~/services/api'
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
  addCurrentFormValueToList: () => Promise<void>
}

const SettingBusinessCategory = forwardRef<ISettingBusinessCategoryRef, ISettingBusinessCategoryProps>(
  ({ form, businessCategoriesList, setBusinessCategoriesList }, ref) => {
    const { t } = useAppTranslations()
    const [businessCategoryActive, setBusinessCategoryActive] = useState<string | undefined>(
      businessCategoriesList[0]?.value
    )
    const [editingCategoryId, setEditingCategoryId] = useState<string | undefined>(
      businessCategoriesList[0]?.id
    )
    const [loadingCategories, setLoadingCategories] = useState(false)
    const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null)
    const isMountedRef = useRef(true)

    useEffect(() => {
      return () => {
        isMountedRef.current = false
      }
    }, [])

    const updateFormValue = useCallback(
      (value: string) => {
        form.reset({
          [eSettingBusinessCategoryFormKey.BusinessCategory]: value
        })
        form.clearErrors(eSettingBusinessCategoryFormKey.BusinessCategory)
      },
      [form]
    )

    const fetchBusinessCategories = useCallback(async () => {
      setLoadingCategories(true)
      try {
        const response = await BusinessCodeBusinessCategoryService.getAll()
        if (!isMountedRef.current) {
          return
        }

        const normalized = response.data?.map((category) => ({
          id: category.id,
          value: category.name ?? '',
          label: category.name ?? ''
        })) ?? []

        setBusinessCategoriesList(normalized)

        if (normalized.length > 0) {
          const firstItem = normalized[0]
          setBusinessCategoryActive(firstItem.value)
          setEditingCategoryId(firstItem.id)
          updateFormValue(firstItem.value ?? '')
        } else {
          setBusinessCategoryActive(undefined)
          setEditingCategoryId(undefined)
          updateFormValue('')
        }
      } catch (error) {
        if (isMountedRef.current) {
          toast.error('Failed to load business categories. Please try again.')
        }
      } finally {
        if (isMountedRef.current) {
          setLoadingCategories(false)
        }
      }
    }, [setBusinessCategoriesList, updateFormValue])

    useEffect(() => {
      void fetchBusinessCategories()
    }, [fetchBusinessCategories])

    const handleSelectCategory = async (businessCategory: IBusinessCategoryOption) => {
      if (!businessCategory.id) {
        return
      }

      setBusinessCategoryActive(businessCategory.value)
      setEditingCategoryId(businessCategory.id)
      updateFormValue(businessCategory.value)

      try {
        const response = await BusinessCodeBusinessCategoryService.getDetail(businessCategory.id)
        const categoryName = response.data?.name ?? ''
        setBusinessCategoryActive(categoryName)
        updateFormValue(categoryName)
        setBusinessCategoriesList((prev) =>
          prev.map((item) =>
            item.id === businessCategory.id ? { ...item, value: categoryName, label: categoryName } : item
          )
        )
      } catch (error) {
        toast.error('Failed to load business category detail.')
      }
    }

    const handleDelete = async (category: IBusinessCategoryOption, e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (!category.id) {
        return
      }

      const currentEditingId = editingCategoryId
      setDeletingCategoryId(category.id)
      try {
        await BusinessCodeBusinessCategoryService.delete(category.id)
        setBusinessCategoriesList((prev) => {
          const filtered = prev.filter((item) => item.id !== category.id)

          if (filtered.length === 0) {
            setBusinessCategoryActive(undefined)
            setEditingCategoryId(undefined)
            updateFormValue('')
          } else if (category.id === currentEditingId) {
            const nextCategory = filtered[0]
            setBusinessCategoryActive(nextCategory.value)
            setEditingCategoryId(nextCategory.id)
            updateFormValue(nextCategory.value)
          }

          return filtered
        })
        toast.success(t(TRANSLATE_KEYS.MESSAGE, 'deleteSuccessful'))
      } catch (error) {
        toast.error(t(TRANSLATE_KEYS.MESSAGE, 'deleteFailed'))
      } finally {
        setDeletingCategoryId(null)
      }
    }

    const handleAddNewCategory = () => {
      setBusinessCategoryActive(undefined)
      setEditingCategoryId(undefined)
      updateFormValue('')
    }

    useImperativeHandle(
      ref,
      () => ({
        addCurrentFormValueToList: async () => {
          const formValue = form.getValues(eSettingBusinessCategoryFormKey.BusinessCategory)
          const trimmedValue = formValue?.trim()

          if (!trimmedValue) {
            throw new Error(t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty'))
          }

          if (editingCategoryId) {
            try {
              const response = await BusinessCodeBusinessCategoryService.update({
                id: editingCategoryId,
                name: trimmedValue
              })
              const updatedName = response.data?.name ?? trimmedValue
              setBusinessCategoriesList((prev) =>
                prev.map((item) =>
                  item.id === editingCategoryId ? { ...item, value: updatedName, label: updatedName } : item
                )
              )
              setBusinessCategoryActive(updatedName)
              updateFormValue(updatedName)
            } catch (error) {
              throw error instanceof Error ? error : new Error('Failed to update business category.')
            }
            return
          }

          try {
            const response = await BusinessCodeBusinessCategoryService.create({ name: trimmedValue })
            const created = response.data

            if (created?.id) {
              const newCategory = {
                id: created.id,
                value: created.name ?? trimmedValue,
                label: created.name ?? trimmedValue
              }
              setBusinessCategoriesList((prev) => [...prev, newCategory])
              setBusinessCategoryActive(newCategory.value)
              setEditingCategoryId(newCategory.id)
              updateFormValue(newCategory.value)
              return
            }

            await fetchBusinessCategories()
          } catch (error) {
            throw error instanceof Error ? error : new Error('Failed to create business category.')
          }
        }
      }),
      [editingCategoryId, fetchBusinessCategories, form, setBusinessCategoriesList, t, updateFormValue]
    )

    return (
      <section className='grid grid-cols-2'>
        <article className='flex flex-col'>
          <section
            className='flex items-center gap-1 py-3 px-space-main cursor-pointer'
            onClick={handleAddNewCategory}
          >
            <PlusCircleIcon className='w-[22px] h-[22px] text-black-main' />
            <p className='text-[12px] font-[400] leading-[20px] tracking-[-0.5%]'>
              {t(TRANSLATE_KEYS.LABEL, 'newBusinessCategory')}
            </p>
          </section>
          <section className='flex flex-col max-h-[300px] overflow-y-auto'>
            {loadingCategories ? (
              <p className='py-[10px] px-space-main text-gray-main text-sm'>Loading business categories...</p>
            ) : businessCategoriesList.length === 0 ? (
              <p className='py-[10px] px-space-main text-gray-main text-sm'>
                {t(TRANSLATE_KEYS.FORM, 'noBusinessCategoryAdded')}
              </p>
            ) : (
              businessCategoriesList.map((businessCategory) => {
                const isActive = businessCategory.id
                  ? businessCategory.id === editingCategoryId
                  : businessCategory.value === businessCategoryActive

                return (
                  <section
                    key={businessCategory.id ?? businessCategory.value}
                    className={clsx(
                      'group flex items-center justify-between gap-5 py-[10px] px-space-main cursor-pointer hover:bg-primary-main/5',
                      isActive ? 'bg-primary-main/5 text-primary-main' : 'bg-white text-black-main'
                    )}
                    onClick={() => {
                      void handleSelectCategory(businessCategory)
                      form.trigger(eSettingBusinessCategoryFormKey.BusinessCategory)
                    }}
                  >
                    <p className='text-[12px] font-[400] leading-[20px] tracking-[-0.5%]'>
                      {businessCategory.value || '—'}
                    </p>
                    <button
                      type='button'
                      className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer p-1 hover:bg-red-50 rounded flex items-center justify-center disabled:opacity-50'
                      onClick={(e) => void handleDelete(businessCategory, e)}
                      onMouseDown={(e) => e.stopPropagation()}
                      disabled={deletingCategoryId === businessCategory.id}
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
            <FormField
              control={form.control}
              name={eSettingBusinessCategoryFormKey.BusinessCategory}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px] font-[600]'>
                    {t(TRANSLATE_KEYS.LABEL, 'businessName')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='무신사원사업체'
                      className='!text-[12px] md:!text-[12px] !font-normal'
                      {...field}
                    />
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
