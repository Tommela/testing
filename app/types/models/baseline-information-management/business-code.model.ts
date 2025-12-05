export interface IBusinessCode {
  id?: string
  businessCategory?: string
  partnerName?: string
  businessRegistrationNumber?: string
  phone?: string
  fax?: string
  headOfficeAddress?: string
  contactPersonName?: string
  contactPersonPosition?: string
  contactPhone?: string
  contactEmail?: string
  vendorPIC?: string
  vatStatus?: 'Y' | 'N'
  transactionEndStatus?: 'Y' | 'N'
  remarks?: string
}

