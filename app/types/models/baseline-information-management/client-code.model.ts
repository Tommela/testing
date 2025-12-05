export interface ClientCode {
  businessRegistrationNumber?: string;
  clientType: string;
  companyName: string;
  brandName: string;
  clientTiers: string;
  mainSalesChannel: ClientCodeMainSalesChannel;
  headOfficeAddress: string;
  salesUrl: string;
  contactInfo: string;
  referrer: string;
  groupChatAgreement: string;
  joinDate: string;
  lastAccessed?: string;
  id?: string | number;
  clientCategory?: string;
  businessRegisterationNo?: string;
  password?: string;
  businessLicense?: string;
  companyEmail?: string;
  contactName?: string;
  representativeTitle?: string;
  contactPerson?: string;
  company?: string;
  brand?: string;
  name?: string;
  contact?: string;
}

export interface ClientCodeMainSalesChannel {
  market: boolean;
  officialMall: boolean;
  platform: string[];
  others: boolean;
  othersText: string;
}
