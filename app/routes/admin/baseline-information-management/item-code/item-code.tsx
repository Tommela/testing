import { useEffect, useRef, useState } from 'react'

import type { IFabricPartOption, ISettingFabricPartRef } from './components/setting-fabric-part'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import DialogCustom from '~/components/customs/dialog-custom'
import DuplicateDialog, { type DuplicateOption } from '~/components/customs/duplicate-dialog'
import TableCustom from '~/components/customs/table-custom'
import ItemCodeFormDirectPurchase from '~/components/forms/baseline-information-management/item-code-form-direct-purchase'
import ItemCodeFormRawFabric from '~/components/forms/baseline-information-management/item-code-form-raw-fabric'
import { TRANSLATE_KEYS } from '~/constants'
import { filterHelper, tableHelper } from '~/helpers'
import columnHelper from '~/helpers/column.helper'
import formHelper from '~/helpers/form.helper'
import {
  getItemCodeSchema,
  getSettingFabricPartSchema,
  getUnitsSettingSchema,
  type ItemCodeFormSchema,
  type SettingFabricPartFormSchema,
  type UnitsSettingSchema
} from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import BaseLayoutContent from '~/layouts/base-layout-content'
import useGlobalLoaderStore from '~/stores/global-loader'
import type { IItemCode, IItemCodeYarnDetail } from '~/types'
import { eYesNo } from '~/types'
import { generateItemCodeMockData } from '~/mocks/item-code.mock'
import ItemCodeAction from './components/item-code-action'
import ItemCodeFilters, { type IItemCodeFilters } from './components/item-code-filters'
import SettingFabricPart from './components/setting-fabric-part'
import ItemCodeUnitsSetting from './components/item-code-units-setting'

export function meta() {
  return [{ title: 'ERP - Item code' }, { name: 'ERP System', content: 'Welcome to ERP' }]
}

const ItemCode = () => {
  const { t } = useAppTranslations()
  const { startLoading, stopLoading } = useGlobalLoaderStore()
  const maxHeightItemCodeTableClass = tableHelper.getMaxHeightItemCodeTableClass()
  // State
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpsertRawFabric, setOpenUpsertRawFabric] = useState(false)
  const [openUpsertDirectPurchase, setOpenUpsertDirectPurchase] = useState(false)
  const [openSettingFabricPart, setOpenSettingFabricPart] = useState(false)
  const [openUnitsSetting, setOpenUnitsSetting] = useState(false)
  const [openDuplicate, setOpenDuplicate] = useState(false)
  const [inforItemCodeDelete, setInforItemCodeDelete] = useState<IItemCode | undefined>(undefined)
  const [dataItemCode, setDataItemCode] = useState<IItemCode | undefined>(undefined)
  const [dataItemCodeDuplicate, setDataItemCodeDuplicate] = useState<IItemCode | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [openConfirmRawFabric, setOpenConfirmRawFabric] = useState(false)
  const [openConfirmDirectPurchase, setOpenConfirmDirectPurchase] = useState(false)
  const [rawFabricConfirmType, setRawFabricConfirmType] = useState<'name' | 'ratio' | 'both'>('name')
  const [rawFabricHasCompositionChanges, setRawFabricHasCompositionChanges] = useState(false)
  // Filter state
  const [filters, setFilters] = useState<IItemCodeFilters>(filterHelper.getDefaultFilterItemCode())
  // Ref to get selected rows from table
  const getSelectedRowsRef = useRef<(() => IItemCode[]) | null>(null)
  // Ref to clear row selection in table
  const clearSelectionRef = useRef<(() => void) | null>(null)
  // Ref to SettingFabricPart component
  const settingFabricPartRef = useRef<ISettingFabricPartRef>(null)
  
  // State to manage fabric parts list (persists when dialog closes/reopens)
  const [fabricPartsList, setFabricPartsList] = useState<IFabricPartOption[]>([
    { value: 'Bodyboard', label: 'Bodyboard' },
    { value: 'Sleeve', label: 'Sleeve' },
    { value: 'Collar', label: 'Collar' },
    { value: 'Pocket', label: 'Pocket' }
  ])

  // State for table data - can be filtered when items are deleted
  const [data, setData] = useState<IItemCode[]>(generateItemCodeMockData())

  // Form for Raw Fabric
  const formSchemaRawFabric = getItemCodeSchema(t)
  const formRawFabric = useForm<ItemCodeFormSchema>({
    resolver: zodResolver(formSchemaRawFabric),
    defaultValues: formHelper.getDefaultValuesItemCode('N'),
    mode: 'all'
  })

  // Form for Direct Purchase
  const formSchemaDirectPurchase = getItemCodeSchema(t)
  const formDirectPurchase = useForm<ItemCodeFormSchema>({
    resolver: zodResolver(formSchemaDirectPurchase),
    defaultValues: formHelper.getDefaultValuesItemCode('Y'),
    mode: 'all'
  })

  // Form for Setting Fabric Part
  const settingFabricPartSchema = getSettingFabricPartSchema(t)
  const settingFabricPartForm = useForm<SettingFabricPartFormSchema>({
    resolver: zodResolver(settingFabricPartSchema),
    defaultValues: formHelper.getDefaultValuesSettingFabricPart(),
    mode: 'all'
  })

  // Form for Units Setting
  const formSchemaUnitsSetting = getUnitsSettingSchema(t)
  const formUnitSetting = useForm<UnitsSettingSchema>({
    resolver: zodResolver(formSchemaUnitsSetting),
    defaultValues: formHelper.getDefaultValuesUnitsSetting(),
    mode: 'all'
  })

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  const handleSearch = () => {
    console.log('Filters: ', filters)
  }

  const handleResetFilter = () => {
    setFilters(filterHelper.getDefaultFilterItemCode())
  }

  const handleDeleteSelection = () => {
    if (getSelectedRowsRef.current) {
      const selectedRows = getSelectedRowsRef.current()
      if (selectedRows.length === 0) {
        toast.error(t(TRANSLATE_KEYS.MESSAGE, 'pleaseSelectAtLeastOneItem'))
        return
      }
      // Set the items to be deleted and open delete dialog
      // For bulk delete, we'll use a special marker
      setInforItemCodeDelete(undefined) // undefined means bulk delete
      setOpenDelete(true)
    } else {
      toast.error('Table not ready')
    }
  }

  const handleUnitSetting = () => {
    setOpenUnitsSetting(true)
  }

  const handleSaveUnitsSetting = async () => {
    if (!formUnitSetting.formState.isValid) {
      return
    }
    
    startLoading()
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const formValues = formUnitSetting.getValues()
      console.log('Units Setting saved:', formValues)
      
      stopLoading()
      toast.success(t(TRANSLATE_KEYS.MESSAGE, 'saveSuccessful'))
      // Don't close the dialog - allow user to continue adding items
      // Reset form for next entry
      formUnitSetting.reset(formHelper.getDefaultValuesUnitsSetting())
    } catch (error) {
      stopLoading()
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'saveFailed'))
    }
  }

  const handleFabricPartSetting = () => {
    setOpenSettingFabricPart(true)
  }

  const handleSaveFabricPartSetting = async () => {
    if (!settingFabricPartForm.formState.isValid) {
      return
    }
    
    startLoading()
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Add or update current form value in the list
      if (settingFabricPartRef.current) {
        settingFabricPartRef.current.addCurrentFormValueToList()
      }
      
      stopLoading()
      toast.success(t(TRANSLATE_KEYS.MESSAGE, 'saveSuccessful'))
      // Don't close the dialog - allow user to continue adding items
    } catch (error) {
      stopLoading()
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'saveFailed'))
    }
  }

  const handleAddNewRawFabric = () => {
    setDataItemCode(undefined)
    setOpenUpsertRawFabric(true)
  }

  const handleAddNewDirectPurchase = () => {
    setDataItemCode(undefined)
    setOpenUpsertDirectPurchase(true)
  }

  const handleSubmitRawFabric = () => {
    const isEditRawFabric = Boolean(dataItemCode && dataItemCode.directPurchase !== 'Y')

    if (isEditRawFabric) {
      const { itemName = '' } = formRawFabric.getValues()
      const originalName = dataItemCode?.itemName ?? ''
      const hasNameChanged = itemName.trim() !== originalName.trim()
      const hasRatioChanged = rawFabricHasCompositionChanges

      // Check if BOTH name and ratio are changed - show "both" confirmation dialog
      if (hasNameChanged && hasRatioChanged) {
        setRawFabricConfirmType('both')
        setOpenConfirmRawFabric(true)
        return
      }

      // If only ratio changed - show ratio confirmation dialog
      if (hasRatioChanged) {
        setRawFabricConfirmType('ratio')
        setOpenConfirmRawFabric(true)
        return
      }

      // If only name changed - show name confirmation dialog
      if (hasNameChanged) {
        setRawFabricConfirmType('name')
        setOpenConfirmRawFabric(true)
        return
      }
    }

    // No changes or not in edit mode - save directly
    handleSaveRawFabric()
  }

  const handleSubmitDirectPurchase = () => {
    const isEditDirectPurchase = Boolean(dataItemCode && dataItemCode.directPurchase === 'Y')

    if (isEditDirectPurchase) {
      const { itemName = '', saleItemName = '' } = formDirectPurchase.getValues()
      const originalPurchaseName = dataItemCode?.itemName ?? ''
      const originalSaleName = dataItemCode?.saleItemName ?? ''
      const hasNameChanged =
        itemName.trim() !== originalPurchaseName.trim() || saleItemName.trim() !== originalSaleName.trim()

      if (hasNameChanged) {
        setOpenConfirmDirectPurchase(true)
        return
      }
    }

    handleSaveDirectPurchase()
  }

  const handleDeleteItemCode = async () => {
    startLoading()
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // If inforItemCodeDelete is undefined, it means bulk delete (selected rows)
      // Otherwise, it's a single item delete
      if (inforItemCodeDelete === undefined && getSelectedRowsRef.current) {
        // Bulk delete: remove selected rows
        const selectedRows = getSelectedRowsRef.current()
        const selectedIds = new Set(selectedRows.map((row) => row.id))
        setData((prevData) => prevData.filter((item) => !selectedIds.has(item.id)))
        // Clear row selection after deletion
        if (clearSelectionRef.current) {
          clearSelectionRef.current()
        }
        toast.success(
          t(TRANSLATE_KEYS.MESSAGE, 'deleteItemsSuccessful', {
            count: selectedRows.length
          })
        )
      } else if (inforItemCodeDelete) {
        // Single item delete
        setData((prevData) => prevData.filter((item) => item.id !== inforItemCodeDelete.id))
        toast.success(t(TRANSLATE_KEYS.MESSAGE, 'deleteSuccessful'))
      }
      
      stopLoading()
      setOpenDelete(false)
      setInforItemCodeDelete(undefined)
    } catch (error) {
      stopLoading()
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'deleteFailed'))
    }
  }

  const handleOpenDialogDeleteAction = (data?: IItemCode) => {
    setInforItemCodeDelete(data)
    setOpenDelete(true)
  }

  const handleOpenDialogEditAction = (data?: IItemCode) => {
    setDataItemCode(data)
    if (data?.directPurchase === 'Y') {
      setOpenUpsertDirectPurchase(true)
    } else {
      setOpenUpsertRawFabric(true)
    }
  }

  const handleSaveRawFabric = async () => {
    setOpenConfirmRawFabric(false)
    if (formRawFabric.formState.isValid) {
      startLoading()
      try {
        // API call here
        await new Promise((resolve) => setTimeout(resolve, 1000))
        stopLoading()
        toast.success(t(TRANSLATE_KEYS.MESSAGE, 'saveSuccessful'))
        setOpenUpsertRawFabric(false)
        setDataItemCode(undefined)
        setTimeout(() => {
          formRawFabric.reset(formHelper.getDefaultValuesItemCode('N'))
        }, 200)
      } catch (error) {
        stopLoading()
        toast.error(t(TRANSLATE_KEYS.MESSAGE, 'saveFailed'))
      }
    }
  }

  const handleSaveDirectPurchase = async () => {
    setOpenConfirmDirectPurchase(false)
    if (formDirectPurchase.formState.isValid) {
      startLoading()
      try {
        // API call here
        await new Promise((resolve) => setTimeout(resolve, 1000))
        stopLoading()
        toast.success(t(TRANSLATE_KEYS.MESSAGE, 'saveSuccessful'))
        setOpenUpsertDirectPurchase(false)
        setDataItemCode(undefined)
        setTimeout(() => {
          formDirectPurchase.reset(formHelper.getDefaultValuesItemCode('Y'))
        }, 200)
      } catch (error) {
        stopLoading()
        toast.error(t(TRANSLATE_KEYS.MESSAGE, 'saveFailed'))
      }
    }
  }

  const handleDuplicateAction = (data?: IItemCode) => {
    setDataItemCodeDuplicate(data)
    setOpenDuplicate(true)
  }

  const handleConfirmDuplicate = async (option: DuplicateOption) => {
    if (!dataItemCodeDuplicate) return

    startLoading()
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const baseDuplicatedData: IItemCode = {
        ...dataItemCodeDuplicate,
        id: `id-${Date.now()}`,
        itemName: `${dataItemCodeDuplicate.itemName ?? ''} (Copy)`
      }

      const duplicatedData: IItemCode =
        option === 'detailed'
          ? baseDuplicatedData
          : {
              ...baseDuplicatedData,
              yarnDetails: []
            }

      setData((prevData) => [duplicatedData, ...prevData])
      setDataItemCodeDuplicate(undefined)

      stopLoading()
      toast.success(t(TRANSLATE_KEYS.MESSAGE, 'saveSuccessful'))
    } catch (error) {
      stopLoading()
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'saveFailed'))
    }
  }

  const handleDiscontinuedChange = (data: IItemCode, value: eYesNo) => {
    console.log('Discontinued changed:', data, value)
    // Update the data - in real app, this would be an API call
    // For now, just log it
  }

  return (
    <BaseLayoutContent>
      {/* Action */}
      <ItemCodeAction
        onDeleteSelection={handleDeleteSelection}
        onUnitSetting={handleUnitSetting}
        onFabricPartSetting={handleFabricPartSetting}
        onAddNewRawFabric={handleAddNewRawFabric}
        onAddNewDirectPurchase={handleAddNewDirectPurchase}
      />

      {/* Filter */}
      <ItemCodeFilters values={filters} onChange={setFilters} onSearch={handleSearch} />

      {/* Table */}
      <TableCustom
        columns={columnHelper.getColumnsItemCodeTable(
          t,
          handleOpenDialogDeleteAction,
          handleOpenDialogEditAction,
          handleDuplicateAction,
          handleDiscontinuedChange
        )}
        data={data}
        loading={isLoading}
        maxHeightClass={maxHeightItemCodeTableClass}
        onRowEdit={handleOpenDialogEditAction}
        onRowDelete={handleOpenDialogDeleteAction}
        onRowDuplicate={handleDuplicateAction}
        onGetSelectedRows={(getSelectedRows) => {
          getSelectedRowsRef.current = getSelectedRows
        }}
        onClearSelection={(clearSelection) => {
          clearSelectionRef.current = clearSelection
        }}
      />

      {/* Dialog Delete */}
      <DialogCustom
        open={openDelete}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setInforItemCodeDelete(undefined)
          }
          setOpenDelete(isOpen)
        }}
        hiddenHeader
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        onOkAction={handleDeleteItemCode}
      >
        <p className='text-center py-[29px] text-black-main leading-[30px] tracking-[-0.5%] font-bold text-[22px]'>
          {inforItemCodeDelete === undefined && getSelectedRowsRef.current
            ? t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToDeleteItems', {
                count: getSelectedRowsRef.current().length
              })
            : t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToDeleteIt')}
        </p>
      </DialogCustom>

      {/* Dialog Upsert Raw Fabric */}
      <DialogCustom
        open={openUpsertRawFabric}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDataItemCode(undefined)
            setTimeout(() => {
              formRawFabric.reset(formHelper.getDefaultValuesItemCode('N'))
            }, 200)
          }
          setOpenUpsertRawFabric(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        classNameContent='sm:min-w-[1200px] min-h-[369px] overflow-y-auto rounded-[15px]'
        onOkAction={handleSubmitRawFabric}
        disabledOkBtn={!formRawFabric.formState.isValid}
        title={dataItemCode ? t(TRANSLATE_KEYS.TITLE, 'editRawFabric') : t(TRANSLATE_KEYS.TITLE, 'newRawFabric')}
      >
        <ItemCodeFormRawFabric
          form={formRawFabric}
          data={dataItemCode}
          onCompositionChange={setRawFabricHasCompositionChanges}
        />
      </DialogCustom>

      {/* Dialog Upsert Direct Purchase */}
      <DialogCustom
        open={openUpsertDirectPurchase}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDataItemCode(undefined)
            setTimeout(() => {
              formDirectPurchase.reset(formHelper.getDefaultValuesItemCode('Y'))
            }, 200)
          }
          setOpenUpsertDirectPurchase(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        classNameContent='sm:min-w-[1200px] min-h-[369px] overflow-y-auto rounded-[15px]'
        onOkAction={handleSubmitDirectPurchase}
        disabledOkBtn={!formDirectPurchase.formState.isValid}
        title={dataItemCode ? t(TRANSLATE_KEYS.TITLE, 'editDirectPurchase') : t(TRANSLATE_KEYS.TITLE, 'newDirectPurchase')}
      >
        <ItemCodeFormDirectPurchase form={formDirectPurchase} data={dataItemCode} />
      </DialogCustom>

      {/* Dialog Setting Fabric Part */}
      <DialogCustom
        open={openSettingFabricPart}
        onOpenChange={setOpenSettingFabricPart}
        classNameWrapperChildrenContent='!p-0'
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        classNameContent='sm:max-w-[600px] gap-0'
        onOkAction={handleSaveFabricPartSetting}
        disabledOkBtn={!settingFabricPartForm.formState.isValid}
        title={t(TRANSLATE_KEYS.ACTION, 'fabricPartSetting')}
      >
        <SettingFabricPart
          ref={settingFabricPartRef}
          form={settingFabricPartForm}
          fabricPartsList={fabricPartsList}
          setFabricPartsList={setFabricPartsList}
        />
      </DialogCustom>

      {/* Dialog Units Setting */}
      <DialogCustom
        open={openUnitsSetting}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setTimeout(() => {
              formUnitSetting.reset(formHelper.getDefaultValuesUnitsSetting())
            }, 200)
          }
          setOpenUnitsSetting(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'confirm')}
        classNameContent='sm:min-w-[950px] min-h-[369px] overflow-y-auto rounded-[15px]'
        onOkAction={handleSaveUnitsSetting}
        disabledOkBtn={!formUnitSetting.formState.isValid}
        title={t(TRANSLATE_KEYS.TITLE, 'unitsSetting')}
        classNameHeader={'py-5'}
        classNameWrapperChildrenContent={''}
      >
        <ItemCodeUnitsSetting form={formUnitSetting} />
      </DialogCustom>

      {/* Dialog Duplicate */}
      <DuplicateDialog
        open={openDuplicate}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDataItemCodeDuplicate(undefined)
          }
          setOpenDuplicate(isOpen)
        }}
        onConfirm={handleConfirmDuplicate}
        isRawFabric={dataItemCodeDuplicate?.directPurchase !== 'Y'}
      />

      {/* Dialog: Raw Fabric Edit Confirmation - Name only, Ratio only, or Both */}
      <DialogCustom
        open={openConfirmRawFabric}
        onOpenChange={setOpenConfirmRawFabric}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        onOkAction={handleSaveRawFabric}
        onCancelAction={() => setOpenConfirmRawFabric(false)}
        classNameContent='sm:max-w-[420px]'
      >
        <section className='text-center py-8 px-4'>
          {rawFabricConfirmType === 'both' ? (
            // Both name and ratio changed - show combined message
            <>
              <p className='text-lg font-semibold text-black-main leading-7'>
                {t(TRANSLATE_KEYS.CONFIRM, 'editingItemNameAndRatioWillChange')}
              </p>
              <p className='mt-4 text-base text-black-main leading-6'>
                {t(TRANSLATE_KEYS.CONFIRM, 'recommendUsingDuplicateInstead')}
              </p>
              <p className='mt-6 text-base text-black-main'>
                {t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToEditIt')}
              </p>
            </>
          ) : rawFabricConfirmType === 'ratio' ? (
            // Only ratio changed - show ratio message
            <>
              <p className='text-lg font-semibold text-black-main leading-7'>
                {t(TRANSLATE_KEYS.CONFIRM, 'modifyingYarnOrRatioWillChange')}
              </p>
              <p className='mt-4 text-base text-black-main leading-6'>
                {t(TRANSLATE_KEYS.CONFIRM, 'recommendUsingDuplicateInstead')}
              </p>
              <p className='mt-6 text-base text-black-main'>
                {t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToEditIt')}
              </p>
            </>
          ) : (
            // Only name changed - show name message
            <>
              <p className='text-lg font-semibold text-black-main leading-7'>
                {t(TRANSLATE_KEYS.CONFIRM, 'editingItemNameWillUpdate')}
              </p>
              <p className='mt-4 text-base text-black-main'>
                {t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToEditIt')}
              </p>
            </>
          )}
        </section>
      </DialogCustom>

      {/* Dialog: Direct Purchase Edit Confirmation - Shows when item name or sale item name is changed in edit mode */}
      <DialogCustom      
        open={openConfirmDirectPurchase}
        onOpenChange={setOpenConfirmDirectPurchase}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        onOkAction={handleSaveDirectPurchase}
        onCancelAction={() => setOpenConfirmDirectPurchase(false)}
        classNameContent='sm:max-w-[420px]'
      >
        <section className='text-center py-8 px-4'>
          <p className='text-lg font-semibold text-black-main leading-7'>
            {t(TRANSLATE_KEYS.CONFIRM, 'editingItemNameWillUpdate')}
          </p>
          <p className='mt-4 text-base text-black-main'>
            {t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToEditIt')}
          </p>
        </section>
      </DialogCustom>
    </BaseLayoutContent>
  )
}

export default ItemCode

