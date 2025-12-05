import { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CategoryService, YarnService } from '~/services/api'
import DialogCustom from '~/components/customs/dialog-custom'
import TableCustom from '~/components/customs/table-custom'
import YarnCodeForm from '~/components/forms/baseline-information-management/yarn-code-form'
import { TRANSLATE_KEYS } from '~/constants'
import { filterHelper, tableHelper } from '~/helpers'
import columnHelper from '~/helpers/column.helper'
import formHelper from '~/helpers/form.helper'
import {
  type SettingYarnFormSchema,
  type YarnCodeFormSchema,
  getSettingYarnSchema,
  getYarnCodeSchema
} from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import BaseLayoutContent from '~/layouts/base-layout-content'
import SettingYarnClassification from '~/routes/admin/baseline-information-management/yarn-code/components/setting-yarn-classification'
import YarnCodeAction from '~/routes/admin/baseline-information-management/yarn-code/components/yarn-code-action'
import YarnCodeFilters from '~/routes/admin/baseline-information-management/yarn-code/components/yarn-code-filters'
import useGlobalLoaderStore from '~/stores/global-loader'
import { type ICategory, type IYarn, type IYarnCodeFilters, type IYarnGetAllParams } from '~/types'
import { eSettingYarnFormKey, eYarnCodeFormKey } from '~/types/enums/form.enum'

// Date formatting helper
const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString // Return original if invalid

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  } catch {
    return dateString // Return original if parsing fails
  }
}

export function hydrateFallback() {
  return <div className='flex items-center justify-center bg-[red] h-[600px]'>Loading...</div>
}
export function meta() {
  return [{ title: 'ERP - Yarn code' }, { name: 'ERP Yarn code', content: 'Welcome to ERP' }]
}

const YarnCode = () => {
  const { t } = useAppTranslations()
  const { startLoading, stopLoading } = useGlobalLoaderStore()
  const maxHeightYarnCodeTableClass = tableHelper.getMaxHeightYarnCodeTableClass()
  // State
  const [open, setOpen] = useState(false)
  const [openUpsertForm, setOpenUpsertForm] = useState(false)
  const [openSettingYarn, setOpenSettingYarn] = useState(false)
  const [inforYarnItemDelete, setInforYarnItemDelete] = useState<IYarn | undefined>(undefined)
  const [dataYarnCode, setDataYarnCode] = useState<IYarn | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [yarnData, setYarnData] = useState<IYarn[]>([])
  const [isLoadingYarn, setIsLoadingYarn] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null)
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(null)
  const [uniqueYarnNames, setUniqueYarnNames] = useState<string[]>([])
  const [loadingUniqueNames, setLoadingUniqueNames] = useState(false)
  const [uniqueYarnColors, setUniqueYarnColors] = useState<string[]>([])
  const [loadingUniqueColors, setLoadingUniqueColors] = useState(false)
  // Ref to get selected rows from table
  const getSelectedRowsRef = useRef<(() => IYarn[]) | null>(null)
  // Ref to clear row selection in table
  const clearSelectionRef = useRef<(() => void) | null>(null)
  // Filter state
  const [filters, setFilters] = useState<IYarnCodeFilters>(filterHelper.getDefaultFilterYarnCode())
  // Form
  const formSchema = getYarnCodeSchema(t)
  const form = useForm<YarnCodeFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formHelper.getDefaultValuesYarnCode(),
    mode: 'all'
  })

  // Form setting yarn
  const settingYarnSchema = getSettingYarnSchema(t)
  const settingYarnform = useForm<SettingYarnFormSchema>({
    resolver: zodResolver(settingYarnSchema),
    defaultValues: formHelper.getDefaultValuesSettingYarn(),
    mode: 'all'
  })

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      fetchCategories();
      fetchYarnData();
      fetchUniqueYarnNames();
      fetchUniqueYarnColors();
    }, 1500)
  }, [])

  const handleDeleteYarnItem = async () => {
    // If inforYarnItemDelete is undefined, it means bulk delete (selected rows)
    // Otherwise, it's a single item delete
    if (inforYarnItemDelete === undefined && getSelectedRowsRef.current) {
      // Bulk delete: get selected rows
      const selectedRows = getSelectedRowsRef.current()
      if (selectedRows.length === 0) {
        toast.error(t(TRANSLATE_KEYS.MESSAGE, 'pleaseSelectAtLeastOneItem'))
        setOpen(false)
        return
      }

      try {
        startLoading()

        // Extract IDs from selected rows
        const selectedIds = selectedRows
          .map((row) => row.id)
          .filter((id): id is string => typeof id === 'string' && id.length > 0)

        if (selectedIds.length === 0) {
          toast.error(t(TRANSLATE_KEYS.MESSAGE, 'noItemSelected'))
          stopLoading()
          return
        }

        const response = await YarnService.deleteMulti(selectedIds)

        if (response.status) {
          toast.success(response.message || t(TRANSLATE_KEYS.MESSAGE, 'yarnDeletedSuccessfully'))
          setOpen(false)
          // Clear row selection after deletion
          if (clearSelectionRef.current) {
            clearSelectionRef.current()
          }
          // Refresh yarn data
          await fetchYarnData()
        } else {
          toast.error(response.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToDeleteYarn'))
        }
      } catch (error: any) {
        const errorMessage = error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToDeleteYarn')
        toast.error(errorMessage)
      } finally {
        stopLoading()
      }
    } else if (inforYarnItemDelete?.id) {
      // Single item delete
      try {
        startLoading()

        const response = await YarnService.delete(inforYarnItemDelete.id)

        if (response.status) {
          toast.success(response.message || t(TRANSLATE_KEYS.MESSAGE, 'yarnDeletedSuccessfully'))
          setOpen(false)
          setInforYarnItemDelete(undefined)
          // Refresh yarn data
          await fetchYarnData()
        } else {
          toast.error(response.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToDeleteYarn'))
        }
      } catch (error: any) {
        const errorMessage = error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToDeleteYarn')
        toast.error(errorMessage)
      } finally {
        stopLoading()
      }
    } else {
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'noItemSelected'))
      setOpen(false)
    }
  }

  const handleDeleteSelection = () => {
    if (getSelectedRowsRef.current) {
      const selectedRows = getSelectedRowsRef.current()
      if (selectedRows.length === 0) {
        toast.error(t(TRANSLATE_KEYS.MESSAGE, 'pleaseSelectAtLeastOneItem'))
        return
      }
      // Set undefined to indicate bulk delete
      setInforYarnItemDelete(undefined)
      setOpen(true)
    } else {
      toast.error('Table not ready')
    }
  }
  const handleOpenDialogDeleteAction = (data?: IYarn) => {
    setInforYarnItemDelete(data)
    setOpen(true)
  }

  const handleOpenDialogEditAction = (data?: IYarn) => {
    setDataYarnCode(data)
    setOpenUpsertForm(true)
  }

  const handleEditYarnItem = async () => {
    // Trigger validation first
    const isValid = await form.trigger()

    if (!isValid) {
      // Form validation failed, error messages will be shown automatically
      return
    }

    const formValues = form.getValues()

    // Find the selected category object
    const selectedCategoryObj = categories.find(cat => cat.name === formValues[eYarnCodeFormKey.YarnType])

    if (!selectedCategoryObj) {
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'pleaseSelectValidCategory'))
      return
    }

    try {
      startLoading()

      const payload = {
        category: selectedCategoryObj,
        name: formValues[eYarnCodeFormKey.YarnName],
        color: formValues[eYarnCodeFormKey.YarnColor],
        note: formValues[eYarnCodeFormKey.Note] || ''
      }

      let response
      let successMessage
      let errorMessage
      if (dataYarnCode?.id) {
        // Update existing yarn
        response = await YarnService.update({
          id: dataYarnCode.id,
          ...payload
        })
        successMessage = response.message || t(TRANSLATE_KEYS.MESSAGE, 'yarnUpdatedSuccessfully')
        errorMessage = response.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToUpdateYarn')
      } else {
        // Create new yarn
        response = await YarnService.create(payload)
        successMessage = response.message || t(TRANSLATE_KEYS.MESSAGE, 'yarnCreatedSuccessfully')
        errorMessage = response.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToCreateYarn')
      }

      if (response.status) {
        toast.success(successMessage)
        setOpenUpsertForm(false)
        setDataYarnCode(undefined)
        form.reset()
        // Refresh yarn data
        await fetchYarnData()
        // Refresh unique names and colors in case new ones were added
        await fetchUniqueYarnNames()
        await fetchUniqueYarnColors()
      } else {
        toast.error(errorMessage)
      }
    } catch (error: any) {
      const errorMessage = dataYarnCode?.id
        ? error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToUpdateYarn')
        : error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToCreateYarn')
      toast.error(errorMessage)
    } finally {
      stopLoading()
    }
  }

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true)
      const response = await CategoryService.getAll()

      if (response.status && response.data) {
        setCategories(response.data)
      } else {
        toast.error(response.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToLoadCategories'))
      }
    } catch (error: any) {
      const errorMessage = error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToLoadCategories')
      toast.error(errorMessage)
    } finally {
      setLoadingCategories(false)
    }
  }

  const fetchYarnData = async () => {
    try {
      setIsLoadingYarn(true)
      const params: IYarnGetAllParams = {
        page: 1,
        pageSize: 10,
        category: filters.yarnType || '',
        name: filters.yarnName || '',
        color: filters.yarnColor || ''
      }

      const response = await YarnService.getAll(params)
      if (response.dataList?.length > 0) {
        setYarnData(response.dataList)
      } else {
        // toast.error(response.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToLoadYarnData'))
        setYarnData([])
      }
    } catch (error: any) {
      const errorMessage = error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToLoadYarnData')
      toast.error(errorMessage)
      setYarnData([])
    } finally {
      setIsLoadingYarn(false)
    }
  }

  const fetchUniqueYarnNames = async () => {
    try {
      setLoadingUniqueNames(true)
      const response = await YarnService.getUniqueNames()

      if (response && response.status) {
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setUniqueYarnNames(response.data)
        } else {
          setUniqueYarnNames([])
        }
      } else if (response && Array.isArray(response)) {
        setUniqueYarnNames(response)
      } else {
        toast.error((response as any)?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToLoadYarnNames'))
        setUniqueYarnNames([])
      }
    } catch (error: any) {
      const errorMessage = error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToLoadYarnNames')
      toast.error(errorMessage)
      setUniqueYarnNames([])
    } finally {
      setLoadingUniqueNames(false)
    }
  }

  const fetchUniqueYarnColors = async () => {
    try {
      setLoadingUniqueColors(true)
      const response = await YarnService.getUniqueColors()

      if (response && response.status) {
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setUniqueYarnColors(response.data)
        } else {
          setUniqueYarnColors([])
        }
      } else if (response && Array.isArray(response)) {
        setUniqueYarnColors(response)
      } else {
        toast.error((response as any)?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToLoadYarnColors'))
        setUniqueYarnColors([])
      }
    } catch (error: any) {
      const errorMessage = error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToLoadYarnColors')
      toast.error(errorMessage)
      setUniqueYarnColors([])
    } finally {
      setLoadingUniqueColors(false)
    }
  }

  const handleSelectCategory = async (category: ICategory) => {
    try {
      setSelectedCategory(category)

      // Fetch category details using the CategoryService.getDetail
      const response = await CategoryService.getDetail(category.id!)

      if (response.status && response.data) {
        // Fill the form with category details
        settingYarnform.setValue(eSettingYarnFormKey.YarnType, response.data.name)
        settingYarnform.trigger(eSettingYarnFormKey.YarnType)
      } else {
        // If detail fetch fails, just use the name from the list
        settingYarnform.setValue(eSettingYarnFormKey.YarnType, category.name)
        settingYarnform.trigger(eSettingYarnFormKey.YarnType)
      }
    } catch (error: any) {
      // If detail fetch fails, just use the name from the list
      settingYarnform.setValue(eSettingYarnFormKey.YarnType, category.name)
      settingYarnform.trigger(eSettingYarnFormKey.YarnType)
      console.error('Failed to fetch category details:', error)
    }
  }

  const handleNewCategory = () => {
    setSelectedCategory(null)
    settingYarnform.setValue(eSettingYarnFormKey.YarnType, '')
    settingYarnform.clearErrors(eSettingYarnFormKey.YarnType)
  }

  const handleDeleteCategory = (category: ICategory, event: React.MouseEvent) => {
    // Prevent the category selection when clicking delete
    event.stopPropagation()
    setCategoryToDelete(category)
    setDeleteCategoryDialog(true)
  }

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return

    try {
      startLoading()

      const response = await CategoryService.delete(categoryToDelete.id!)

      if (response.status) {
        toast.success(response.message || t(TRANSLATE_KEYS.MESSAGE, 'categoryDeletedSuccessfully'))

        // If the deleted category was selected, clear the selection
        if (selectedCategory?.id === categoryToDelete.id) {
          setSelectedCategory(null)
          settingYarnform.reset()
        }

        // Refresh category list
        await fetchCategories()
      } else {
        toast.error(response.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToDeleteCategory'))
      }
    } catch (error: any) {
      const errorMessage = error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToDeleteCategory')
      toast.error(errorMessage)
    } finally {
      stopLoading()
      setDeleteCategoryDialog(false)
      setCategoryToDelete(null)
    }
  }

  const handleSaveCategory = async () => {
    // Trigger validation first
    const isValid = await settingYarnform.trigger()

    if (!isValid) {
      // Form validation failed, error messages will be shown automatically
      return
    }

    const formValues = settingYarnform.getValues()
    const categoryName = formValues[eSettingYarnFormKey.YarnType]

    if (!categoryName || categoryName.trim() === '') {
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'pleaseEnterCategoryName'))
      return
    }

    try {
      startLoading()

      let response
      let successMessage
      let errorMessage
      console.log({selectedCategory})
      if (selectedCategory) {
        // Update existing category
        response = await CategoryService.update({
          id: selectedCategory.id!,
          name: categoryName.trim()
        })
        successMessage = response.message || t(TRANSLATE_KEYS.MESSAGE, 'categoryUpdatedSuccessfully')
        errorMessage = response.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToUpdateCategory')
      } else {
        // Create new category
        response = await CategoryService.create({
          name: categoryName.trim()
        })

        successMessage = response.message || t(TRANSLATE_KEYS.MESSAGE, 'categoryAddedSuccessfully')
        errorMessage = response.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToAddCategory')
      }
      if (response.status) {
        toast.success(successMessage)
        settingYarnform.reset()
        setSelectedCategory(null)
        setOpenSettingYarn(false)
        // Refresh category list
        await fetchCategories()
      } else {
        toast.error(errorMessage)
      }
    } catch (error: any) {
      const errorMessage = selectedCategory
        ? error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToUpdateCategory')
        : error?.message || t(TRANSLATE_KEYS.MESSAGE, 'failedToAddCategory')
      toast.error(errorMessage)
    } finally {
      stopLoading()
    }
  }

  const handleSearch = () => {
    fetchYarnData()
  }

  const handleResetFilter = () => {
    setFilters(filterHelper.getDefaultFilterYarnCode())
  }
  return (
    <BaseLayoutContent>
      {/* Action */}
      <YarnCodeAction
        onResetFilter={handleResetFilter}
        onDeleteSelection={handleDeleteSelection}
        onNewRegistrationAction={() => {
          setOpenUpsertForm(true)
        }}
        onSettingYarnClassfication={() => {
          setOpenSettingYarn(true)
          setSelectedCategory(null)
          settingYarnform.reset()
          fetchCategories()
        }}
      />

      {/* Filter */}
      <YarnCodeFilters
        values={filters}
        onChange={setFilters}
        onSearch={handleSearch}
        categories={categories}
        uniqueYarnNames={uniqueYarnNames}
        uniqueYarnColors={uniqueYarnColors}
      />

      {/* Table */}
      <TableCustom
        columns={columnHelper.getColumnsYarnCodeTable(t, handleOpenDialogDeleteAction, handleOpenDialogEditAction) as any}
        data={yarnData?.map((yarn) => ({
          id: yarn.id,
          yarnType: yarn.category?.name || '',
          yarnName: yarn.name,
          yarnColor: yarn.color,
          notes: yarn.note || '',
          dateOfRegistration: formatDate(yarn.createddate || ''),
          // Keep original data for actions
          ...yarn
        }))}
        loading={isLoading || isLoadingYarn}
        maxHeightClass={maxHeightYarnCodeTableClass}
        onRowEdit={handleOpenDialogEditAction}
        onRowDelete={handleOpenDialogDeleteAction}
        onGetSelectedRows={(getSelectedRows) => {
          getSelectedRowsRef.current = () => {
            const rows = getSelectedRows()
            return rows.filter((row) => row !== undefined && row.id).map((row) => {
              // Extract only IYarn properties from the mapped data
              const { yarnType, yarnName, yarnColor, notes, dateOfRegistration, ...yarnData } = row as any
              return yarnData as IYarn
            })
          }
        }}
        onClearSelection={(clearSelection) => {
          clearSelectionRef.current = clearSelection
        }}
      />

      {/* Dialog delete*/}
      <DialogCustom
        open={open}
        onOpenChange={setOpen}
        hiddenHeader
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        onOkAction={handleDeleteYarnItem}
      >
        <p className='text-center py-[29px] text-black-main leading-[30px] tracking-[-0.5%] font-bold text-[22px]'>
          {t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToDeleteIt')}
        </p>
      </DialogCustom>
      {/* Dialog upsert*/}
      <DialogCustom
        open={openUpsertForm}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDataYarnCode(undefined)
            setTimeout(() => {
              form.reset(formHelper.getDefaultValuesYarnCode())
            }, 200)
          }
          setOpenUpsertForm(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        classNameContent='sm:max-w-[800px]'
        onOkAction={handleEditYarnItem}
        disabledOkBtn={!form.formState.isValid}
        title={dataYarnCode?.id ? t(TRANSLATE_KEYS.TITLE, 'editYarn') : t(TRANSLATE_KEYS.TITLE, 'newRegistrationOfYarn')}
      >
        <YarnCodeForm form={form} data={dataYarnCode} categories={categories} />
      </DialogCustom>

      {/* Dialog setting*/}
      <DialogCustom
        open={openSettingYarn}
        onOpenChange={setOpenSettingYarn}
        classNameWrapperChildrenContent='!p-0'
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'save')}
        classNameContent='sm:max-w-[600px] gap-0 '
        onOkAction={handleSaveCategory}
        disabledOkBtn={!settingYarnform.formState.isValid || !settingYarnform.watch(eSettingYarnFormKey.YarnType)?.trim()}
        title={t(TRANSLATE_KEYS.TITLE, 'yarnCategoryManagement')}
      >
        <SettingYarnClassification
          form={settingYarnform}
          categories={categories}
          loadingCategories={loadingCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onNewCategory={handleNewCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </DialogCustom>

      {/* Delete Category Confirmation Dialog */}
      <DialogCustom
        open={deleteCategoryDialog}
        onOpenChange={setDeleteCategoryDialog}
        hiddenHeader
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        onOkAction={confirmDeleteCategory}
      >
        <p className='text-center py-[29px] text-black-main leading-[30px] tracking-[-0.5%] font-bold text-[22px]'>
          {t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToDeleteIt')}
        </p>
      </DialogCustom>
    </BaseLayoutContent>
  )
}

export default YarnCode
