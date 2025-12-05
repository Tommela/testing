export interface FabricCode {
  id?: string;
  directPurchase: 'Y' | 'N';
  fabricPart: string;
  itemName: string;
  printDesign: string;
  btNo: string;
  prodSpec: string;
  prodCost: string;
  prodUnits: string;
  saleUnits: string;
  discontinuedInProd: 'Y' | 'N';
  loss: string;
  remarks: string;
  producedBy?: string
  yarn?: string
  color?: string
  ratio?: string
  
}

