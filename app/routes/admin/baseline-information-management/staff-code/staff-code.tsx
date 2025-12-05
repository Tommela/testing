import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import DialogCustom from '~/components/customs/dialog-custom'
import TableCustom from '~/components/customs/table-custom'
import StaffCodeForm from '~/components/forms/baseline-information-management/staff-code-form'
import { TRANSLATE_KEYS } from '~/constants'
import { filterHelper, tableHelper } from '~/helpers'
import columnHelper from '~/helpers/column.helper'
import formHelper from '~/helpers/form.helper'
import cookieHelper from '~/helpers/cookie.helper'
import { getHRSettingSchema, getPermissionchema, getStaffCodeSchema, type HRSettingSchema, type Permissionschema, type StaffCodeFormSchema } from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import BaseLayoutContent from '~/layouts/base-layout-content'
import useGlobalLoaderStore from '~/stores/global-loader'
import { StaffService, type IStaffListResponse, type IUniqueNameResponse, type IUniqueEmpnoResponse, type IStaffCreatePayload, type IStaffUpdatePayload, type IStaffQueryParams } from '~/services/api'
import { HRInformationService, type IHRInformationResponse, type IPermission } from '~/services/api'
import type { IStaffCode } from '~/types'
import { ePermissionCodeFormKey } from '~/types/enums/form.enum'

import StaffCodeAction from './components/staff-code-action'
import StaffCodeFilters, { type IStaffCodeFilters } from './components/staff-code-filters'
import StaffCodeHRInfoSetting from './components/staff-code-hr-information-setting'
import StaffCodePermission from './components/staff-code-permission'

export function meta() {
  return [{ title: 'ERP - Staff code' }, { name: 'ERP System', content: 'Welcome to ERP' }]
}

// Helper function to convert date to YYYYMMDD format
const formatDateToYYYYMMDD = (dateString: string): string => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

// Helper function to convert YYYYMMDD format to calendar-friendly format
const formatYYYYMMDDToCalendar = (yyyymmdd: string): string => {
  if (!yyyymmdd || yyyymmdd.length !== 8) return '';

  try {
    const year = yyyymmdd.substring(0, 4);
    const month = yyyymmdd.substring(4, 6);
    const day = yyyymmdd.substring(6, 8);

    // Create date in YYYY-MM-DD format for calendar
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting YYYYMMDD date:', error);
    return '';
  }
};

const StaffCode = () => {
  const { t } = useAppTranslations()
  const { startLoading, stopLoading } = useGlobalLoaderStore()
  const maxHeightStaffCodeTableClass = tableHelper.getMaxHeightStaffCodeTableClass()
  
  // Filter state
  const [filters, setFilters] = useState<IStaffCodeFilters>(filterHelper.getDefaultFilterStaffCode())
  
  // Table data state
  const [data, setData] = useState<IStaffCode[]>([])
  const [allStaffData, setAllStaffData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Dialog state
  const [openUpsertStaff, setOpenUpsertStaff] = useState(false)
  const [dataStaffCode, setDataStaffCode] = useState<IStaffCode | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openHRInformationSetting, setOpenHRInformationSetting] = useState(false)
  const [openPermissionSetting, setOpenPermissionSetting] = useState(false)

  // HR Types data state
  const [hrTypes, setHrTypes] = useState<any[]>([])
  const [departmentData, setDepartmentData] = useState<IHRInformationResponse[]>([])
  const [contractTypesData, setContractTypesData] = useState<IHRInformationResponse[]>([])
  const [jobTitleData, setJobTitleData] = useState<IHRInformationResponse[]>([])
  const [employmentStatusData, setEmploymentStatusData] = useState<IHRInformationResponse[]>([])
  const [bankInfoData, setBankInfoData] = useState<IHRInformationResponse[]>([])
  const [permissionsData, setPermissionsData] = useState<IPermission[]>([])
  const [uniqueNamesData, setUniqueNamesData] = useState<string[]>([])
  const [uniqueEmpnoData, setUniqueEmpnoData] = useState<string[]>([])
  const [isLoadingHRData, setIsLoadingHRData] = useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false)
  const [inforStaffCodeDelete, setInforStaffCodeDelete] = useState<IStaffCode | undefined>(undefined)

  const formSchemaHRInfoSetting = getHRSettingSchema(t)
  const formSchemaPermission = getPermissionchema(t)
  
  // Form for Staff Code
  const formSchemaStaffCode = getStaffCodeSchema(t)
  const formStaffCode = useForm<StaffCodeFormSchema>({
    resolver: zodResolver(formSchemaStaffCode),
    defaultValues: formHelper.getDefaultValuesStaffCode(),
    mode: 'all'
  })
  const formHRInfoSetting = useForm<HRSettingSchema>({
    resolver: zodResolver(formSchemaHRInfoSetting),
    defaultValues: formHelper.getDefaultValuesHRInfoSetting(),
    mode: 'all'
  })
  const formPermission = useForm<Permissionschema>({
    resolver: zodResolver(formSchemaPermission),
    defaultValues: formHelper.getDefaultValuesPermisssion(),
    mode: 'all'
  })

  // Function to transform API response to IStaffCode format
  const transformApiDataToStaffCode = (apiData: any[]): IStaffCode[] => {
    return apiData.map((item) => ({
      id: item.id,
      email: item.email || '',
      employeeNo: item.employeeId || '',
      name: item.name || '',
      department: item.department?.name || '',
      jobTitle: item.jobtitle?.name || '',
      employmentStatus: item.employmentstatus?.name || '',
      dateOfHire: item.hireddate || '',
      exitDate: item.exitdate || '-',
      contact: item.contact || '',
      contractTypes: item.contracttype?.name || '',
      permissions: item.role?.name || '',
      payrollAccountInfo: {
        bankName: item.bankname?.name || '',
        accountNumber: item.accountnumber || '',
        depository: item.accountholder || ''
      }
    }))
  }

  // Load staff data from API
  const loadStaffData = async (searchParams?: IStaffQueryParams) => {
    try {
      setIsLoading(true)
      const response: IStaffListResponse = await StaffService.getAll(searchParams)
      const transformedData = transformApiDataToStaffCode(response.dataList || [])
      setData(transformedData)

      // Only update allStaffData when loading without search parameters (initial load)
      if (!searchParams) {
        setAllStaffData(response.dataList || [])
      }
    } catch (error: any) {
      console.error('Error loading staff data:', error)
      toast.error(`Failed to load staff data: ${error?.message || 'Unknown error'}`)
      setData([])
      if (!searchParams) {
        setAllStaffData([])
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Load HR types from API
  const loadHRTypes = async () => {
    try {
      const response = await HRInformationService.getTypeAll()

      if (response.data) {
        setHrTypes(response.data)
      }
    } catch (error: any) {
      console.error('Error loading HR types:', error)
      toast.error(`Failed to load HR types: ${error?.message || 'Unknown error'}`)
    }
  }

  // Helper function to find HR information object by name
  const findHRInfoByName = (data: IHRInformationResponse[], name: string) => {
    const item = data.find(item => item.name === name)
    // Get current user ID from cookies
    const currentUserId = cookieHelper.getUserId()

    if (!item) {
      // Return a default structure if not found
      return {
        id: '',
        createddate: new Date().toISOString(),
        updateddate: new Date().toISOString(),
        recordstatus: 1,
        user_id: currentUserId,
        name: name,
        type: {
          id: '',
          createddate: new Date().toISOString(),
          updateddate: new Date().toISOString(),
          recordstatus: 1,
          user_id: currentUserId,
          name: ''
        }
      }
    }
    return {
      id: item.id,
      createddate: item.createddate,
      updateddate: item.updateddate,
      recordstatus: item.recordstatus,
      user_id: item.user_id || currentUserId,
      name: item.name,
      type: {
        ...item.type,
        user_id: item.type?.user_id || currentUserId
      }
    }
  }

  // Helper function to find permission object by name
  const findPermissionByName = (data: IPermission[], name: string) => {
    const item = data.find(item => item.name === name)
    const currentUserId = cookieHelper.getUserId()

    if (!item) {
      return {
        id: '',
        name: name,
        readable: true,
        editable: true,
        createddate: new Date().toISOString(),
        updateddate: new Date().toISOString(),
        recordstatus: 1,
        user_id: currentUserId
      }
    }

    return {
      id: item.id,
      name: item.name,
      readable: item.readable,
      editable: item.editable,
      createddate: item.createddate || new Date().toISOString(),
      updateddate: item.updateddate || new Date().toISOString(),
      recordstatus: item.recordstatus || 1,
      user_id: item.user_id || currentUserId
    }
  }

  // Load unique names from API
  const loadUniqueNames = async () => {
    try {
      const response: IUniqueNameResponse = await StaffService.getUniqueName()
      setUniqueNamesData(response.dataList || [])
    } catch (error: any) {
      console.error('Error loading unique names:', error)
      toast.error(`Failed to load unique names: ${error?.message || 'Unknown error'}`)
    }
  }

  // Load unique employee numbers from API
  const loadUniqueEmpno = async () => {
    try {
      const response: IUniqueEmpnoResponse = await StaffService.getUniqueEmpno()
      setUniqueEmpnoData(response.dataList || [])
    } catch (error: any) {
      console.error('Error loading unique employee numbers:', error)
      toast.error(`Failed to load unique employee numbers: ${error?.message || 'Unknown error'}`)
    }
  }

  useEffect(() => {
    // Load initial data on component mount
    const initializeData = async () => {
      try {
        await Promise.all([loadStaffData(), loadHRTypes(), loadPermissions(), loadUniqueNames(), loadUniqueEmpno()])
      } catch (error) {
        console.error('Error initializing staff-code data:', error)
      }
    }

    initializeData()
  }, [])

  // Load HR data when hrTypes becomes available
  useEffect(() => {
    if (hrTypes.length > 0) {
      loadAllHRData();
    }
  }, [hrTypes])

  const handleHrInformationSetting = () => {
    setOpenHRInformationSetting(true)
  }

  const handleSetPermissionSetting = () => {
    setOpenPermissionSetting(true)
  }

  const handleSelectPermission = (permission: IPermission) => {
    formPermission.setValue(ePermissionCodeFormKey.Permission, permission.name)
    formPermission.trigger(ePermissionCodeFormKey.Permission)
  }

  const handleNewPermission = () => {
    formPermission.setValue(ePermissionCodeFormKey.Permission, '')
    formPermission.clearErrors(ePermissionCodeFormKey.Permission)
  }

  // Load permissions data
  const loadPermissions = async () => {
    try {
      const response = await HRInformationService.getPermissions()

      if (response.status && response.data) {
        setPermissionsData(response.data)
      }
    } catch (error: any) {
      console.error('Error loading permissions:', error)
      toast.error(`Failed to load permissions: ${error?.message || 'Unknown error'}`)
    }
  }

  // Load all HR data for each type
  const loadAllHRData = async (typesToLoad?: any[]) => {
    const hrTypesToUse = typesToLoad || hrTypes;

    if (hrTypesToUse.length === 0) {
      return
    }

    try {
      setIsLoadingHRData(true)

      // Map type names to their corresponding state setters
      const typeMapping: {[key: string]: (data: IHRInformationResponse[]) => void} = {
        'Department': setDepartmentData,
        'Contract Type': setContractTypesData,
        'Job Title': setJobTitleData,
        'Employment Status': setEmploymentStatusData,
        'Bank Name': setBankInfoData,
      }

      // Load data for each HR type
      for (const hrType of hrTypesToUse) {
        try {
          const response = await HRInformationService.getByType(hrType.id)

          if (response.data) {
            const filteredData = response.data.filter((item: any) =>
              item.type?.id === hrType.id
            )

            // Set data based on type name
            const setter = typeMapping[hrType.name]
            if (setter) {
              setter(filteredData)
            } else {
            }
          } else {
          }
        } catch (error: any) {
          console.error(`Error loading data for ${hrType.name}:`, error)
        }
      }
    } catch (error: any) {
      console.error('Error loading HR data:', error)
      toast.error(`Failed to load HR data: ${error?.message || 'Unknown error'}`)
    } finally {
      setIsLoadingHRData(false)
    }
  }

  const handleAddNew = () => {
    setDataStaffCode(undefined)
    setIsEdit(false)
    // Open the dialog immediately - all data is already loaded
    setOpenUpsertStaff(true)
  }

  const handleSaveStaffCode = async () => {
    if (isSubmitting || !formStaffCode.formState.isValid) {
      return
    }

    setIsSubmitting(true)
    startLoading()
    try {
      const formValues = formStaffCode.getValues()

      const payload: IStaffCreatePayload = {
        basic_information: {
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
          contact: formValues.contact
        },
        contract_information: {
          contact: formValues.contactInfo,
          employment_status: findHRInfoByName(employmentStatusData, formValues.employmentStatus),
          department: findHRInfoByName(departmentData, formValues.department),
          jobtitle: findHRInfoByName(jobTitleData, formValues.jobTitle),
          contracttype: findHRInfoByName(contractTypesData, formValues.contractTypes),
          dateofhire: formatDateToYYYYMMDD(formValues.dateOfHire),
          exitdate: formValues.exitDate ? formatDateToYYYYMMDD(formValues.exitDate) : undefined,
          permission: findPermissionByName(permissionsData, formValues.permissions)
        },
        payroll_infromation: {
          bankname: findHRInfoByName(bankInfoData, formValues.bankName || ''),
          accountnum: formValues.accountNumber || '',
          accountholder: formValues.accountHolder || ''
        }
      }


      if (dataStaffCode) {
        // Update existing staff
        const updatePayload: IStaffUpdatePayload = {
          id: dataStaffCode.id,
          ...payload
        }
        await StaffService.update(updatePayload)
        toast.success(t(TRANSLATE_KEYS.MESSAGE, 'updateSuccessful'))
      } else {
        // Create new staff

        try {
          const result = await StaffService.create(payload)
          toast.success(t(TRANSLATE_KEYS.MESSAGE, 'saveSuccessful'))
        } catch (createError: any) {
          console.error('Staff create error:', createError)
          throw createError
        }
      }

      // Reload data from API
      await loadStaffData()

      stopLoading()
      setOpenUpsertStaff(false)
      setDataStaffCode(undefined)
      setIsEdit(false)
      setTimeout(() => {
        formStaffCode.reset(formHelper.getDefaultValuesStaffCode())
        setIsSubmitting(false)
      }, 200)
    } catch (error: any) {
      stopLoading()
      setIsSubmitting(false)
      const errorMessage = error?.message || t(TRANSLATE_KEYS.MESSAGE, 'saveFailed')
      toast.error(errorMessage)
    }
  }

  const handleSearch = async () => {
    try {
      setIsLoading(true)

      // Convert filter values to API parameters
      const searchParams: IStaffQueryParams = {
        page: 1,
        pageSize: 100, // Get more results to show in table
      }

      // Add filter values if they exist
      if (filters.department) {
        searchParams.department = filters.department
      }
      if (filters.name) {
        searchParams.name = filters.name
      }
      if (filters.employeeNo) {
        searchParams.employeeNo = filters.employeeNo
      }
      if (filters.jobTitle) {
        searchParams.jobtitle = filters.jobTitle
      }

      // Call API with search parameters
      await loadStaffData(searchParams)
    } catch (error: any) {
      console.error('Error searching staff:', error)
      toast.error(`Search failed: ${error?.message || 'Unknown error'}`)
    }
  }

  const handleResetFilter = async () => {
    setFilters(filterHelper.getDefaultFilterStaffCode())
    // Reload all data without filters
    await loadStaffData()
  }

  const handleOpenDialogEditAction = async (data?: IStaffCode) => {
    if (!data?.id) return;

    try {
      setIsEdit(true)
      startLoading()

      // Call the staff detail API to get fresh data
      const staffDetailRes = await StaffService.getDetail(data.id) as any
      const staffDetail = staffDetailRes.data;

      // Transform the API response to match the form structure
      // The API returns nested structure: basic_information, contract_information, payroll_infromation
      const transformedData: IStaffCode = {
        id: staffDetail.id,
        employeeNo: staffDetail.employeeNo || '', // This might not be in the response
        name: staffDetail.basic_information?.name || '',
        email: staffDetail.basic_information?.email || '',
        contact: staffDetail.basic_information?.contact || '',
        contactInfo: staffDetail.contract_information?.contact || staffDetail.basic_information?.contact || '',
        // Extract names from nested HR information objects
        department: staffDetail.contract_information?.department?.name || '',
        jobTitle: staffDetail.contract_information?.jobtitle?.name || '',
        employmentStatus: staffDetail.contract_information?.employment_status?.name || 'Active',
        contractTypes: staffDetail.contract_information?.contracttype?.name || '',
        dateOfHire: formatYYYYMMDDToCalendar(staffDetail.contract_information?.dateofhire || ''),
        exitDate: formatYYYYMMDDToCalendar(staffDetail.contract_information?.exitdate || ''),
        permissions: staffDetail.contract_information?.permission?.name || '',
        payrollAccountInfo: {
          bankName: staffDetail.payroll_infromation?.bankname?.name || '',
          accountNumber: staffDetail.payroll_infromation?.accountnum || '',
          depository: staffDetail.payroll_infromation?.accountholder || ''
        },
        password : staffDetail?.basic_information?.password
      }
      setDataStaffCode(transformedData)
      setOpenUpsertStaff(true)
    } catch (error: any) {
      console.error('Error fetching staff details:', error)
      toast.error(`Failed to fetch staff details: ${error?.message || 'Unknown error'}`)
      // Fallback to using table data if API call fails
      setDataStaffCode(data)
      setOpenUpsertStaff(true)
    } finally {
      stopLoading()
    }
  }

  const handleDeleteStaff = async () => {
    if (!inforStaffCodeDelete) return

    try {
      startLoading()

      // Call the delete API
      await StaffService.delete(inforStaffCodeDelete.id)

      // Reload staff data after successful deletion
      await loadStaffData()

      stopLoading()
      toast.success(t(TRANSLATE_KEYS.MESSAGE, 'deleteSuccessful'))
      setOpenDelete(false)
      setInforStaffCodeDelete(undefined)
    } catch (error: any) {
      stopLoading()
      console.error('Staff delete error:', error)
      toast.error(error?.message || t(TRANSLATE_KEYS.MESSAGE, 'deleteFailed'))
    }
  }

  const handleOpenDialogDeleteAction = (data?: IStaffCode) => {
    if (!data) return
    setInforStaffCodeDelete(data)
    setOpenDelete(true)
  }

  const handlePasswordReset = (data?: IStaffCode) => {
    // TODO: Implement password reset functionality
  }

  const handleSaveHRInfoSetting = async () => {
    try {
      startLoading()

      // Call the child component's save handler
      if (typeof window !== 'undefined' && (window as any).handleSaveHRInfoSetting) {
        await (window as any).handleSaveHRInfoSetting();
      }

      stopLoading()
      setOpenHRInformationSetting(false)
    } catch (error: any) {
      stopLoading()
      const errorMessage = error?.message || t(TRANSLATE_KEYS.MESSAGE, 'saveFailed')
      toast.error(errorMessage)
    }
  }

  return (
    <BaseLayoutContent>
      {/* Action */}
      <StaffCodeAction
        onHrInformationSetting={handleHrInformationSetting}
        onSetPermissionSetting={handleSetPermissionSetting}
        onAddNew={handleAddNew}
      />

      {/* Filter */}
      <StaffCodeFilters
        values={filters}
        onChange={setFilters}
        onSearch={handleSearch}
        departmentData={departmentData}
        jobTitleData={jobTitleData}
        employmentStatusData={employmentStatusData}
        uniqueNamesData={Array.from(new Set(allStaffData.map(staff => staff.name).filter((name): name is string => Boolean(name))))}
        uniqueEmpnoData={Array.from(new Set(allStaffData.map(staff => staff.employeeId).filter((empId): empId is string => Boolean(empId))))}
        isLoadingHRData={isLoadingHRData}
      />

      {/* Table */}
      <TableCustom
        columns={columnHelper.getColumnsStaffCodeTable(
          t,
          handleOpenDialogDeleteAction,
          handleOpenDialogEditAction,
          handlePasswordReset
        )}
        data={data}
        loading={isLoading}
        maxHeightClass={maxHeightStaffCodeTableClass}
        onRowEdit={handleOpenDialogEditAction}
        onRowDelete={handleOpenDialogDeleteAction}
      />

      {/* Dialog Upsert Staff */}
      <DialogCustom
        open={openUpsertStaff}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDataStaffCode(undefined)
            setIsEdit(false)
            setIsSubmitting(false)
            setTimeout(() => {
              formStaffCode.reset(formHelper.getDefaultValuesStaffCode())
            }, 200)
          }
          setOpenUpsertStaff(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        classNameContent='sm:min-w-[900px] min-h-[560px] overflow-y-auto rounded-[15px]'
        onOkAction={handleSaveStaffCode}
        disabledOkBtn={!formStaffCode.formState.isValid || isSubmitting}
        title={dataStaffCode ? t(TRANSLATE_KEYS.TITLE, 'editStaff') : t(TRANSLATE_KEYS.TITLE, 'newStaff')}
        classNameHeader={'py-5'}
      >
        <StaffCodeForm
          form={formStaffCode}
          data={dataStaffCode}
          departmentData={departmentData}
          contractTypesData={contractTypesData}
          jobTitleData={jobTitleData}
          employmentStatusData={employmentStatusData}
          bankInfoData={bankInfoData}
          permissionsData={permissionsData}
          uniqueNamesData={uniqueNamesData}
          uniqueEmpnoData={uniqueEmpnoData}
          isLoadingHRData={isLoadingHRData}
          isEdit={isEdit}
        />
      </DialogCustom>
      <DialogCustom
        open={openHRInformationSetting}
        onOpenChange={(isOpen) => {
          setOpenHRInformationSetting(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'confirm')}
        classNameContent='sm:min-w-[950px] min-h-[369px] overflow-y-auto rounded-[15px]'
        onOkAction={handleSaveHRInfoSetting}
        disabledOkBtn={false}
        title={t(TRANSLATE_KEYS.TITLE, 'hrInformationSetting')}
        classNameHeader={'py-5'}
        classNameWrapperChildrenContent={''}
      >
        <StaffCodeHRInfoSetting
          form={formHRInfoSetting}
          hrTypes={hrTypes}
          departmentData={departmentData}
          contractTypesData={contractTypesData}
          jobTitleData={jobTitleData}
          employmentStatusData={employmentStatusData}
          bankInfoData={bankInfoData}
          onDataChange={loadAllHRData}
        />
      </DialogCustom>
      <DialogCustom
        open={openPermissionSetting}
        // hiddenFooter={true}
        onOpenChange={(isOpen) => {
          setOpenPermissionSetting(isOpen)
        }}
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'confirm')}
        classNameContent='sm:min-w-[950px] min-h-[369px] overflow-y-auto rounded-[15px]'
        onOkAction={() => { setOpenPermissionSetting(false) }}
        disabledOkBtn={!formPermission.formState.isValid}
        title={t(TRANSLATE_KEYS.TITLE, 'setPermission')}
        classNameHeader={'py-5'}
        classNameWrapperChildrenContent={''}
      >
        <StaffCodePermission
          form={formPermission}
          onSelectPermission={handleSelectPermission}
          onNewPermission={handleNewPermission}
        />
      </DialogCustom>

      {/* Delete Confirmation Dialog */}
      <DialogCustom
        open={openDelete}
        onOpenChange={setOpenDelete}
        hiddenHeader
        cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
        okText={t(TRANSLATE_KEYS.ACTION, 'check')}
        onOkAction={handleDeleteStaff}
      >
        <p className='text-center py-[29px] text-black-main leading-[30px] tracking-[-0.5%] font-bold text-[22px]'>
          {t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToDeleteIt')}
        </p>
      </DialogCustom>
    </BaseLayoutContent>
  )
}

export default StaffCode

