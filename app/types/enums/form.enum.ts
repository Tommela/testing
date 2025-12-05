import { en } from "zod/v4/locales";

export enum eTestFormKey {
  Username = 'username',
  Quantity = 'quantity',
  Status = 'status',
  Items = 'items',
  Bio = 'bio',
  Email = 'email'
}

export enum eLoginFormKey {
  Email = 'email',
  Password = 'password'
}

// Yarn code
export enum eYarnCodeFormKey {
  YarnType = 'yarnType',
  YarnName = 'yarnName',
  YarnColor = 'yarnColor',
  Note = 'note'
}

// Setting yarn
export enum eSettingYarnFormKey {
  YarnType = 'yarnType'
}

// Setting fabric part
export enum eSettingFabricPartFormKey {
  FabricPart = 'fabricPart'
}

// Setting business category
export enum eSettingBusinessCategoryFormKey {
  BusinessCategory = 'businessCategory'
}

// Item code
export enum eItemCodeFormKey {
  DirectPurchase = 'directPurchase',
  FabricPart = 'fabricPart',
  BusinessCategory = 'businessCategory',
  ProducedBy = 'producedBy',
  ProductionUnit = 'productionUnit',
  SalesUnit = 'salesUnit',
  Discontinued = 'discontinued',
  ItemName = 'itemName',
  SaleItemName = 'saleItemName',
  Remarks = 'remarks'
}

export enum eFabricCodeFormKey {
  DirectPurchase = 'directPurchase',
  ItemName = 'itemName',
  PrintDesign = 'printDesign',
  Color = 'color',
  BtNo = 'btNo',
  ProdSpec = 'prodSpec',
  ProdCost = 'prodCost',
  ProdUnits = 'prodUnits',
  SaleUnits = 'saleUnits',
  DiscontinuedInProd = 'discontinuedInProd',
  Loss = 'loss',
  Remarks = 'remarks',
  FabricPart = 'fabricPart'
}
// Staff code
export enum eStaffCodeFormKey {
  Name = 'name',
  Email = 'email',
  Contact = 'contact',
  Password = 'password',
  ContactInfo = 'contactInfo',
  Department = 'department',
  EmploymentStatus = 'employmentStatus',
  DateOfHire = 'dateOfHire',
  ExitDate = 'exitDate',
  JobTitle = 'jobTitle',
  ContractTypes = 'contractTypes',
  Permissions = 'permissions',
  BankName = 'bankName',
  AccountNumber = 'accountNumber',
  AccountHolder = 'accountHolder'
}

export enum eUnitsSettingCodeFormKey {
  UnitName = 'unitName'
}

export enum eHRInfoSettingCodeFormKey {
  TeamName = 'teamName'
}

export enum ePermissionCodeFormKey {
  Permission = 'permission'
}

export enum eClientTierSettingCodeFormKey {
  TierName = 'tierName'
}

export enum ePlatformSettingCodeFormKey {
  PlatformName = 'platformName'
}

// Business code
export enum eBusinessCodeFormKey {
  BusinessCategory = 'businessCategory',
  PartnerName = 'partnerName',
  BusinessRegistrationNumber = 'businessRegistrationNumber',
  Phone = 'phone',
  Fax = 'fax',
  HeadOfficeAddress = 'headOfficeAddress',
  HeadOfficeAddressDetail = 'headOfficeAddressDetail',
  ContactName = 'contactName',
  JobTitle = 'jobTitle',
  ContactEmail = 'contactEmail',
  ContactPerson = 'contactPerson',
  VendorPIC = 'vendorPIC',
  VatStatus = 'vatStatus',
  Remarks = 'remarks'
}

export enum eClienttCodeFormKey {
  ClientCategory = 'clientCategory',
  CompanyName = 'companyName',
  BrandName = 'brandName',
  ClientTiers = 'clientTiers',
  MainSalesChannel = 'mainSalesChannel',
  BusinessRegisterationNo = 'BusinessRegisterationNo',
  Password = 'password',
  BusinessLicense = 'businessLicense',
  HeadOfficeAddress = 'headOfficeAddress',
  SalesUrl = 'salesUrl',
  CompanyEmail = 'companyEmail',
  ContactName = 'contactName',
  RepresentativeTitle = 'representativeTitle',
  ContactPerson = 'contactPerson',
  GroupChatAgreement = 'groupChatAgreement',
  Company= 'company',
  Brand= 'brand',
  Name= 'name',
  Contact= 'contact'
}