import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import DialogCustom from '~/components/customs/dialog-custom'
import TableCustom from '~/components/customs/table-custom'
import { TRANSLATE_KEYS } from '~/constants'
import { filterHelper, tableHelper } from '~/helpers'
import columnHelper from '~/helpers/column.helper'
import formHelper from '~/helpers/form.helper'
import { getFabricCodeSchema, getUnitsSettingSchema, type FabricCodeFormSchema, type UnitsSettingSchema } from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import BaseLayoutContent from '~/layouts/base-layout-content'
import useGlobalLoaderStore from '~/stores/global-loader'
import type { FabricCode } from '~/types'
import { eDirectPurchaseType } from '~/types'
import FabricCodeFilters, { type FabricCodeFilterTypes } from './components/fabric-code-filters'
import FabricCodeAction from './components/fabric-code-action'
import FabricCodeForm from '~/components/forms/baseline-information-management/fabric-code-form'
import FabricCodeUnitsSetting from './components/fabric-code-units-setting'

export function meta() {
  return [{ title: 'ERP - Item code' }, { name: 'ERP System', content: 'Welcome to ERP' }]
}

const ItemCode = () => {
  const { t } = useAppTranslations()
  const { startLoading, stopLoading } = useGlobalLoaderStore()
  const maxHeightItemCodeTableClass = tableHelper.getMaxHeightItemCodeTableClass()
  // State
  const [openDelete, setOpenDelete] = useState(false)
  const [openFabricCodeModel, setOpenFabricCodeModel] = useState(false)
  const [inforFabricCodeDelete, setInforFabricCodeDelete] = useState<FabricCode | undefined>(undefined)
  const [dataFabricCode, setDataFabricCode] = useState<FabricCode | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  // Filter state
  const [filters, setFilters] = useState<FabricCodeFilterTypes>(filterHelper.getDefaultFabricFilterItemCode())
  const [ isAddNewFabric, setIsAddNewFabric ] = useState(false);
  const [ isAddNewDirectPurchase, setIsAddNewDirectPurchase ] = useState(false);
  const [ isEditFabric, setEditFabric ] = useState(false);
  const [ isEditDirectPurchase, setEditDirectPurchase ] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  const [ selectedFabricCode, setSelectedFabricCode ] = useState<FabricCode | undefined>(undefined);
  const [ openUnitsSetting, setOpenUnitsSetting ] = useState(false);

  // Mock data based on the image description - 48 items for pagination
  const data: FabricCode[] = Array.from({ length: 48 }, (_, i) => ({
    id: `id-${i + 1}`,
    directPurchase: i % 2 === 0 ? 'Y' : 'N',
    fabricPart:'Bodyboard',
    itemName:`Raw Fabric ${String.fromCharCode(65 + (i % 26))}${i >= 26 ? Math.floor(i / 26) : ''}`,
    printDesign:'Design A',
    color: 'Black | Black',
    btNo:'165B',
    prodSpec:'Greige Weight',
    prodCost:'1000' ,
    prodUnits:'KG' ,
    saleUnits:'KG' ,
    discontinuedInProd:'N',
    loss: '5.0',
    remarks:'',
  }))

  // Form for Raw Fabric
  const formSchemaRawFabric = getFabricCodeSchema(t)
  const formSchemaUnitsSetting = getUnitsSettingSchema(t)
  const formRawFabric = useForm<FabricCodeFormSchema>({
    resolver: zodResolver(formSchemaRawFabric),
    defaultValues: formHelper.getDefaultValuesFabricCode(eDirectPurchaseType.N),
    mode: 'all'
  })

  const formUnitSetting = useForm<UnitsSettingSchema>({
    resolver: zodResolver(formSchemaUnitsSetting),
    defaultValues: formHelper.getDefaultValuesUnitsSetting(),
    mode: 'all'
  })

  // Form for Direct Purchase
  const formSchemaDirectPurchase = getFabricCodeSchema(t)
  const formDirectPurchase = useForm<FabricCodeFormSchema>({
    resolver: zodResolver(formSchemaDirectPurchase),
    defaultValues: formHelper.getDefaultValuesFabricCode(eDirectPurchaseType.Y),
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
    console.log('Delete selection')
  }

  const handleUnitsSetting = () => {
    console.log('Fabric Part Setting')
    setOpenUnitsSetting(true);
  }

  const handleAddNewFabric = () => {
    setIsAddNewFabric(true); 
    setIsAddNewDirectPurchase(false)
    setDataFabricCode(undefined)
    setOpenFabricCodeModel(true)
  }

  const handleAddNewDirectPurchase = () => {
    setIsAddNewDirectPurchase(true); 
    setIsAddNewFabric(false);
    setDataFabricCode(undefined)
    setOpenFabricCodeModel(true)
  }

  const handleDeleteItemCode = async () => {
    startLoading()
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      stopLoading()
      toast.success('Delete successful')
      setOpenDelete(false)
      setInforFabricCodeDelete(undefined)
    } catch (error) {
      stopLoading()
      toast.error('Delete failed')
    }
  }

  const handleOpenDialogDeleteAction = (data?: FabricCode) => {
    setInforFabricCodeDelete(data)
    setOpenDelete(true)
  }

  const handleOpenDialogEditAction = (data?: FabricCode) => {
    setIsEdit(true);
    setSelectedFabricCode(data);
    setIsAddNewDirectPurchase(false);
    setIsAddNewFabric(false);
    setDataFabricCode(data)
    if(data?.directPurchase === 'Y') {
        setEditDirectPurchase(true);
        setEditFabric(false);
        setOpenFabricCodeModel(true)          
    } else {
        setEditFabric(true);
        setEditDirectPurchase(false);
        setOpenFabricCodeModel(true)
    }
  }

  const handleSaveRawFabric = async () => {
    if (formRawFabric.formState.isValid) {
      startLoading()
      try {
        const values = formRawFabric.getValues()
        // API call here
        await new Promise((resolve) => setTimeout(resolve, 1000))
        stopLoading()
        toast.success('Saved successfully')
        setOpenFabricCodeModel(false)
        setDataFabricCode(undefined)
        setTimeout(() => {
          formRawFabric.reset(formHelper.getDefaultValuesFabricCode(eDirectPurchaseType.N))
        }, 200)
      } catch (error) {
        stopLoading()
        toast.error('Save failed')
      }
    }
  }

  const handleSaveDirectPurchase = async () => {
    if (formDirectPurchase.formState.isValid) {
      startLoading()
      try {
        const values = formDirectPurchase.getValues()
        // API call here
        await new Promise((resolve) => setTimeout(resolve, 1000))
        stopLoading()
        toast.success('Saved successfully')
        setOpenFabricCodeModel(false)
        setDataFabricCode(undefined)
        setTimeout(() => {
          formDirectPurchase.reset(formHelper.getDefaultValuesFabricCode(eDirectPurchaseType.Y))
        }, 200)
      } catch (error) {
        stopLoading()
        toast.error('Save failed')
      }
    }
  }
  const handleDiscontinuedChange = (data: FabricCode, value: 'Y' | 'N') => {
    console.log('Discontinued changed:', data, value)
  }

  const handleCancelClick = () => {
    setIsAddNewDirectPurchase(false);
    setIsAddNewFabric(false);
    setOpenFabricCodeModel(false)
  }
  return (
    <BaseLayoutContent>
      <FabricCodeAction
        searchResults={48}
        onDeleteSelection={handleDeleteSelection}
        onUnitsSetting={handleUnitsSetting}
        onAddNewFabric={handleAddNewFabric}
        onAddNewDirectPurchase={handleAddNewDirectPurchase}
      />
      <FabricCodeFilters values={filters} onChange={setFilters} onSearch={handleSearch} />
      <TableCustom
        columns={columnHelper.getColumnsFabricCodeTable(
          t,
          handleOpenDialogDeleteAction,
          handleOpenDialogEditAction,
          handleDiscontinuedChange
        )}
        data={data}
        loading={isLoading}
        maxHeightClass={maxHeightItemCodeTableClass}
        onRowEdit={handleOpenDialogEditAction}
        onRowDelete={handleOpenDialogDeleteAction}
      />
      <DialogCustom
        open={openDelete}
        onOpenChange={setOpenDelete}
        hiddenHeader
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        onOkAction={handleDeleteItemCode}
      >
        <p className='text-center py-[29px] text-black-main leading-[30px] tracking-[-0.5%] font-bold text-[22px]'>
          {t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToDeleteIt')}
        </p>
      </DialogCustom>
      <DialogCustom
        open={openFabricCodeModel}
        hiddenFooter={true}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setIsAddNewDirectPurchase(false);
            setIsAddNewFabric(false);
            setIsEdit(false);
            setDataFabricCode(undefined)
            setTimeout(() => {
              formRawFabric.reset(formHelper.getDefaultValuesFabricCode(eDirectPurchaseType.N))
            }, 200)
          }
          setOpenFabricCodeModel(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        classNameContent='sm:min-w-[1300px] min-h-[369px] overflow-y-auto rounded-[15px]'
        onOkAction={handleSaveRawFabric}
        disabledOkBtn={!formRawFabric.formState.isValid}
        title={isEdit ? t(TRANSLATE_KEYS.TITLE, isEditDirectPurchase ? 'editDirectPurchaseFabric' : isEditFabric  ? 'editFabric' : 'editFabric')  : t(TRANSLATE_KEYS.TITLE, isAddNewDirectPurchase ? 'newRegistrationOfDirectPurchaseFabric' : isAddNewFabric ? 'newRegistrationOfFabric': 'newRegistrationOfFabric')}
        classNameHeader={'py-5'}
      >
        <FabricCodeForm form={formRawFabric} data={dataFabricCode} addNewFabric={isAddNewFabric} addNewDirectPurchase={isAddNewDirectPurchase} isEdit={isEdit} onCancelAction={handleCancelClick}/>
      </DialogCustom>
      <DialogCustom
        open={openUnitsSetting}
        // hiddenFooter={true}
        onOpenChange={(isOpen) => {
          setOpenUnitsSetting(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'confirm')}
        classNameContent='sm:min-w-[950px] min-h-[369px] overflow-y-auto rounded-[15px]'
        onOkAction={handleSaveRawFabric}
        disabledOkBtn={!formUnitSetting.formState.isValid}
        title={t(TRANSLATE_KEYS.TITLE, 'unitsSetting')}
        classNameHeader={'py-5'}
        classNameWrapperChildrenContent={''}
      >
        <FabricCodeUnitsSetting form={formUnitSetting}/>
      </DialogCustom>
    </BaseLayoutContent>
  )
}

export default ItemCode

