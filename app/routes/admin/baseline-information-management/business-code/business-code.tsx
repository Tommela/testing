import { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import DialogCustom from '~/components/customs/dialog-custom'
import TableCustom from '~/components/customs/table-custom'
import BusinessCodeForm from '~/components/forms/baseline-information-management/business-code-form'
import { TRANSLATE_KEYS } from '~/constants'
import { filterHelper, tableHelper } from '~/helpers'
import columnHelper from '~/helpers/column.helper'
import formHelper from '~/helpers/form.helper'
import {
  getBusinessCodeSchema,
  getSettingBusinessCategorySchema,
  type BusinessCodeFormSchema,
  type SettingBusinessCategoryFormSchema
} from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import BaseLayoutContent from '~/layouts/base-layout-content'
import useGlobalLoaderStore from '~/stores/global-loader'
import type { IBusinessCode } from '~/types'
import { eBusinessCodeFormKey } from '~/types/enums/form.enum'
import { generateBusinessCodeMockData } from '~/mocks/business-code.mock'
import BusinessCodeAction from './components/business-code-action'
import BusinessCodeFilters, { type IBusinessCodeFilters } from './components/business-code-filters'
import SettingBusinessCategory, {
  type IBusinessCategoryOption,
  type ISettingBusinessCategoryRef
} from './components/setting-business-category'

export function meta() {
  return [{ title: 'ERP - Business code' }, { name: 'ERP System', content: 'Welcome to ERP' }]
}

const BusinessCode = () => {
  const { t } = useAppTranslations()
  const { startLoading, stopLoading } = useGlobalLoaderStore()
  const maxHeightBusinessCodeTableClass = tableHelper.getMaxHeightBusinessCodeTableClass()

  // Filter state
  const [filters, setFilters] = useState<IBusinessCodeFilters>(filterHelper.getDefaultFilterBusinessCode())

  // Table data state
  const [data, setData] = useState<IBusinessCode[]>(generateBusinessCodeMockData())
  const [isLoading, setIsLoading] = useState(true)

  // Dialog state
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpsertBusiness, setOpenUpsertBusiness] = useState(false)
  const [openCompanyTypeSetting, setOpenCompanyTypeSetting] = useState(false)
  const [dataBusinessCode, setDataBusinessCode] = useState<IBusinessCode | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Business category list state
  const [businessCategoriesList, setBusinessCategoriesList] = useState<IBusinessCategoryOption[]>([])

  // Form
  const formSchema = getBusinessCodeSchema(t)
  const form = useForm<BusinessCodeFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formHelper.getDefaultValuesBusinessCode(),
    mode: 'all'
  })

  // Form for Business Category Setting
  const formSchemaBusinessCategory = getSettingBusinessCategorySchema(t)
  const settingBusinessCategoryForm = useForm<SettingBusinessCategoryFormSchema>({
    resolver: zodResolver(formSchemaBusinessCategory),
    defaultValues: formHelper.getDefaultValuesSettingBusinessCategory(),
    mode: 'all'
  })

  // Ref to get selected rows from table
  const getSelectedRowsRef = useRef<(() => IBusinessCode[]) | null>(null)
  // Ref to clear row selection in table
  const clearSelectionRef = useRef<(() => void) | null>(null)
  // Ref for business category setting component
  const settingBusinessCategoryRef = useRef<ISettingBusinessCategoryRef>(null)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  const handleCompanyTypeSetting = () => {
    setOpenCompanyTypeSetting(true)
  }

  const handleSaveBusinessCategorySetting = async () => {
    if (!settingBusinessCategoryForm.formState.isValid) {
      return
    }

    startLoading()
    try {
      if (!settingBusinessCategoryRef.current) {
        throw new Error('Business category setting is not ready.')
      }

      await settingBusinessCategoryRef.current.addCurrentFormValueToList()
      stopLoading()
      toast.success(t(TRANSLATE_KEYS.MESSAGE, 'saveSuccessful'))
      // Don't close the dialog - allow user to continue editing
    } catch (error) {
      stopLoading()
      if (error instanceof Error && error.message) {
        toast.error(error.message)
      } else {
        toast.error(t(TRANSLATE_KEYS.MESSAGE, 'saveFailed'))
      }
    }
  }

  const handleAddNew = () => {
    console.log('Add New clicked')
    setOpenUpsertBusiness(true)
    setDataBusinessCode(undefined)
    // TODO: Implement Add New dialog
  }

  const handleFiltersChange = (newFilters: IBusinessCodeFilters) => {
    setFilters(newFilters)
  }

  const handleSearch = () => {
    console.log('Search with filters:', filters)
    // TODO: Implement search functionality
  }

  const handleDeleteSelection = () => {
    if (getSelectedRowsRef.current) {
      const selectedRows = getSelectedRowsRef.current()
      if (selectedRows.length === 0) {
        toast.error(t(TRANSLATE_KEYS.MESSAGE, 'pleaseSelectAtLeastOneItem'))
        return
      }
      setOpenDelete(true)
    } else {
      toast.error('Table not ready')
    }
  }

  const handleOpenDialogEditAction = (data?: IBusinessCode) => {
    setDataBusinessCode(data)
    setOpenUpsertBusiness(true)
    // TODO: Implement edit dialog
  }

  const handleOpenDialogDeleteAction = (data?: IBusinessCode) => {
    setDataBusinessCode(data)
    setOpenDelete(true)
  }

  const handleConfirmDelete = async () => {
    startLoading()
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      if (dataBusinessCode) {
        // Delete single item
        setData((prevData) => prevData.filter((item) => item.id !== dataBusinessCode.id))
        toast.success(t(TRANSLATE_KEYS.MESSAGE, 'deleteSuccessful'))
      } else {
        // Delete selected items
        if (getSelectedRowsRef.current) {
          const selectedRows = getSelectedRowsRef.current()
          const selectedIds = new Set(selectedRows.map((row) => row.id))
          setData((prevData) => prevData.filter((item) => !selectedIds.has(item.id)))
          if (clearSelectionRef.current) {
            clearSelectionRef.current()
          }
          toast.success(t(TRANSLATE_KEYS.MESSAGE, 'deleteItemsSuccessful', { count: selectedRows.length }))
        }
      }
      
      stopLoading()
      setOpenDelete(false)
      setDataBusinessCode(undefined)
    } catch (error) {
      stopLoading()
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'deleteFailed'))
    }
  }

  const handleTransactionEndChange = async (data: IBusinessCode, value: 'Y' | 'N') => {
    startLoading()
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setData((prevData) =>
        prevData.map((item) => (item.id === data.id ? { ...item, transactionEndStatus: value } : item))
      )
      stopLoading()
      toast.success(t(TRANSLATE_KEYS.MESSAGE, 'saveSuccessful'))
    } catch (error) {
      stopLoading()
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'saveFailed'))
    }
  }

  const handleSaveBusinessCode = async () => {
    if (isSubmitting || !form.formState.isValid) {
      return
    }

    setIsSubmitting(true)
    startLoading()
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const formValues = form.getValues()

      const newBusinessCode: IBusinessCode = {
        id: dataBusinessCode?.id || `business-${Date.now()}`,
        businessCategory: formValues[eBusinessCodeFormKey.BusinessCategory],
        partnerName: formValues[eBusinessCodeFormKey.PartnerName],
        businessRegistrationNumber: formValues[eBusinessCodeFormKey.BusinessRegistrationNumber],
        phone: formValues[eBusinessCodeFormKey.Phone],
        fax: formValues[eBusinessCodeFormKey.Fax],
        headOfficeAddress: formValues[eBusinessCodeFormKey.HeadOfficeAddress],
        contactPersonName: formValues[eBusinessCodeFormKey.ContactName],
        contactPersonPosition: formValues[eBusinessCodeFormKey.JobTitle],
        contactEmail: formValues[eBusinessCodeFormKey.ContactEmail],
        contactPhone: formValues[eBusinessCodeFormKey.ContactPerson],
        vendorPIC: formValues[eBusinessCodeFormKey.VendorPIC],
        vatStatus: formValues[eBusinessCodeFormKey.VatStatus] || 'Y',
        remarks: formValues[eBusinessCodeFormKey.Remarks]
      }

      if (dataBusinessCode) {
        // Update existing
        setData((prevData) => prevData.map((item) => (item.id === dataBusinessCode.id ? newBusinessCode : item)))
      } else {
        // Add new
        setData((prevData) => [newBusinessCode, ...prevData])
      }

      stopLoading()
      toast.success(t(TRANSLATE_KEYS.MESSAGE, 'saveSuccessful'))
      setOpenUpsertBusiness(false)
      setDataBusinessCode(undefined)
      setTimeout(() => {
        form.reset(formHelper.getDefaultValuesBusinessCode())
        setIsSubmitting(false)
      }, 200)
    } catch (error) {
      stopLoading()
      setIsSubmitting(false)
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'saveFailed'))
    }
  }

  return (
    <BaseLayoutContent>
      <BusinessCodeAction onCompanyTypeSetting={handleCompanyTypeSetting} onAddNew={handleAddNew} />
      <BusinessCodeFilters values={filters} onChange={handleFiltersChange} onSearch={handleSearch} />
      
      {/* Table */}
      <TableCustom
        columns={columnHelper.getColumnsBusinessCodeTable(
          t,
          handleOpenDialogDeleteAction,
          handleOpenDialogEditAction,
          handleTransactionEndChange
        )}
        data={data}
        loading={isLoading}
        maxHeightClass={maxHeightBusinessCodeTableClass}
        onRowEdit={handleOpenDialogEditAction}
        onRowDelete={handleOpenDialogDeleteAction}
        onGetSelectedRows={(getSelectedRows) => {
          getSelectedRowsRef.current = getSelectedRows
        }}
        onClearSelection={(clearSelection) => {
          clearSelectionRef.current = clearSelection
        }}
      />

      {/* Upsert Business Code Dialog */}
      <DialogCustom
        open={openUpsertBusiness}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDataBusinessCode(undefined)
            setTimeout(() => {
              form.reset(formHelper.getDefaultValuesBusinessCode())
            }, 200)
          }
          setOpenUpsertBusiness(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        classNameContent='sm:min-w-[800px] min-h-[566px] overflow-y-auto rounded-[15px]'
        onOkAction={handleSaveBusinessCode}
        disabledOkBtn={!form.formState.isValid}
        title={dataBusinessCode?.id ? t(TRANSLATE_KEYS.TITLE, 'editBusinessCode') : t(TRANSLATE_KEYS.TITLE, 'newBusinessCode')}
      >
        <BusinessCodeForm form={form} data={dataBusinessCode} />
      </DialogCustom>

      {/* Delete Dialog */}
      <DialogCustom
        open={openDelete}
        onOpenChange={setOpenDelete}
        title={t(TRANSLATE_KEYS.CONFIRM, dataBusinessCode ? 'areYouSureYouWantToDeleteIt' : 'areYouSureYouWantToDeleteItems', { count: getSelectedRowsRef.current?.()?.length || 0 })}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        onOkAction={handleConfirmDelete}
        onCancelAction={() => {
          setOpenDelete(false)
          setDataBusinessCode(undefined)
        }}
      />

      {/* Dialog Business Category Setting */}
      <DialogCustom
        open={openCompanyTypeSetting}
        onOpenChange={setOpenCompanyTypeSetting}
        classNameWrapperChildrenContent='!p-0'
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'confirm')}
        classNameContent='sm:max-w-[600px] gap-0'
        onOkAction={handleSaveBusinessCategorySetting}
        disabledOkBtn={!settingBusinessCategoryForm.formState.isValid}
        title={t(TRANSLATE_KEYS.ACTION, 'companyTypeSetting')}
      >
        <SettingBusinessCategory
          ref={settingBusinessCategoryRef}
          form={settingBusinessCategoryForm}
          businessCategoriesList={businessCategoriesList}
          setBusinessCategoriesList={setBusinessCategoriesList}
        />
      </DialogCustom>
    </BaseLayoutContent>
  )
}

export default BusinessCode

