import { useEffect } from 'react'

import type { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { TRANSLATE_KEYS } from '~/constants'
import { commonHelper } from '~/helpers'
import type { StaffCodeFormSchema } from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import type { IStaffCode } from '~/types'
import { eStaffCodeFormKey } from '~/types/enums/form.enum'
import { DatePicker } from '~/components/ui/date-picker'
import { Separator } from '~/components/ui/separator'
import type { IHRInformationResponse, IPermission } from '~/services/api'

// Helper function to format date to "Jan. 20, 2025" format
export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return ''
  
  // If already in "Jan. 20, 2025" format, return as is
  if (/^\w+\.\s+\d+,\s+\d+$/.test(dateString)) {
    return dateString
  }
  
  // If in YYYY-MM-DD format, convert it
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    
    const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    
    return `${month} ${String(day).padStart(2, '0')}, ${year}`
  }
  
  // Try to parse other date formats
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  
  return `${month} ${String(day).padStart(2, '0')}, ${year}`
}

// Helper function to convert "Jan. 20, 2025" format to YYYY-MM-DD for input
export const parseDateForInput = (dateString: string): string => {
  if (!dateString || dateString === '-') return ''
  
  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString
  }
  
  // Try to parse "Jan. 20, 2025" format
  const months: { [key: string]: string } = {
    'Jan.': '01', 'Feb.': '02', 'Mar.': '03', 'Apr.': '04',
    'May': '05', 'Jun.': '06', 'Jul.': '07', 'Aug.': '08',
    'Sep.': '09', 'Oct.': '10', 'Nov.': '11', 'Dec.': '12'
  }
  
  const match = dateString.match(/(\w+\.?)\s+(\d+),\s+(\d+)/)
  if (match) {
    const [, monthStr, day, year] = match
    const month = months[monthStr] || '01'
    return `${year}-${month}-${String(day).padStart(2, '0')}`
  }
  
  // Try to parse as standard date string
  const date = new Date(dateString)
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  return ''
}

interface IStaffCodeFormProps {
  form: UseFormReturn<StaffCodeFormSchema, any, StaffCodeFormSchema>
  data?: IStaffCode
  departmentData?: IHRInformationResponse[]
  contractTypesData?: IHRInformationResponse[]
  jobTitleData?: IHRInformationResponse[]
  employmentStatusData?: IHRInformationResponse[]
  bankInfoData?: IHRInformationResponse[]
  permissionsData?: IPermission[]
  uniqueNamesData?: string[]
  uniqueEmpnoData?: string[]
  isLoadingHRData?: boolean
  isEdit?: boolean
}

const StaffCodeForm = ({
  form,
  data,
  departmentData = [],
  contractTypesData = [],
  jobTitleData = [],
  employmentStatusData = [],
  bankInfoData = [],
  permissionsData = [],
  uniqueNamesData = [],
  uniqueEmpnoData = [],
  isLoadingHRData = false,
  isEdit = false
}: IStaffCodeFormProps) => {
  const { t } = useAppTranslations()

  useEffect(() => {
    if (!commonHelper.isEmpty(data)) {
      setTimeout(() => {

        form.reset({
          name: data?.name || '',
          email: data?.email || '',
          contact: data?.contact || '',
          contactInfo: data?.contactInfo || '',
          password: data?.password, // Don't populate password for security
          department: data?.department || '',
          employmentStatus: data?.employmentStatus || '',
          dateOfHire: data?.dateOfHire ? parseDateForInput(data.dateOfHire) : '',
          exitDate: data?.exitDate && data.exitDate !== '-' ? parseDateForInput(data.exitDate) : '',
          jobTitle: data?.jobTitle || '',
          contractTypes: data?.contractTypes || '',
          permissions: data?.permissions || '',
          bankName: data?.payrollAccountInfo?.bankName || '',
          accountNumber: data?.payrollAccountInfo?.accountNumber || '',
          accountHolder: data?.payrollAccountInfo?.depository || ''
        })
      }, 100) // Shorter timeout since HR data is pre-loaded
    }
  }, [data])
  return (
    <Form {...form}>
      <form className='flex flex-col mx-[-15px]' style={{ gap: '15px' }}>
        {/* Basic information */}
        <section className='flex flex-col border-b-1 border-[#F2F4F7] px-[15px] pb-5' style={{ gap: '20px' }}>
          {/* <h3 className='text-black-main font-semibold text-base'>{t(TRANSLATE_KEYS.LABEL, 'basicInformation')}</h3> */}
          <p className="text-[12px] my-0 py-0 font-[600]">
            {t(TRANSLATE_KEYS.LABEL, 'basicInformation')}
          </p>
          <div className='grid grid-cols-4 gap-5'>
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.Name}
              render={({ field }) => (

                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.name')}
                  </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                        {...field}
                  
                  />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.Email}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.email')}
                  </FormLabel>
                    <FormControl>
                      <Input
                        // value={field.value}
                        // disabled={isEdit}
                        placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                        {...field}
                      />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.Contact}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.contact')}
                  </FormLabel>
                    <FormControl>
                      <Input
                        // value={field.value}
                        // disabled={isEdit}
                        placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                        {...field}
                      />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.Password}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.password')}
                  </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        // value={field.value}
                        disabled={isEdit}
                        placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                        {...field}
                      />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>
        </section>
        
        {/* Contract information */}
        <section className='flex flex-col border-b-1 border-[#F2F4F7] px-[15px] pb-5' style={{ gap: '20px' }}>
          <p className="text-[12px] my-0 py-0 font-[600]">
            {t(TRANSLATE_KEYS.LABEL, 'contractInformation')}
          </p>
          <div className='grid grid-cols-4 gap-5'>
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.ContactInfo}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.contact')}
                  </FormLabel>
                    <FormControl>
                      <Input
                        // value={field.value}
                        // disabled={isEdit}
                        placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                        {...field}
                      />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.EmploymentStatus}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.employmentStatus')} </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger className='w-full text-[12px]'>
                        <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingHRData ? (
                        <SelectItem value="loading" disabled className='text-[12px]'>
                          Loading...
                        </SelectItem>
                      ) : employmentStatusData.length > 0 ? (
                        employmentStatusData.map((item) => (
                          <SelectItem key={item.id} value={item.name} className='text-[12px]'>
                            {item.name}
                          </SelectItem>
                        ))
                      ): null}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.DateOfHire}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[12px]'>
                    {t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.dateOfHire')} ({t(TRANSLATE_KEYS.LABEL, 'typeOrSelectDate')})
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value)
                      }}
                      placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectDate')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.ExitDate}
              render={({ field }) => (
                <FormItem >
                  <FormLabel className='text-[12px]'>
                    {t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.exitDate')} ({t(TRANSLATE_KEYS.LABEL, 'typeOrSelectDate')})
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value)
                      }}
                      placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'selectDate')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.Department}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.department')} </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger className='w-full text-[12px]'>
                        <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingHRData ? (
                        <SelectItem value="loading" disabled className='text-[12px]'>
                          Loading...
                        </SelectItem>
                      ) : departmentData.length > 0 ? (
                        departmentData.map((item) => (
                          <SelectItem key={item.id} value={item.name} className='text-[12px]'>
                            {item.name}
                          </SelectItem>
                        ))
                      ) : null}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.JobTitle}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.jobTitle')} </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger className='w-full text-[12px]'>
                        <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingHRData ? (
                        <SelectItem value="loading" disabled className='text-[12px]'>
                          Loading...
                        </SelectItem>
                      ) : jobTitleData.length > 0 ? (
                        jobTitleData.map((item) => (
                          <SelectItem key={item.id} value={item.name} className='text-[12px]'>
                            {item.name}
                          </SelectItem>
                        ))
                      ) : null}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.ContractTypes}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.contractTypes')} </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger className='w-full text-[12px]'>
                        <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingHRData ? (
                        <SelectItem value="loading" disabled className='text-[12px]'>
                          Loading...
                        </SelectItem>
                      ) : contractTypesData.length > 0 ? (
                        contractTypesData.map((item) => (
                          <SelectItem key={item.id} value={item.name} className='text-[12px]'>
                            {item.name}
                          </SelectItem>
                        ))
                      ) : null}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.Permissions}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.permissions')} </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger className='w-full text-[12px]'>
                        <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingHRData ? (
                        <SelectItem value="loading" disabled className='text-[12px]'>
                          Loading...
                        </SelectItem>
                      ) : permissionsData.length > 0 ? (
                        permissionsData.map((item) => (
                          <SelectItem key={item.id} value={item.name} className='text-[12px]'>
                            {item.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-data" disabled className='text-[12px]'>
                          No permissions available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Payroll Account Info */}
        <section className='flex flex-col px-[15px]' style={{ gap: '20px' }}>
          <h3 className='text-black-main font-semibold text-base text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'payrollAccountInfo')}</h3>
          <div className='grid grid-cols-3 gap-5'>
            <FormField
              control={form.control}
              name={eStaffCodeFormKey.BankName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'bankName')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingHRData ? (
                        <SelectItem value="loading" disabled className='text-[12px]'>
                          Loading...
                        </SelectItem>
                      ) : bankInfoData.length > 0 ? (
                        bankInfoData.map((item) => (
                          <SelectItem key={item.id} value={item.name} className='text-[12px]'>
                            {item.name}
                          </SelectItem>
                        ))
                      ) : null}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={eStaffCodeFormKey.AccountNumber}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'accountNumber')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} className='w-full text-[12px] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={eStaffCodeFormKey.AccountHolder}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px]'>{t(TRANSLATE_KEYS.LABEL, 'accountHolder')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} className='w-full text-[12px]' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
      </form>
    </Form>
  )
}

export default StaffCodeForm

