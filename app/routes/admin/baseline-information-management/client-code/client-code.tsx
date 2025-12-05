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
import { getClientCodeFormSchema, getClientTierSettingSchema, getFabricCodeSchema, getPlatformSettingSchema, getUnitsSettingSchema, type ClientCodeFormSchema, type ClientTierSettingSchema, type FabricCodeFormSchema, type PlatformSettingSchema, type UnitsSettingSchema } from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import BaseLayoutContent from '~/layouts/base-layout-content'
import useGlobalLoaderStore from '~/stores/global-loader'
import type { FabricCode } from '~/types'
import { eDirectPurchaseType } from '~/types'
import { eClienttCodeFormKey } from '~/types/enums/form.enum'
import { generateClientCodeMockData } from '~/mocks/client-code.mock'
import ClientCodeFilters, { type ClientCodeFilterTypes } from './components/client-code-filters'
import ClientCodeAction from './components/client-code-action'
import FabricCodeForm from '~/components/forms/baseline-information-management/fabric-code-form'
import type { ClientCode } from '~/types/models/baseline-information-management/client-code.model'
import ClientTierSetting from './components/client-tier-setting'
import ClientCodePlatformSetting from './components/client-code-platform-setting'
import ClientCodeForm from '~/components/forms/baseline-information-management/client-code-form'

export function meta() {
  return [{ title: 'ERP - Item code' }, { name: 'ERP System', content: 'Welcome to ERP' }]
}

const ClientRegister = () => {
  const { t } = useAppTranslations()
  const { startLoading, stopLoading } = useGlobalLoaderStore()
  const maxHeightItemCodeTableClass = tableHelper.getMaxHeightItemCodeTableClass()
  // State
  const [openDelete, setOpenDelete] = useState(false)
  const [openAddNewClientModel, setOpenAddNewClientModel] = useState(false)
  const [inforClientDelete, setInforClientDelete] = useState<ClientCode | undefined>(undefined)
  const [clientData, setClientData] = useState<ClientCode | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  // Filter state
  const [filters, setFilters] = useState<ClientCodeFilterTypes>(filterHelper.getDefaulClientFilterItemCode())
  const [isAddNewFabric, setIsAddNewFabric] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [openClientTierSetting, setOpenClientTierSetting] = useState(false)
  const [openPlatformSetting, setOpenPlatformSetting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Table data state - using mock data generator
  const [data, setData] = useState<ClientCode[]>(generateClientCodeMockData())

  
  const formSchemaClientCode = getClientCodeFormSchema(t)
  const formSchemaUnitsSetting = getClientTierSettingSchema(t)
    const formSchemaPlatformSetting = getPlatformSettingSchema(t)
  
  const formClientCode = useForm<ClientCodeFormSchema>({
    resolver: zodResolver(formSchemaClientCode),
    defaultValues: formHelper.getDefaultValuesClientCode(),
    mode: 'all'
  })

  const formClientTierSetting = useForm<ClientTierSettingSchema>({
    resolver: zodResolver(formSchemaUnitsSetting),
    defaultValues: formHelper.getDefaultValuesClientTierSetting(),
    mode: 'all'
  })

  // Form for Direct Purchase
  const formPlatformSetting = useForm<PlatformSettingSchema>({
    resolver: zodResolver(formSchemaPlatformSetting),
    defaultValues: formHelper.getDefaultValuesPlatformSetting(),
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
    setFilters(filterHelper.getDefaulClientFilterItemCode())
  }

  const handleDeleteSelection = () => {
    console.log('Delete selection')
  }

  const handleUnitsSetting = () => {
    console.log('Fabric Part Setting')
    setOpenClientTierSetting(true);
  }

  const handleOpenPlatformSetting = () => {
    setOpenPlatformSetting(true)
  }

  const handleAddNewClient = () => {
    setIsEdit(false)
    setIsAddNewFabric(false)
    setClientData(undefined)
    setOpenAddNewClientModel(true)
  }

  const handleDeleteItemCode = async () => {
    startLoading()
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (inforClientDelete) {
        // Delete single item
        setData((prevData) => prevData.filter((item) => item.id !== inforClientDelete.id))
        toast.success(t(TRANSLATE_KEYS.MESSAGE, 'deleteSuccessful'))
      }

      stopLoading()
      setOpenDelete(false)
      setInforClientDelete(undefined)
    } catch (error) {
      stopLoading()
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'deleteFailed'))
    }
  }

  const handleOpenDialogDeleteAction = (data?: ClientCode) => {
    setInforClientDelete(data)
    setOpenDelete(true)
  }

  const handleOpenDialogEditAction = (data?: ClientCode) => {
    setIsEdit(true)
    setIsAddNewFabric(false)
    setClientData(data)
    setOpenAddNewClientModel(true)
  }

  const handleSaveClientCode = async () => {
    if (isSubmitting || !formClientCode.formState.isValid) {
      return
    }

    setIsSubmitting(true)
      startLoading()
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

      const formValues = formClientCode.getValues()

      const newClientCode: ClientCode = {
        id: clientData?.id || `client-${Date.now()}`,
        businessRegistrationNumber: formValues[eClienttCodeFormKey.BusinessRegisterationNo],
        businessRegisterationNo: formValues[eClienttCodeFormKey.BusinessRegisterationNo],
        clientType: formValues[eClienttCodeFormKey.ClientCategory],
        clientCategory: formValues[eClienttCodeFormKey.ClientCategory],
        companyName: formValues[eClienttCodeFormKey.CompanyName],
        brandName: formValues[eClienttCodeFormKey.BrandName],
        clientTiers: formValues[eClienttCodeFormKey.ClientTiers],
        mainSalesChannel: formValues[eClienttCodeFormKey.MainSalesChannel],
        headOfficeAddress: formValues[eClienttCodeFormKey.HeadOfficeAddress],
        salesUrl: formValues[eClienttCodeFormKey.SalesUrl],
        companyEmail: formValues[eClienttCodeFormKey.CompanyEmail],
        contactName: formValues[eClienttCodeFormKey.ContactName],
        representativeTitle: formValues[eClienttCodeFormKey.RepresentativeTitle],
        contactPerson: formValues[eClienttCodeFormKey.ContactPerson],
        groupChatAgreement: formValues[eClienttCodeFormKey.GroupChatAgreement],
        password: formValues[eClienttCodeFormKey.Password],
        businessLicense: formValues[eClienttCodeFormKey.BusinessLicense],
        company: formValues[eClienttCodeFormKey.Company],
        brand: formValues[eClienttCodeFormKey.Brand],
        name: formValues[eClienttCodeFormKey.Name],
        contact: formValues[eClienttCodeFormKey.Contact],
        joinDate: clientData?.joinDate || new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '.').replace(/\s/g, ''),
        lastAccessed: clientData?.lastAccessed
      }

      if (clientData?.id) {
        // Update existing
        setData((prevData) => prevData.map((item) => (item.id === clientData.id ? newClientCode : item)))
      } else {
        // Add new
        setData((prevData) => [newClientCode, ...prevData])
      }

        stopLoading()
      toast.success(t(TRANSLATE_KEYS.MESSAGE, 'saveSuccessful'))
        setOpenAddNewClientModel(false)
        setClientData(undefined)
      setIsEdit(false)
        setTimeout(() => {
          formClientCode.reset(formHelper.getDefaultValuesClientCode())
        setIsSubmitting(false)
        }, 200)
      } catch (error) {
        stopLoading()
      setIsSubmitting(false)
      toast.error(t(TRANSLATE_KEYS.MESSAGE, 'saveFailed'))
    }
  }

  const handleCancelClick = () => {
    setIsAddNewFabric(false);
    setOpenAddNewClientModel(false)
  }
  return (
    <BaseLayoutContent>
      <ClientCodeAction
        searchResults={48}
        onDeleteSelection={handleDeleteSelection}
        onClientTierSettings={handleUnitsSetting}
        onPlatformSetting={handleOpenPlatformSetting}
        onAddNewClient={handleAddNewClient}
      />
      <ClientCodeFilters values={filters} onChange={setFilters} onSearch={handleSearch} />
      <TableCustom
        columns={columnHelper.getColumnsClientCodeTable(
          t,
          handleOpenDialogDeleteAction,
          handleOpenDialogEditAction
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
        open={openAddNewClientModel}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setIsAddNewFabric(false)
            setIsEdit(false)
            setClientData(undefined)
            setIsSubmitting(false)
            setTimeout(() => {
              formClientCode.reset(formHelper.getDefaultValuesClientCode())
            }, 200)
          }
          setOpenAddNewClientModel(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        classNameContent='sm:min-w-[800px] max-h-full  overflow-y-auto rounded-[15px]'
        onOkAction={handleSaveClientCode}
        disabledOkBtn={!formClientCode.formState.isValid || isSubmitting}
        title={isEdit ? t(TRANSLATE_KEYS.TITLE, 'editClientCode') : t(TRANSLATE_KEYS.TITLE, 'newClientRegister')}
        classNameHeader={'py-5'}
      >
        <ClientCodeForm form={formClientCode} data={clientData} addNewFabric={isAddNewFabric} isEdit={isEdit} onCancelAction={handleCancelClick} />
      </DialogCustom>
      <DialogCustom
        open={openClientTierSetting}
        onOpenChange={(isOpen) => {
          setOpenClientTierSetting(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'confirm')}
        classNameContent='sm:min-w-[950px] min-h-[369px] overflow-y-auto rounded-[15px]'
        onOkAction={() => {
          // TODO: Implement client tier setting save
          setOpenClientTierSetting(false)
        }}
        disabledOkBtn={!formClientTierSetting.formState.isValid}
        title={t(TRANSLATE_KEYS.TITLE, 'clientTierSetting')}
        classNameHeader={'py-5'}
        classNameWrapperChildrenContent={''}
      >
        <ClientTierSetting form={formClientTierSetting}/>
      </DialogCustom>
      <DialogCustom
        open={openPlatformSetting}
        onOpenChange={(isOpen) => {
          setOpenPlatformSetting(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'confirm')}
        classNameContent='sm:min-w-[800px] min-h-[369px] overflow-y-auto rounded-[15px]'
        onOkAction={() => { setOpenPlatformSetting(false) }}
        disabledOkBtn={!formPlatformSetting.formState.isValid}
        title={t(TRANSLATE_KEYS.TITLE, 'platformSetting')}
        classNameHeader={'py-5'}
        classNameWrapperChildrenContent={''}
      >
        <ClientCodePlatformSetting form={formPlatformSetting}/>
      </DialogCustom>
    </BaseLayoutContent>
  )
}

export default ClientRegister

