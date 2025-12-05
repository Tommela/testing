export interface IItemCodeYarnDetail {
  id: string
  category: string
  yarnName: string
  yarnColor: string
  ratio: number
  loss: number
}

export interface IItemCode {
  id?: string
  fabricPart?: string
  businessCategory?: string
  itemName?: string
  saleItemName?: string
  producedBy?: string
  directPurchase?: 'Y' | 'N'
  productionUnit?: string
  salesUnit?: string
  discontinued?: 'Y' | 'N'
  remarks?: string
  yarnDetails?: IItemCodeYarnDetail[]
}

