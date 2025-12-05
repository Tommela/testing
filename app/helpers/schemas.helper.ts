import type { platform } from 'os'
import { z } from 'zod'
import { TRANSLATE_KEYS } from '~/constants'
import { type IAppTranslations, eDirectPurchaseType } from '~/types'
import { eFabricCodeFormKey, eItemCodeFormKey, eLoginFormKey, eSettingYarnFormKey, eTestFormKey, eYarnCodeFormKey,eSettingFabricPartFormKey, eSettingBusinessCategoryFormKey, eStaffCodeFormKey, eUnitsSettingCodeFormKey, eHRInfoSettingCodeFormKey, ePermissionCodeFormKey, eClientTierSettingCodeFormKey, ePlatformSettingCodeFormKey, eBusinessCodeFormKey, eClienttCodeFormKey } from '~/types/enums/form.enum'

export const getTestSchema = (t: (key: string) => string) =>
  z
    .object({
      [eTestFormKey.Quantity]: z.string().nonempty({ message: t('inputValidate.fieldCannotBeEmpty') }),
      [eTestFormKey.Status]: z.enum(['IN_PROGRESS', 'PENDING', 'DONE'], {
        message: 'You need to select a notification type.'
      }),
      [eTestFormKey.Username]: z.string().optional(),
      [eTestFormKey.Items]: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one item!.'
      }),
      [eTestFormKey.Bio]: z
        .string()
        .min(10, {
          message: 'Bio must be at least 10 characters.'
        })
        .max(160, {
          message: 'Bio must not be longer than 30 characters.'
        }),
      [eTestFormKey.Email]: z.string().nonempty({ message: t('inputValidate.fieldCannotBeEmpty') })
    })
    .superRefine((data, ctx) => {
      if (data[eTestFormKey.Status] === 'PENDING') {
        console.log('check ne: ', data[eTestFormKey.Username])
        if (!data[eTestFormKey.Username]) {
          ctx.addIssue({
            code: 'custom',
            path: [eTestFormKey.Username],
            message: t('inputValidate.fieldCannotBeEmpty')
          })
        }
      }
    })

export type TestFormSchema = z.infer<ReturnType<typeof getTestSchema>>

export const getLoginSchema = (t: IAppTranslations) =>
  z.object({
    [eLoginFormKey.Email]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eLoginFormKey.Password]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') })
  })

export type LoginFormSchema = z.infer<ReturnType<typeof getLoginSchema>>

// Yarn code
export const getYarnCodeSchema = (t: IAppTranslations) =>
  z.object({
    [eYarnCodeFormKey.YarnType]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eYarnCodeFormKey.YarnName]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eYarnCodeFormKey.YarnColor]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eYarnCodeFormKey.Note]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') })
  })

export type YarnCodeFormSchema = z.infer<ReturnType<typeof getYarnCodeSchema>>

// Setting yarn
export const getSettingYarnSchema = (t: IAppTranslations) =>
  z.object({
    [eSettingYarnFormKey.YarnType]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') })
  })

export type SettingYarnFormSchema = z.infer<ReturnType<typeof getSettingYarnSchema>>

// Setting fabric part
export const getSettingFabricPartSchema = (t: IAppTranslations) =>
  z.object({
    [eSettingFabricPartFormKey.FabricPart]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') })
  })

export type SettingFabricPartFormSchema = z.infer<ReturnType<typeof getSettingFabricPartSchema>>

// Setting business category
export const getSettingBusinessCategorySchema = (t: IAppTranslations) =>
  z.object({
    [eSettingBusinessCategoryFormKey.BusinessCategory]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') })
  })

export type SettingBusinessCategoryFormSchema = z.infer<ReturnType<typeof getSettingBusinessCategorySchema>>

// Item code
export const getItemCodeSchema = (t: IAppTranslations) =>
  z
    .object({
      [eItemCodeFormKey.DirectPurchase]: z.enum(['Y', 'N'], {
        message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
      }),
      [eItemCodeFormKey.FabricPart]: z
        .string()
        .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
      [eItemCodeFormKey.BusinessCategory]: z
        .string()
        .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
      [eItemCodeFormKey.ProducedBy]: z
        .string()
        .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
      [eItemCodeFormKey.ProductionUnit]: z
        .string()
        .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
      [eItemCodeFormKey.SalesUnit]: z
        .string()
        .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
      [eItemCodeFormKey.Discontinued]: z.enum(['Y', 'N'], {
        message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
      }),
      [eItemCodeFormKey.ItemName]: z.string().nonempty({
        message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
      }),
      [eItemCodeFormKey.SaleItemName]: z.string().optional(),
      [eItemCodeFormKey.Remarks]: z.string().optional()
    })
    .superRefine((data, ctx) => {
      // SaleItemName is required only when DirectPurchase is 'Y'
      if (data[eItemCodeFormKey.DirectPurchase] === 'Y') {
        if (!data[eItemCodeFormKey.SaleItemName] || data[eItemCodeFormKey.SaleItemName].trim() === '') {
          ctx.addIssue({
            code: 'custom',
            path: [eItemCodeFormKey.SaleItemName],
            message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
          })
        }
      }
    })

export type ItemCodeFormSchema = z.infer<ReturnType<typeof getItemCodeSchema>>

//Fabric code Schema
export const getFabricCodeSchema = (t: IAppTranslations) =>
  z.object({
    [eFabricCodeFormKey.DirectPurchase]: z.enum([eDirectPurchaseType.Y, eDirectPurchaseType.N], {
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eFabricCodeFormKey.FabricPart]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.ItemName]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.PrintDesign]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.Color]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.BtNo]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.ProdSpec]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.ProdCost]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.ProdUnits]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.SaleUnits]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.DiscontinuedInProd]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.Loss]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eFabricCodeFormKey.Remarks]: z.string().optional(),
  })

export type FabricCodeFormSchema = z.infer<ReturnType<typeof getFabricCodeSchema>>
// Staff code
export const getStaffCodeSchema = (t: IAppTranslations) =>
  z.object({
    [eStaffCodeFormKey.Name]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.Email]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.Contact]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.Password]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
     [eStaffCodeFormKey.ContactInfo]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.Department]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.EmploymentStatus]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.DateOfHire]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.ExitDate]: z.string().optional(),
    [eStaffCodeFormKey.JobTitle]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.ContractTypes]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.Permissions]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.BankName]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.AccountNumber]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }),
    [eStaffCodeFormKey.AccountHolder]: z.string().nonempty({
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    })
  })

export type StaffCodeFormSchema = z.infer<ReturnType<typeof getStaffCodeSchema>>

export const getUnitsSettingSchema = (t: IAppTranslations) =>
  z.object({
    [eUnitsSettingCodeFormKey.UnitName]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
  })

export type UnitsSettingSchema = z.infer<ReturnType<typeof getUnitsSettingSchema>>


export const getHRSettingSchema = (t: IAppTranslations) =>
  z.object({
    [eHRInfoSettingCodeFormKey.TeamName]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
  })

export type HRSettingSchema = z.infer<ReturnType<typeof getHRSettingSchema>>

export const getPermissionchema = (t: IAppTranslations) =>
  z.object({
    [ePermissionCodeFormKey.Permission]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
  })

export type Permissionschema = z.infer<ReturnType<typeof getPermissionchema>>

export const getClientTierSettingSchema = (t: IAppTranslations) =>
  z.object({
    [eClientTierSettingCodeFormKey.TierName]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
  })

export type ClientTierSettingSchema = z.infer<ReturnType<typeof getClientTierSettingSchema>>

export const getPlatformSettingSchema = (t: IAppTranslations) =>
  z.object({
    [ePlatformSettingCodeFormKey.PlatformName]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
  })

export type PlatformSettingSchema = z.infer<ReturnType<typeof getPlatformSettingSchema>>

// Business code
export const getBusinessCodeSchema = (t: IAppTranslations) =>
  z.object({
    [eBusinessCodeFormKey.BusinessCategory]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eBusinessCodeFormKey.PartnerName]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eBusinessCodeFormKey.BusinessRegistrationNumber]: z.string().optional(),
    [eBusinessCodeFormKey.Phone]: z.string().optional(),
    [eBusinessCodeFormKey.Fax]: z.string().optional(),
    [eBusinessCodeFormKey.HeadOfficeAddress]: z.string().optional(),
    [eBusinessCodeFormKey.HeadOfficeAddressDetail]: z.string().optional(),
    [eBusinessCodeFormKey.ContactName]: z.string().optional(),
    [eBusinessCodeFormKey.JobTitle]: z.string().optional(),
    [eBusinessCodeFormKey.ContactEmail]: z.string().optional(),
    [eBusinessCodeFormKey.ContactPerson]: z.string().optional(),
    [eBusinessCodeFormKey.VendorPIC]: z
      .string()
      .nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eBusinessCodeFormKey.VatStatus]: z.enum(['Y', 'N'], {
      message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty')
    }).optional(),
    [eBusinessCodeFormKey.Remarks]: z.string().optional()
  })

export type BusinessCodeFormSchema = z.infer<ReturnType<typeof getBusinessCodeSchema>>

export const getClientCodeFormSchema = (t: IAppTranslations) =>
  z.object({
    [eClienttCodeFormKey.ClientCategory]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.CompanyName]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.BrandName]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.ClientTiers]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.MainSalesChannel]: z.object({market:z.boolean(), platform: z.array(z.string()),officialMall: z.boolean(), others: z.boolean(), othersText: z.string()}),
    [eClienttCodeFormKey.BusinessRegisterationNo]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.Password]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.BusinessLicense]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.HeadOfficeAddress]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.SalesUrl]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.CompanyEmail]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.ContactName]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.RepresentativeTitle]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.ContactPerson]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.GroupChatAgreement]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.Company]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.Brand]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.Name]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
    [eClienttCodeFormKey.Contact]: z.string().nonempty({ message: t(TRANSLATE_KEYS.INPUT_VALIDATE, 'fieldCannotBeEmpty') }),
  })

export type ClientCodeFormSchema = z.infer<ReturnType<typeof getClientCodeFormSchema>>
