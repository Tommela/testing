import { type IYarnCodeFilters, eYarnType } from '~/types'
import type { IItemCodeFilters } from '~/routes/admin/baseline-information-management/item-code/components/item-code-filters'
import type { FabricCodeFilterTypes } from '~/routes/admin/baseline-information-management/fabric-code/components/fabric-code-filters'
import type { IStaffCodeFilters } from '~/routes/admin/baseline-information-management/staff-code/components/staff-code-filters'
import type { IBusinessCodeFilters } from '~/routes/admin/baseline-information-management/business-code/components/business-code-filters'
import type { ClientCodeFilterTypes } from '~/routes/admin/baseline-information-management/client-code/components/client-code-filters'

export const filterHelper = {
  getDefaultFilterYarnCode: () => {
    const filter: IYarnCodeFilters = {
      yarnType: '',
      yarnName: '',
      yarnColor: ''
    }
    return filter
  },
  getDefaultFilterItemCode: () => {
    const filter: IItemCodeFilters = {
      fabricPart: undefined,
      itemName: undefined,
      producedBy: undefined,
      directPurchase: undefined
    }
    return filter
  },
  getDefaultFilterStaffCode: () => {
    const filter: IStaffCodeFilters = {
      department: undefined,
      name: undefined,
      employeeNo: undefined,
      jobTitle: undefined,
      employmentStatus: [],
      searchTerm: ''
    }
    return filter
  },
  getDefaultFabricFilterItemCode: () => {
    const filter: FabricCodeFilterTypes = {
      fabricPart: undefined,
      itemName: undefined,
      directPurchase: 'N',
      discontinuedInProd: undefined,
      printDesign: undefined,
      color: undefined,
      btNo: undefined,
      prodSpec: 'ALL',
      prodUnits: 'ALL',
      saleUnits: 'ALL'
    }
    return filter
  },
  getDefaultFilterBusinessCode: () => {
    const filter: IBusinessCodeFilters = {
      businessCategory: undefined,
      partnerName: undefined,
      vatStatus: undefined,
      transactionEndStatus: undefined,
      searchTerm: ''
    }
    return filter
  },
  getDefaulClientFilterItemCode: () => {
    const filter: ClientCodeFilterTypes = {
      clientCategory: undefined,
      clientTiers: undefined,
      companyName: undefined,
      brandName: undefined,
    }
    return filter
  }
}
