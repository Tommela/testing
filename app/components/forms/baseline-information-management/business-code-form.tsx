import { useEffect, useMemo } from 'react'

import type { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Button } from '~/components/ui/button'
import { TRANSLATE_KEYS } from '~/constants'
import { commonHelper } from '~/helpers'
import type { BusinessCodeFormSchema } from '~/helpers/schemas.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import type { IBusinessCode } from '~/types'
import { eBusinessCodeFormKey } from '~/types/enums/form.enum'

interface IBusinessCodeFormProps {
  form: UseFormReturn<BusinessCodeFormSchema>
  data?: IBusinessCode
}

// Default business category options
const DEFAULT_BUSINESS_CATEGORY_OPTIONS = [
  { value: 'Originator', label: 'Originator' },
  { value: 'Supplier', label: 'Supplier' },
  { value: 'Customer', label: 'Customer' },
  { value: '원사업체', label: '원사업체' },
  { value: '제조업체', label: '제조업체' },
  { value: '공급업체', label: '공급업체' },
  { value: '파트너사', label: '파트너사' },
  { value: '고객사', label: '고객사' }
]

// Default vendor PIC options
const DEFAULT_VENDOR_PIC_OPTIONS = [
  { value: 'PIC1', label: 'PIC 1' },
  { value: 'PIC2', label: 'PIC 2' },
  { value: 'PIC3', label: 'PIC 3' }
]

// Helper to get options including current value from data if not in options
const getOptionsWithCurrentValue = (
  options: Array<{ value: string; label: string }>,
  currentValue?: string
) => {
  const result = [...options]
  // If current value exists and is not in options, add it
  if (currentValue && !result.find((opt) => opt.value === currentValue)) {
    result.push({ value: currentValue, label: currentValue })
  }
  return result
}

const BusinessCodeForm = ({ form, data }: IBusinessCodeFormProps) => {
  const { t } = useAppTranslations()

  // Get current form values for dynamic options
  const businessCategoryValue = form.watch(eBusinessCodeFormKey.BusinessCategory)
  const vendorPICValue = form.watch(eBusinessCodeFormKey.VendorPIC)

  // Memoize options with current values
  const businessCategoryOptions = useMemo(
    () => getOptionsWithCurrentValue(DEFAULT_BUSINESS_CATEGORY_OPTIONS, businessCategoryValue || data?.businessCategory),
    [businessCategoryValue, data?.businessCategory]
  )

  const vendorPICOptions = useMemo(
    () => getOptionsWithCurrentValue(DEFAULT_VENDOR_PIC_OPTIONS, vendorPICValue || data?.vendorPIC),
    [vendorPICValue, data?.vendorPIC]
  )

  useEffect(() => {
    if (data && !commonHelper.isEmpty(data)) {
      setTimeout(() => {
        form.reset({
          [eBusinessCodeFormKey.BusinessCategory]: data.businessCategory || '',
          [eBusinessCodeFormKey.PartnerName]: data.partnerName || '',
          [eBusinessCodeFormKey.BusinessRegistrationNumber]: data.businessRegistrationNumber || '',
          [eBusinessCodeFormKey.Phone]: data.phone || '',
          [eBusinessCodeFormKey.Fax]: data.fax || '',
          [eBusinessCodeFormKey.HeadOfficeAddress]: data.headOfficeAddress || '',
          [eBusinessCodeFormKey.HeadOfficeAddressDetail]: '',
          [eBusinessCodeFormKey.ContactName]: data.contactPersonName || '',
          [eBusinessCodeFormKey.JobTitle]: data.contactPersonPosition || '',
          [eBusinessCodeFormKey.ContactEmail]: data.contactEmail || '',
          [eBusinessCodeFormKey.ContactPerson]: data.contactPhone || '',
          [eBusinessCodeFormKey.VendorPIC]: data.vendorPIC || '',
          [eBusinessCodeFormKey.VatStatus]: data.vatStatus || 'Y',
          [eBusinessCodeFormKey.Remarks]: data.remarks || ''
        })
      })
    }
  }, [data, form])

  return (
    <Form {...form}>
      <form className='flex flex-col gap-5'>
        {/* Business Information Section */}
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-5'>
            {/* First row: Business Category and Partner Name */}
            <div className='grid grid-cols-2 gap-5'>
              <FormField
                control={form.control}
                name={eBusinessCodeFormKey.BusinessCategory}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                      {t(TRANSLATE_KEYS.LABEL, 'businessCategory')}
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        form.trigger(eBusinessCodeFormKey.BusinessCategory)
                      }}
                      value={field.value ?? ''}
                    >
                      <FormControl className='w-full'>
                        <SelectTrigger iconCustom className='!text-[12px] !font-[400]'>
                          <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'select')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {businessCategoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className='text-[12px] font-[400]'>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={eBusinessCodeFormKey.PartnerName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                      {t(TRANSLATE_KEYS.LABEL, 'partnerName')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} className='!text-[12px] !font-[400]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Second row: Business Registration Number, Tel., and Fax */}
            <div className='grid grid-cols-3 gap-5'>
              <FormField
                control={form.control}
                name={eBusinessCodeFormKey.BusinessRegistrationNumber}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                      {t(TRANSLATE_KEYS.LABEL, 'businessRegistrationNumber')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} className='!text-[12px] !font-[400]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={eBusinessCodeFormKey.Phone}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                      {t(TRANSLATE_KEYS.LABEL, 'tel')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} className='!text-[12px] !font-[400]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={eBusinessCodeFormKey.Fax}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                      {t(TRANSLATE_KEYS.LABEL, 'fax')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} className='!text-[12px] !font-[400]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Head Office Address Section */}
        <div className='flex flex-col gap-5'>
          <FormLabel className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
            {t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.headOfficeAddress')}
          </FormLabel>
          <div className='flex flex-col gap-5'>
            <FormField
              control={form.control}
              name={eBusinessCodeFormKey.HeadOfficeAddress}
              render={({ field }) => (
                <FormItem>
                  <div className='flex gap-5'>
                    <FormControl className='flex-1'>
                      <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} {...field} />
                    </FormControl>
                    <Button type='button' variant='outline' className='bg-black text-white hover:bg-black hover:text-white text-[12px] font-[400]'>
                      {t(TRANSLATE_KEYS.ACTION, 'searchForAddresses')}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={eBusinessCodeFormKey.HeadOfficeAddressDetail}
              render={({ field }) => (
                <FormItem>
                    <FormControl>
                      <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'detailedAddress')} className='!text-[12px] !font-[400]' {...field} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className='flex flex-col gap-5'>
          <div className='grid grid-cols-4 gap-5'>
            <FormField
              control={form.control}
              name={eBusinessCodeFormKey.ContactName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                    {t(TRANSLATE_KEYS.LABEL, 'contactName')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={eBusinessCodeFormKey.JobTitle}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                    {t(TRANSLATE_KEYS.LABEL, 'jobTitle')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={eBusinessCodeFormKey.ContactEmail}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                    {t(TRANSLATE_KEYS.LABEL, 'contactEmail')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={eBusinessCodeFormKey.ContactPerson}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                    {t(TRANSLATE_KEYS.LABEL, 'contactPerson')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Additional Information Section */}
        <div className='flex flex-col gap-5'>
          <div className='grid grid-cols-3 gap-5'>
            <FormField
              control={form.control}
              name={eBusinessCodeFormKey.VendorPIC}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                    {t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.vendorPIC')}
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      form.trigger(eBusinessCodeFormKey.VendorPIC)
                    }}
                    value={field.value ?? ''}
                  >
                    <FormControl className='w-full'>
                      <SelectTrigger iconCustom className='!text-[12px] !font-[400]'>
                        <SelectValue placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vendorPICOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className='text-[12px] font-[400]'>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={eBusinessCodeFormKey.VatStatus}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                    {t(TRANSLATE_KEYS.LABEL, 'vatStatus')}
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value as 'Y' | 'N')
                      form.trigger(eBusinessCodeFormKey.VatStatus)
                    }}
                    value={field.value ?? 'Y'}
                  >
                    <FormControl className='w-full'>
                      <SelectTrigger iconCustom className='!text-[12px] !font-[400]'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Y' className='text-[12px] font-[400]'>Y</SelectItem>
                      <SelectItem value='N' className='text-[12px] font-[400]'>N</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={eBusinessCodeFormKey.Remarks}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[12px] font-gothic-a1 font-[600] leading-[20px] tracking-[-0.5%]'>
                    {t(TRANSLATE_KEYS.LABEL, 'remarks')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'enterContent')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}

export default BusinessCodeForm

