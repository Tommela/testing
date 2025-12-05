import type { IItemCode } from '~/types'

/**
 * Mock yarn code data (for yarn selection in forms)
 * This represents the available yarns that can be selected when creating/editing item codes
 */
export const MOCK_YARN_CODE_DATA = [
  { id: '1', category: 'Spun yarn', yarnName: 'Yarn A', yarnColor: 'Gray' },
  { id: '2', category: 'Spun yarn', yarnName: 'Yarn A', yarnColor: 'Gray' },
  { id: '3', category: 'Spun yarn', yarnName: 'Yarn C', yarnColor: 'Gray' },
  { id: '4', category: 'Spun yarn', yarnName: 'Yarn A', yarnColor: 'Gray' },
  { id: '5', category: 'Spun yarn', yarnName: 'Yarn B', yarnColor: 'Black' },
  { id: '6', category: 'Spun yarn', yarnName: 'Yarn D', yarnColor: 'White' }
]

/**
 * Generate mock data for item code table
 * Returns mixed items: Raw Fabric (self product) and Direct Purchase items in one array
 * Yarn details come from yarn code data (MOCK_YARN_CODE_DATA)
 */
export const generateItemCodeMockData = (): IItemCode[] => {
  return [
    // Raw Fabric A (Self Product - with yarn details)
    {
      id: 'id-1',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Raw Fabric A',
      producedBy: 'Knitting Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item A',
      yarnDetails: [
        {
          id: '1',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 60,
          loss: 2
        },
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 40,
          loss: 3
        }
      ]
    },
    // Direct Purchase A (without yarn details)
    {
      id: 'id-4',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Direct Purchase A',
      saleItemName: 'Sale Direct Purchase A',
      producedBy: 'Knitting Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item A',
      yarnDetails: []
    },
    // Raw Fabric B (Self Product - with yarn details)
    {
      id: 'id-2',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Raw Fabric B',
      producedBy: 'Knitting Factory B',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item B',
      yarnDetails: [
        {
          id: '1',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 55,
          loss: 2.5
        },
        {
          id: '5',
          category: 'Spun yarn',
          yarnName: 'Yarn B',
          yarnColor: 'Black',
          ratio: 45,
          loss: 2.8
        }
      ]
    },
    // Direct Purchase B (without yarn details)
    {
      id: 'id-5',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Direct Purchase B',
      saleItemName: 'Sale Direct Purchase B',
      producedBy: 'Knitting Factory B',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item B',
      yarnDetails: []
    },
    // Raw Fabric C (Self Product - with yarn details)
    {
      id: 'id-3',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Raw Fabric C',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item C',
      yarnDetails: [
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 70,
          loss: 1.5
        },
        {
          id: '6',
          category: 'Spun yarn',
          yarnName: 'Yarn D',
          yarnColor: 'White',
          ratio: 30,
          loss: 2.2
        }
      ]
    },
    // Direct Purchase C (without yarn details)
    {
      id: 'id-6',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Direct Purchase C',
      saleItemName: 'Sale Direct Purchase C',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item C',
      yarnDetails: []
    },
    // Raw Fabric D (Self Product - with yarn details)
    {
      id: 'id-7',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Raw Fabric D',
      producedBy: 'Weaving Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item D',
      yarnDetails: [
        {
          id: '1',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 65,
          loss: 2.1
        },
        {
          id: '6',
          category: 'Spun yarn',
          yarnName: 'Yarn D',
          yarnColor: 'White',
          ratio: 35,
          loss: 2.5
        }
      ]
    },
    // Direct Purchase D (without yarn details)
    {
      id: 'id-8',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Direct Purchase D',
      saleItemName: 'Sale Direct Purchase D',
      producedBy: 'Weaving Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item D',
      yarnDetails: []
    },
    // Raw Fabric E (Self Product - with yarn details)
    {
      id: 'id-9',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Raw Fabric E',
      producedBy: 'Knitting Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item E',
      yarnDetails: [
        {
          id: '5',
          category: 'Spun yarn',
          yarnName: 'Yarn B',
          yarnColor: 'Black',
          ratio: 50,
          loss: 2.3
        },
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 50,
          loss: 2.7
        }
      ]
    },
    // Direct Purchase E (without yarn details)
    {
      id: 'id-10',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Direct Purchase E',
      saleItemName: 'Sale Direct Purchase E',
      producedBy: 'Knitting Factory B',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item E',
      yarnDetails: []
    },
    // Raw Fabric F
    {
      id: 'id-11',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Raw Fabric F',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item F',
      yarnDetails: [
        {
          id: '2',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 75,
          loss: 1.8
        },
        {
          id: '4',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 25,
          loss: 2.1
        }
      ]
    },
    // Direct Purchase F
    {
      id: 'id-12',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Direct Purchase F',
      saleItemName: 'Sale Direct Purchase F',
      producedBy: 'Knitting Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item F',
      yarnDetails: []
    },
    // Raw Fabric G
    {
      id: 'id-13',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Raw Fabric G',
      producedBy: 'Weaving Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item G',
      yarnDetails: [
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 80,
          loss: 1.2
        },
        {
          id: '5',
          category: 'Spun yarn',
          yarnName: 'Yarn B',
          yarnColor: 'Black',
          ratio: 20,
          loss: 2.5
        }
      ]
    },
    // Direct Purchase G
    {
      id: 'id-14',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Direct Purchase G',
      saleItemName: 'Sale Direct Purchase G',
      producedBy: 'Knitting Factory B',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item G',
      yarnDetails: []
    },
    // Raw Fabric H
    {
      id: 'id-15',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Raw Fabric H',
      producedBy: 'Knitting Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item H',
      yarnDetails: [
        {
          id: '1',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 45,
          loss: 2.2
        },
        {
          id: '6',
          category: 'Spun yarn',
          yarnName: 'Yarn D',
          yarnColor: 'White',
          ratio: 55,
          loss: 1.9
        }
      ]
    },
    // Direct Purchase H
    {
      id: 'id-16',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Direct Purchase H',
      saleItemName: 'Sale Direct Purchase H',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item H',
      yarnDetails: []
    },
    // Raw Fabric I
    {
      id: 'id-17',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Raw Fabric I',
      producedBy: 'Knitting Factory B',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item I',
      yarnDetails: [
        {
          id: '5',
          category: 'Spun yarn',
          yarnName: 'Yarn B',
          yarnColor: 'Black',
          ratio: 60,
          loss: 2.4
        },
        {
          id: '1',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 40,
          loss: 2.0
        }
      ]
    },
    // Direct Purchase I
    {
      id: 'id-18',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Direct Purchase I',
      saleItemName: 'Sale Direct Purchase I',
      producedBy: 'Weaving Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item I',
      yarnDetails: []
    },
    // Raw Fabric J
    {
      id: 'id-19',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Raw Fabric J',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item J',
      yarnDetails: [
        {
          id: '6',
          category: 'Spun yarn',
          yarnName: 'Yarn D',
          yarnColor: 'White',
          ratio: 90,
          loss: 1.0
        },
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 10,
          loss: 2.8
        }
      ]
    },
    // Direct Purchase J
    {
      id: 'id-20',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Direct Purchase J',
      saleItemName: 'Sale Direct Purchase J',
      producedBy: 'Knitting Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item J',
      yarnDetails: []
    },
    // Raw Fabric K
    {
      id: 'id-21',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Raw Fabric K',
      producedBy: 'Knitting Factory B',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item K',
      yarnDetails: [
        {
          id: '2',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 50,
          loss: 2.3
        },
        {
          id: '4',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 50,
          loss: 2.3
        }
      ]
    },
    // Direct Purchase K
    {
      id: 'id-22',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Direct Purchase K',
      saleItemName: 'Sale Direct Purchase K',
      producedBy: 'Weaving Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item K',
      yarnDetails: []
    },
    // Raw Fabric L
    {
      id: 'id-23',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Raw Fabric L',
      producedBy: 'Knitting Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item L',
      yarnDetails: [
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 65,
          loss: 1.6
        },
        {
          id: '6',
          category: 'Spun yarn',
          yarnName: 'Yarn D',
          yarnColor: 'White',
          ratio: 35,
          loss: 2.0
        }
      ]
    },
    // Direct Purchase L
    {
      id: 'id-24',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Direct Purchase L',
      saleItemName: 'Sale Direct Purchase L',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item L',
      yarnDetails: []
    },
    // Raw Fabric M
    {
      id: 'id-25',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Raw Fabric M',
      producedBy: 'Weaving Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item M',
      yarnDetails: [
        {
          id: '1',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 70,
          loss: 1.9
        },
        {
          id: '5',
          category: 'Spun yarn',
          yarnName: 'Yarn B',
          yarnColor: 'Black',
          ratio: 30,
          loss: 2.6
        }
      ]
    },
    // Direct Purchase M
    {
      id: 'id-26',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Direct Purchase M',
      saleItemName: 'Sale Direct Purchase M',
      producedBy: 'Knitting Factory B',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item M',
      yarnDetails: []
    },
    // Raw Fabric N
    {
      id: 'id-27',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Raw Fabric N',
      producedBy: 'Knitting Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item N',
      yarnDetails: [
        {
          id: '5',
          category: 'Spun yarn',
          yarnName: 'Yarn B',
          yarnColor: 'Black',
          ratio: 55,
          loss: 2.1
        },
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 45,
          loss: 2.4
        }
      ]
    },
    // Direct Purchase N
    {
      id: 'id-28',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Direct Purchase N',
      saleItemName: 'Sale Direct Purchase N',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item N',
      yarnDetails: []
    },
    // Raw Fabric O
    {
      id: 'id-29',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Raw Fabric O',
      producedBy: 'Knitting Factory B',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item O',
      yarnDetails: [
        {
          id: '6',
          category: 'Spun yarn',
          yarnName: 'Yarn D',
          yarnColor: 'White',
          ratio: 85,
          loss: 1.1
        },
        {
          id: '1',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 15,
          loss: 2.9
        }
      ]
    },
    // Direct Purchase O
    {
      id: 'id-30',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Direct Purchase O',
      saleItemName: 'Sale Direct Purchase O',
      producedBy: 'Weaving Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item O',
      yarnDetails: []
    },
    // Raw Fabric P
    {
      id: 'id-31',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Raw Fabric P',
      producedBy: 'Knitting Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item P',
      yarnDetails: [
        {
          id: '2',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 40,
          loss: 2.5
        },
        {
          id: '4',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 60,
          loss: 1.7
        }
      ]
    },
    // Direct Purchase P
    {
      id: 'id-32',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Direct Purchase P',
      saleItemName: 'Sale Direct Purchase P',
      producedBy: 'Knitting Factory B',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item P',
      yarnDetails: []
    },
    // Raw Fabric Q
    {
      id: 'id-33',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Raw Fabric Q',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item Q',
      yarnDetails: [
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 75,
          loss: 1.4
        },
        {
          id: '5',
          category: 'Spun yarn',
          yarnName: 'Yarn B',
          yarnColor: 'Black',
          ratio: 25,
          loss: 2.7
        }
      ]
    },
    // Direct Purchase Q
    {
      id: 'id-34',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Direct Purchase Q',
      saleItemName: 'Sale Direct Purchase Q',
      producedBy: 'Weaving Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item Q',
      yarnDetails: []
    },
    // Raw Fabric R
    {
      id: 'id-35',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Raw Fabric R',
      producedBy: 'Knitting Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item R',
      yarnDetails: [
        {
          id: '1',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 58,
          loss: 2.0
        },
        {
          id: '6',
          category: 'Spun yarn',
          yarnName: 'Yarn D',
          yarnColor: 'White',
          ratio: 42,
          loss: 2.1
        }
      ]
    },
    // Direct Purchase R
    {
      id: 'id-36',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Direct Purchase R',
      saleItemName: 'Sale Direct Purchase R',
      producedBy: 'Knitting Factory B',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item R',
      yarnDetails: []
    },
    // Raw Fabric S
    {
      id: 'id-37',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Raw Fabric S',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item S',
      yarnDetails: [
        {
          id: '5',
          category: 'Spun yarn',
          yarnName: 'Yarn B',
          yarnColor: 'Black',
          ratio: 48,
          loss: 2.2
        },
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 52,
          loss: 2.3
        }
      ]
    },
    // Direct Purchase S
    {
      id: 'id-38',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Direct Purchase S',
      saleItemName: 'Sale Direct Purchase S',
      producedBy: 'Weaving Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item S',
      yarnDetails: []
    },
    // Raw Fabric T
    {
      id: 'id-39',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Raw Fabric T',
      producedBy: 'Knitting Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item T',
      yarnDetails: [
        {
          id: '6',
          category: 'Spun yarn',
          yarnName: 'Yarn D',
          yarnColor: 'White',
          ratio: 95,
          loss: 0.8
        },
        {
          id: '2',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 5,
          loss: 3.0
        }
      ]
    },
    // Direct Purchase T
    {
      id: 'id-40',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Direct Purchase T',
      saleItemName: 'Sale Direct Purchase T',
      producedBy: 'Knitting Factory B',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item T',
      yarnDetails: []
    },
    // Raw Fabric U
    {
      id: 'id-41',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Raw Fabric U',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item U',
      yarnDetails: [
        {
          id: '1',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 62,
          loss: 1.8
        },
        {
          id: '4',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 38,
          loss: 2.4
        }
      ]
    },
    // Direct Purchase U
    {
      id: 'id-42',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Direct Purchase U',
      saleItemName: 'Sale Direct Purchase U',
      producedBy: 'Weaving Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item U',
      yarnDetails: []
    },
    // Raw Fabric V
    {
      id: 'id-43',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Raw Fabric V',
      producedBy: 'Knitting Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item V',
      yarnDetails: [
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 68,
          loss: 1.5
        },
        {
          id: '6',
          category: 'Spun yarn',
          yarnName: 'Yarn D',
          yarnColor: 'White',
          ratio: 32,
          loss: 2.2
        }
      ]
    },
    // Direct Purchase V
    {
      id: 'id-44',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Direct Purchase V',
      saleItemName: 'Sale Direct Purchase V',
      producedBy: 'Knitting Factory B',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item V',
      yarnDetails: []
    },
    // Raw Fabric W
    {
      id: 'id-45',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Raw Fabric W',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item W',
      yarnDetails: [
        {
          id: '5',
          category: 'Spun yarn',
          yarnName: 'Yarn B',
          yarnColor: 'Black',
          ratio: 53,
          loss: 2.0
        },
        {
          id: '1',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 47,
          loss: 2.1
        }
      ]
    },
    // Direct Purchase W
    {
      id: 'id-46',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Direct Purchase W',
      saleItemName: 'Sale Direct Purchase W',
      producedBy: 'Weaving Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item W',
      yarnDetails: []
    },
    // Raw Fabric X
    {
      id: 'id-47',
      fabricPart: 'Bodyboard',
      businessCategory: 'Originator',
      itemName: 'Raw Fabric X',
      producedBy: 'Knitting Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item X',
      yarnDetails: [
        {
          id: '2',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 72,
          loss: 1.6
        },
        {
          id: '3',
          category: 'Spun yarn',
          yarnName: 'Yarn C',
          yarnColor: 'Gray',
          ratio: 28,
          loss: 2.5
        }
      ]
    },
    // Direct Purchase X
    {
      id: 'id-48',
      fabricPart: 'Sleeve',
      businessCategory: 'Manufacturer',
      itemName: 'Direct Purchase X',
      saleItemName: 'Sale Direct Purchase X',
      producedBy: 'Knitting Factory B',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item X',
      yarnDetails: []
    },
    // Raw Fabric Y
    {
      id: 'id-49',
      fabricPart: 'Collar',
      businessCategory: 'Supplier',
      itemName: 'Raw Fabric Y',
      producedBy: 'Dyeing Factory A',
      directPurchase: 'N',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for raw fabric item Y',
      yarnDetails: [
        {
          id: '6',
          category: 'Spun yarn',
          yarnName: 'Yarn D',
          yarnColor: 'White',
          ratio: 88,
          loss: 1.2
        },
        {
          id: '4',
          category: 'Spun yarn',
          yarnName: 'Yarn A',
          yarnColor: 'Gray',
          ratio: 12,
          loss: 2.8
        }
      ]
    },
    // Direct Purchase Y
    {
      id: 'id-50',
      fabricPart: 'Pocket',
      businessCategory: 'Partner',
      itemName: 'Direct Purchase Y',
      saleItemName: 'Sale Direct Purchase Y',
      producedBy: 'Weaving Factory A',
      directPurchase: 'Y',
      productionUnit: 'KG',
      salesUnit: 'KG',
      discontinued: 'N',
      remarks: 'Remarks for direct purchase item Y',
      yarnDetails: []
    }
  ]
}

