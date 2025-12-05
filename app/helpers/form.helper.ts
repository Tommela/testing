import { eDisContinuedInProductionType, eDirectPurchaseType } from '~/types'
import { eItemCodeFormKey, eSettingFabricPartFormKey, eSettingBusinessCategoryFormKey, eSettingYarnFormKey, eStaffCodeFormKey, eYarnCodeFormKey,eFabricCodeFormKey, eUnitsSettingCodeFormKey, eHRInfoSettingCodeFormKey, ePermissionCodeFormKey, eClientTierSettingCodeFormKey, ePlatformSettingCodeFormKey, eBusinessCodeFormKey, eClienttCodeFormKey } from '~/types/enums/form.enum'

const formHelper = {
  getDefaultValuesYarnCode: () => {
    return {
      [eYarnCodeFormKey.YarnType]: undefined,
      [eYarnCodeFormKey.YarnName]: '',
      [eYarnCodeFormKey.YarnColor]: '',
      [eYarnCodeFormKey.Note]: ''
    }
  },
  getDefaultValuesSettingYarn: () => {
    return {
      [eSettingYarnFormKey.YarnType]: ''
    }
  },
  getDefaultValuesSettingFabricPart: () => {
    return {
      [eSettingFabricPartFormKey.FabricPart]: ''
    }
  },
  getDefaultValuesSettingBusinessCategory: () => {
    return {
      [eSettingBusinessCategoryFormKey.BusinessCategory]: ''
    }
  },
  getDefaultValuesItemCode: (directPurchase: 'Y' | 'N' = 'N') => {
    return {
      [eItemCodeFormKey.DirectPurchase]: directPurchase,
      [eItemCodeFormKey.FabricPart]: '',
      [eItemCodeFormKey.BusinessCategory]: '',
      [eItemCodeFormKey.ProducedBy]: '',
      [eItemCodeFormKey.ProductionUnit]: '',
      [eItemCodeFormKey.SalesUnit]: '',
      [eItemCodeFormKey.Discontinued]: 'N' as 'N' | 'Y',
      [eItemCodeFormKey.ItemName]: '',
      [eItemCodeFormKey.SaleItemName]: '',
      [eItemCodeFormKey.Remarks]: ''
    }
  },
  getDefaultValuesStaffCode: () => {
    return {
      [eStaffCodeFormKey.Name]: '',
      [eStaffCodeFormKey.Email]: '',
      [eStaffCodeFormKey.Contact]: '',
      [eStaffCodeFormKey.Password]: '',
      [eStaffCodeFormKey.Department]: '',
      [eStaffCodeFormKey.EmploymentStatus]: '',
      [eStaffCodeFormKey.DateOfHire]: '',
      [eStaffCodeFormKey.ExitDate]: '',
      [eStaffCodeFormKey.JobTitle]: '',
      [eStaffCodeFormKey.ContractTypes]: '',
      [eStaffCodeFormKey.Permissions]: '',
      [eStaffCodeFormKey.BankName]: '',
      [eStaffCodeFormKey.AccountNumber]: '',
      [eStaffCodeFormKey.AccountHolder]: ''
    }
  },
  getDefaultValuesFabricCode: (directPurchase: eDirectPurchaseType) => {
    return {
      [eFabricCodeFormKey.DirectPurchase]: directPurchase,
      [eFabricCodeFormKey.FabricPart]: '',
      [eFabricCodeFormKey.ItemName]: '',
      [eFabricCodeFormKey.PrintDesign]: '',
      [eFabricCodeFormKey.Color]: '',
      [eFabricCodeFormKey.BtNo]: '',
      [eFabricCodeFormKey.ProdSpec]: '',
      [eFabricCodeFormKey.ProdCost]: '',
      [eFabricCodeFormKey.ProdUnits]: '',
      [eFabricCodeFormKey.SaleUnits]: '',
      [eFabricCodeFormKey.DiscontinuedInProd]: eDisContinuedInProductionType.N,
      [eFabricCodeFormKey.Loss]: '',
      [eFabricCodeFormKey.Remarks]: ''
    }
  },
  getDefaultValuesUnitsSetting: () => {
    return {
      [eUnitsSettingCodeFormKey.UnitName]: '',
    }
  },
  getDefaultValuesHRInfoSetting: () => {
    return {
      [eHRInfoSettingCodeFormKey.TeamName]: '',
    }
  },
  getDefaultValuesPermisssion: () => {
    return {
      [ePermissionCodeFormKey.Permission]: '',
    }
  },
  getDefaultValuesClientTierSetting: () => {
    return {
      [eClientTierSettingCodeFormKey.TierName]: '',
    }
  },
  getDefaultValuesPlatformSetting: () => {
    return {
      [ePlatformSettingCodeFormKey.PlatformName]: '',
    }
  },
  getDefaultValuesBusinessCode: () => {
    return {
      [eBusinessCodeFormKey.BusinessCategory]: '',
      [eBusinessCodeFormKey.PartnerName]: '',
      [eBusinessCodeFormKey.BusinessRegistrationNumber]: '',
      [eBusinessCodeFormKey.Phone]: '',
      [eBusinessCodeFormKey.Fax]: '',
      [eBusinessCodeFormKey.HeadOfficeAddress]: '',
      [eBusinessCodeFormKey.HeadOfficeAddressDetail]: '',
      [eBusinessCodeFormKey.ContactName]: '',
      [eBusinessCodeFormKey.JobTitle]: '',
      [eBusinessCodeFormKey.ContactEmail]: '',
      [eBusinessCodeFormKey.ContactPerson]: '',
      [eBusinessCodeFormKey.VendorPIC]: '',
      [eBusinessCodeFormKey.VatStatus]: 'Y' as 'Y' | 'N',
      [eBusinessCodeFormKey.Remarks]: ''
    }
  },
  getDefaultValuesClientCode: () => {
    return {
      [eClienttCodeFormKey.ClientCategory]: '',
      [eClienttCodeFormKey.CompanyName]: '',
      [eClienttCodeFormKey.BrandName]: '',
      [eClienttCodeFormKey.ClientTiers]: '',
      [eClienttCodeFormKey.MainSalesChannel]: {},
      [eClienttCodeFormKey.BusinessRegisterationNo]: '',
      [eClienttCodeFormKey.Password]: '',
      [eClienttCodeFormKey.BusinessLicense]: '',
      [eClienttCodeFormKey.HeadOfficeAddress]: '',
      [eClienttCodeFormKey.SalesUrl]: '',
      [eClienttCodeFormKey.CompanyEmail]: '',
      [eClienttCodeFormKey.ContactName]: '',
      [eClienttCodeFormKey.RepresentativeTitle]: '',
      [eClienttCodeFormKey.ContactPerson]: '',
      [eClienttCodeFormKey.GroupChatAgreement]: '',
      [eClienttCodeFormKey.Company]: '',
      [eClienttCodeFormKey.Brand]: '',
      [eClienttCodeFormKey.Name]: '',
      [eClienttCodeFormKey.Contact]: ''

    }
  }
}

export default formHelper
