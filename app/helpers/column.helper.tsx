import type { ColumnDef } from '@tanstack/react-table'
import { Copy, MoreHorizontal } from 'lucide-react'
import { DeleteIcon, EditIcon } from '~/assets/icons'
import ContentBody from '~/components/tables/content-body'
import { DataTableColumnHeader } from '~/components/tables/data-table-column-header'
import TitleHead from '~/components/tables/title-head'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { DATA, TRANSLATE_KEYS } from '~/constants'
import type { FabricCode, IItemCode, IStaffCode, IBusinessCode } from '~/types'
import { type IAppTranslations, type IYarnCode, eYarnCodeTableKey, eItemCodeTableKey, eYesNo, eStaffCodeTableKey, eFabricCodeTableKey, eBusinessCodeTableKey, eClientCodeTableKey } from '~/types'
import type { ClientCode } from '~/types/models/baseline-information-management/client-code.model'

const columnHelper = {
  getColumnsDemoTable: (t: IAppTranslations) => {
    const columns: ColumnDef<any>[] = [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label='Select all'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
          />
        ),
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: 'email',
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title='Email' />
        }
      },
      {
        accessorKey: 'amount',
        header: () => <div className='text-right'>Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue('amount'))
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(amount)

          return <div className='text-right font-medium'>{formatted}</div>
        }
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const payment = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      }
    ]
    return columns
  },
  getColumnsYarnCodeTable: (
    t: IAppTranslations,
    onDeleteAction?: (data?: any) => void,
    onEditAction?: (data?: any) => void
  ) => {
    const columns: ColumnDef<any>[] = [
      {
        id: 'select',
        header: ({ table }) => (
          <section className='flex items-center justify-center'>
            <Checkbox
              checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label='Select all'
              className='w-5 h-5'
            />
          </section>
        ),
        cell: ({ row }) => (
          <section className='flex items-center justify-center'>
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label='Select row'
              className='w-5 h-5'
            />
          </section>
        ),
        size: 50,
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: eYarnCodeTableKey.YarnType,
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.yarnCode.yarnType')} />
        },
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eYarnCodeTableKey.YarnType)} className='font-gothic-a1 font-[400]' />
        },
        size: 100
      },
      {
        accessorKey: eYarnCodeTableKey.YarnName,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.yarnCode.yarnName')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eYarnCodeTableKey.YarnName)} className='font-gothic-a1 font-[400]' />
        },
        size: 350
      },
      {
        accessorKey: eYarnCodeTableKey.YarnColor,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.yarnCode.yarnColor')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eYarnCodeTableKey.YarnColor)} className='font-gothic-a1 font-[400]' />
        },
        size: 350
      },
      {
        accessorKey: eYarnCodeTableKey.Notes,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.yarnCode.notes')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eYarnCodeTableKey.Notes)} className='font-gothic-a1 font-[400]' />
        },
        size: 350
      },
      {
        accessorKey: eYarnCodeTableKey.DateOfRegistration,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.yarnCode.dateOfRegistration')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eYarnCodeTableKey.DateOfRegistration)} className='font-gothic-a1 font-[400]' />
        },
        size: 90
      },
      {
        id: 'actions',
        header: () => <TitleHead title={'수정 / 삭제'} className='text-center' />,
        cell: ({ row }) => {
          return (
            <section className='flex items-center justify-center gap-[5px]'>
              <EditIcon
                className='w-[30px] h-[30px] text-gray-main cursor-pointer'
                onClick={() => onEditAction?.(row.original)}
              />
              <DeleteIcon
                className='w-[30px] h-[30px] text-gray-main cursor-pointer'
                onClick={() => onDeleteAction?.(row.original)}
              />
            </section>
          )
        },
        size: 90
      }
    ]
    return columns
  },
  getColumnsItemCodeTable: (
    t: IAppTranslations,
    onDeleteAction?: (data?: IItemCode) => void,
    onEditAction?: (data?: IItemCode) => void,
    onDuplicateAction?: (data?: IItemCode) => void,
    onDiscontinuedChange?: (data: IItemCode, value: eYesNo) => void
  ): ColumnDef<IItemCode, unknown>[] => {
    const columns: ColumnDef<IItemCode, unknown>[] = [
      {
        id: 'select',
        header: ({ table }) => (
          <section className='flex items-center justify-center'>
            <Checkbox
              checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label='Select all'
              className='w-5 h-5'
            />
          </section>
        ),
        cell: ({ row }) => (
          <section className='flex items-center justify-center'>
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label='Select row'
              className='w-5 h-5'
            />
          </section>
        ),
        size: 50,
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: eItemCodeTableKey.FabricPart,
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.fabricPart')} />
        },
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eItemCodeTableKey.FabricPart)} className='font-gothic-a1 font-[400]' />
        }
      },
      {
        accessorKey: eItemCodeTableKey.ItemName,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.itemName')} />
        ),
        cell: ({ row }) => {
          const itemName = row.getValue(eItemCodeTableKey.ItemName) as string
          const directPurchase = row.original.directPurchase
          const saleItemName = row.original.saleItemName
          
          if (directPurchase === eYesNo.Yes) {
            return (
              <section className='flex flex-col gap-2 max-w-[250px] py-1'>
                <section className='flex items-center gap-1.5 min-w-0'>
                  <span className='px-1.5 py-0.5 rounded-full text-white text-[10px] font-[400] font-gothic-a1 bg-[#34A853] leading-tight flex-shrink-0'>
                    {t(TRANSLATE_KEYS.ENUMS, 'buySaleType.buy')}
                  </span>
                  <div className='min-w-0 flex-1 overflow-hidden'>
                    <ContentBody content={itemName} className='font-gothic-a1 font-[400] truncate leading-normal' />
                  </div>
                </section>
                <section className='flex items-center gap-1.5 min-w-0'>
                  <span className='px-1.5 py-0.5 rounded-full text-white text-[10px] font-[400] font-gothic-a1 bg-[#F7931E] leading-tight flex-shrink-0'>
                    {t(TRANSLATE_KEYS.ENUMS, 'buySaleType.sale')}
                  </span>
                  <div className='min-w-0 flex-1 overflow-hidden'>
                    <ContentBody content={saleItemName || '-'} className='font-gothic-a1 font-[400] truncate leading-normal' />
                  </div>
                </section>
              </section>
            )
          }
          
          return (
            <div className='max-w-[250px] overflow-hidden py-1'>
              <ContentBody content={itemName} className='font-gothic-a1 font-[400] truncate leading-normal' />
            </div>
          )
        },
        size: 250,
        maxSize: 250,
        minSize: 250
      },
      {
        accessorKey: eItemCodeTableKey.ProducedBy,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.producedBy')}
            className='items-start'
            titleClassName='whitespace-normal text-left leading-[18px]'
          />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eItemCodeTableKey.ProducedBy)} className='font-gothic-a1 font-[400]' />
        },
        size: 180
      },
      {
        id: 'yarnColorRatio',
        header: () => (
          <div className='grid grid-cols-3 gap-1 items-center w-full'>
            <div className='text-[12px] font-[600] text-center border-r border-gray-300 pr-1'>
              {t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.yarn')}
            </div>
            <div className='text-[12px] font-[600] text-center border-r border-gray-300 pr-1'>
              {t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.color')}
            </div>
            <div className='text-[12px] font-[600] text-center'>
              {t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.ratio')}
            </div>
          </div>
        ),
        cell: ({ row }) => {
          if (row.original.directPurchase === eYesNo.Yes) {
          return (
              <div className='grid grid-cols-3 gap-1 items-center w-full'>
                <div className='text-center border-r border-gray-300 pr-1'>
                  <ContentBody content='-' className='font-gothic-a1 font-[400]' />
                </div>
                <div className='text-center border-r border-gray-300 pr-1'>
                  <ContentBody content='-' className='font-gothic-a1 font-[400]' />
                </div>
                <div className='text-center'>
                  <ContentBody content='-' className='font-gothic-a1 font-[400]' />
                </div>
              </div>
            )
          }
          const yarnDetails = row.original.yarnDetails || []
          if (yarnDetails.length === 0) {
          return (
              <div className='grid grid-cols-3 gap-1 items-center w-full'>
                <div className='text-center border-r border-gray-300 pr-1'>
                  <ContentBody content='-' className='font-gothic-a1 font-[400]' />
                </div>
                <div className='text-center border-r border-gray-300 pr-1'>
                  <ContentBody content='-' className='font-gothic-a1 font-[400]' />
                </div>
                <div className='text-center'>
                  <ContentBody content='-' className='font-gothic-a1 font-[400]' />
                </div>
              </div>
            )
          }
          return (
            <section className='flex flex-col gap-[2px]'>
              {yarnDetails.map((detail, index: number) => (
                <div key={index} className='grid grid-cols-3 gap-1 items-center w-full'>
                  <div className='text-center border-r border-gray-300 pr-1'>
                    <ContentBody content={detail.yarnName} className='font-gothic-a1 font-[400]' />
                  </div>
                  <div className='text-center border-r border-gray-300 pr-1'>
                    <ContentBody content={detail.yarnColor} className='font-gothic-a1 font-[400]' />
                  </div>
                  <div className='text-center'>
                    <ContentBody content={String(detail.ratio)} className='font-gothic-a1 font-[400]' />
                  </div>
                </div>
              ))}
            </section>
          )
        },
        size: 350,
        enableSorting: false
      },
      {
        accessorKey: eItemCodeTableKey.Loss,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.loss')} />
        ),
        cell: ({ row }) => {
          if (row.original.directPurchase === eYesNo.Yes) {
            return <ContentBody content='-' className='font-gothic-a1 font-[400]' />
          }
          const yarnDetails = row.original.yarnDetails || []
          if (yarnDetails.length === 0) {
            return <ContentBody content='-' className='font-gothic-a1 font-[400]' />
          }
          return (
            <section className='flex flex-col gap-[2px]'>
              {yarnDetails.map((detail, index: number) => (
                <ContentBody key={index} content={String(detail.loss)} className='font-gothic-a1 font-[400]' />
              ))}
            </section>
          )
        }
      },
      {
        accessorKey: eItemCodeTableKey.ProductionUnit,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.productionUnit')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eItemCodeTableKey.ProductionUnit) || '-'} className='font-gothic-a1 font-[400]' />
        }
      },
      {
        accessorKey: eItemCodeTableKey.SalesUnit,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.salesUnit')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eItemCodeTableKey.SalesUnit) || '-'} className='font-gothic-a1 font-[400]' />
        }
      },
      {
        accessorKey: eItemCodeTableKey.DirectPurchase,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.directPurchase')}
            className='items-start'
            titleClassName='whitespace-normal text-left leading-[18px] text-sm'
          />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eItemCodeTableKey.DirectPurchase)} className='font-gothic-a1 font-[400] text-[12px]' />
        },
        size: 100
      },
      {
        accessorKey: eItemCodeTableKey.Discontinued,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.discontinued')}
            className='items-start'
            titleClassName='whitespace-normal text-left leading-[18px] text-sm'
          />
        ),
        cell: ({ row }) => {
          const value = (row.original.discontinued as eYesNo) || eYesNo.No
          return (
            <Select
              value={value}
              onValueChange={(newValue: eYesNo) => {
                onDiscontinuedChange?.(row.original, newValue)
              }}
            >
              <SelectTrigger className='w-full h-8 bg-gray-100 border-gray-300 rounded-full font-gothic-a1 font-[400] leading-[20px] tracking-[-0.5%] text-gray-700 hover:bg-gray-200 !text-[12px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={eYesNo.Yes} className='text-[12px] font-[400]'>Y</SelectItem>
                <SelectItem value={eYesNo.No} className='text-[12px] font-[400]'>N</SelectItem>
              </SelectContent>
            </Select>
          )
        }
      },
      {
        accessorKey: eItemCodeTableKey.Remarks,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.remarks')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eItemCodeTableKey.Remarks) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 250
      },
      {
        id: eItemCodeTableKey.EditDelete,
        header: () => (
          <TitleHead title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.editDelete')} className='text-center whitespace-normal leading-[18px]' />
        ),
        cell: ({ row }) => {
          return (
            <section className='flex items-center justify-center gap-[5px]'>
              <EditIcon
                className='w-[30px] h-[30px] text-gray-main cursor-pointer'
                onClick={() => onEditAction?.(row.original)}
              />
              <DeleteIcon
                className='w-[30px] h-[30px] text-gray-main cursor-pointer'
                onClick={() => onDeleteAction?.(row.original)}
              />
            </section>
          )
        },
        size: 100,
        enableSorting: false
      },
      {
        id: eItemCodeTableKey.Duplicate,
        header: () => <TitleHead title={t(TRANSLATE_KEYS.ENUMS, 'table.itemCode.duplicate')} className='text-center' />,
        cell: ({ row }) => {
          return (
            <section className='flex items-center justify-center'>
              <Copy
                size={20}
                className='text-gray-main cursor-pointer'
                onClick={() => onDuplicateAction?.(row.original)}
              />
            </section>
          )
        },
        size: 100,
        enableSorting: false
      }
    ]
    return columns
  },
  getColumnsStaffCodeTable: (
    t: IAppTranslations,
    onDeleteAction?: (data?: IStaffCode) => void,
    onEditAction?: (data?: IStaffCode) => void,
    onPasswordReset?: (data?: IStaffCode) => void
  ): ColumnDef<IStaffCode, unknown>[] => {
    const columns: ColumnDef<IStaffCode, unknown>[] = [
      {
        id: 'select',
        header: ({ table }) => (
          <section className='flex items-center justify-center'>
            <Checkbox
              checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label='Select all'
              className='w-5 h-5'
            />
          </section>
        ),
        cell: ({ row }) => (
          <section className='flex items-center justify-center'>
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label='Select row'
              className='w-5 h-5'
            />
          </section>
        ),
        size: 50,
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: eStaffCodeTableKey.Email,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.email')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eStaffCodeTableKey.Email) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 200
      },
      {
        accessorKey: eStaffCodeTableKey.EmployeeNo,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.employeeNo')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eStaffCodeTableKey.EmployeeNo) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 150
      },
      {
        accessorKey: eStaffCodeTableKey.Name,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.name')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eStaffCodeTableKey.Name) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 100
      },
      {
        accessorKey: eStaffCodeTableKey.Department,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.department')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eStaffCodeTableKey.Department) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 150
      },
      {
        accessorKey: eStaffCodeTableKey.JobTitle,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.jobTitle')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eStaffCodeTableKey.JobTitle) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 100,
        enableSorting: false
      },
      {
        accessorKey: eStaffCodeTableKey.EmploymentStatus,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.employmentStatus')}
            className='whitespace-normal'
            titleClassName='whitespace-normal text-left leading-[18px] break-words'
          />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eStaffCodeTableKey.EmploymentStatus) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 130,
        enableSorting: false
      },
      {
        accessorKey: eStaffCodeTableKey.DateOfHire,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.dateOfHire')} />
        ),
        cell: ({ row }) => {
          const dateValue = row.getValue(eStaffCodeTableKey.DateOfHire);
          const formatYYYYMMDDToDisplay = (yyyymmdd: string): string => {
            if (!yyyymmdd || yyyymmdd === '-') return '-';
            if (yyyymmdd.length === 8) {
              const year = yyyymmdd.substring(0, 4);
              const month = yyyymmdd.substring(4, 6);
              const day = yyyymmdd.substring(6, 8);
              return `${year}.${month}.${day}`;
            }
            return yyyymmdd;
          };
          return <ContentBody content={formatYYYYMMDDToDisplay(dateValue as string)} className='font-gothic-a1 font-[400]' />
        },
        size: 130
      },
      {
        accessorKey: eStaffCodeTableKey.ExitDate,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.exitDate')} />
        ),
        cell: ({ row }) => {
          const dateValue = row.getValue(eStaffCodeTableKey.ExitDate);
          const formatYYYYMMDDToDisplay = (yyyymmdd: string): string => {
            if (!yyyymmdd || yyyymmdd === '-') return '-';
            if (yyyymmdd.length === 8) {
              const year = yyyymmdd.substring(0, 4);
              const month = yyyymmdd.substring(4, 6);
              const day = yyyymmdd.substring(6, 8);
              return `${year}.${month}.${day}`;
            }
            return yyyymmdd;
          };
          return <ContentBody content={formatYYYYMMDDToDisplay(dateValue as string)} className='font-gothic-a1 font-[400]' />
        },
        size: 130
      },
      {
        accessorKey: eStaffCodeTableKey.Contact,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.contact')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eStaffCodeTableKey.Contact) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 150
      },
      {
        accessorKey: eStaffCodeTableKey.ContractTypes,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.contractTypes')}
            className='whitespace-normal'
            titleClassName='whitespace-normal text-left leading-[18px] break-words'
          />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eStaffCodeTableKey.ContractTypes) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 100,
        enableSorting: false
      },
      {
        accessorKey: eStaffCodeTableKey.Permissions,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.permissions')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eStaffCodeTableKey.Permissions) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 130,
        enableSorting: false
      },
      {
        accessorKey: eStaffCodeTableKey.PayrollAccountInfo,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.payrollAccountInfo')}
            className='items-start whitespace-normal min-h-[30px]'
            titleClassName='whitespace-normal text-left leading-[18px] break-words items-center'
            subTitle={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.payrollLongForm')}
            displaySubtitleInRightSide={true}
          />
        ),
        cell: ({ row }) => {
          const payrollInfo = row.original.payrollAccountInfo
          if (!payrollInfo || (!payrollInfo.bankName && !payrollInfo.accountNumber && !payrollInfo.depository)) {
            return <ContentBody content='-' className='font-gothic-a1 font-[400]' />
          }
          return (
            <section className='flex flex-row gap-[2px] items-center'>
              {payrollInfo.bankName && (
                <>
                  <ContentBody content={payrollInfo.bankName} className='font-gothic-a1 font-[400]' />
                  <span className=' text-[#A4B5BA]'>{'/'}</span>
                </>
              )}
              {payrollInfo.accountNumber && (
                <>
                  <ContentBody content={payrollInfo.accountNumber} className='font-gothic-a1 font-[400]' />
                  <span className=' text-[#A4B5BA]'>{'/'}</span>
                </>
              )}
              {payrollInfo.depository && (
                <ContentBody content={payrollInfo.depository} className='font-gothic-a1 font-[400]' />
              )}
            </section>
          )
        },
        size: 300,
        // enableSorting: false
      },
      {
        id: eStaffCodeTableKey.EditDelete,
        header: () => (
          <TitleHead title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.editDelete')} className='text-center whitespace-normal leading-[18px]' />
        ),
        cell: ({ row }) => {
          return (
            <section className='flex items-center justify-center gap-[5px]'>
              <EditIcon
                className='w-[30px] h-[30px] cursor-pointer'
                onClick={() => onEditAction?.(row.original)}
                color='#A4B5BA'
              />
              <DeleteIcon
                className='w-[30px] h-[30px] cursor-pointer'
                onClick={() => onDeleteAction?.(row.original)}
                color='#A4B5BA'

              />
            </section>
          )
        },
        size: 100,
        enableSorting: false
      },
      {
        id: eStaffCodeTableKey.Password,
        header: () => (
          <TitleHead title={t(TRANSLATE_KEYS.ENUMS, 'table.staffCode.password')} className='text-center' />
        ),
        cell: ({ row }) => {
          return (
            <section className='flex items-center justify-center'>
              <Button
                variant='outline'
                size='sm'
                className='bg-[#F2F4F7] text-black-main hover:bg-gray-200'
                onClick={() => onPasswordReset?.(row.original)}
              >
                {t(TRANSLATE_KEYS.ACTION, 'reset')}
              </Button>
            </section>
          )
        },
        size: 100,
        enableSorting: false
      }
    ]
    return columns
  },
getColumnsFabricCodeTable: (
    t: IAppTranslations,
    onDeleteAction?: (data?: FabricCode) => void,
    onEditAction?: (data?: FabricCode) => void,
    onDiscontinuedChange?: (data: FabricCode, value: 'Y' | 'N') => void
  ): ColumnDef<FabricCode, unknown>[] => {
    const columns: ColumnDef<FabricCode, unknown>[] = [
      {
        id: 'select',
        header: ({ table }) => (
          <section className='flex items-center justify-center'>
            <Checkbox
              checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label='Select all'
              className='w-5 h-5'
            />
          </section>
        ),
        cell: ({ row }) => (
          <section className='flex items-center justify-center'>
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label='Select row'
              className='w-5 h-5'
            />
          </section>
        ),
        size: 50,
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: eFabricCodeTableKey.DirectPurchase,
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.directPurchase')} />
        },
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eFabricCodeTableKey.DirectPurchase)} />
        },
        size: 140,
        enableSorting: false
      },
      {
        accessorKey: eFabricCodeTableKey.FabricPart,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.fabricPart')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eFabricCodeTableKey.FabricPart)} />
        },
        size: 150
      },
      {
        accessorKey: eFabricCodeTableKey.ItemName,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.itemName')}
            className='items-start'
            titleClassName='whitespace-normal text-left leading-[18px]'
          />
        ),
        cell: ({ row }) => {
         return row.original.directPurchase == 'Y' ? ( 
          <section className='flex flex-col gap-[2px]'>
            {
              DATA.GET_BUY_SALE_TAG(t)?.map((item,index)=>{
                return(
                  <section className='flex items-center justify-start gap-[5px]' key={index}>
                    <div
                      className="rounded-[10px] px-[5px] py-[1px] text-[11px] font-[600] text-white leading-[20px] tracking-[-0.5%]"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.name}
                    </div>
                    <ContentBody content={row.getValue(eFabricCodeTableKey.ItemName)} />
                  </section>
                )})
            }
          </section>
          
         ) : (
          <ContentBody content={row.getValue(eFabricCodeTableKey.ItemName)} />
         )
        },
        size: 200
      },
      {
        accessorKey: eFabricCodeTableKey.PrintDesign,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.printDesign')}
            className='items-start'
            titleClassName='whitespace-normal text-left leading-[18px]'
          />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eFabricCodeTableKey.PrintDesign)} />
        },
        size: 200
      },
      {
        accessorKey: eFabricCodeTableKey.Color,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.color')} />
        ),
        cell: ({ row }) => {
          const color = row.original.color || '-'
          // Split by | and display each on a new line
          const colorValues = color.split('|').map((v: string) => v.trim())
          return (
            <section className='flex flex-col gap-[2px]'>
              {colorValues.map((value: string, index: number) => (
                <ContentBody key={index} content={value} className='text-sm' />
              ))}
            </section>
          )
        },
        size: 120
      },
      {
        accessorKey: eFabricCodeTableKey.BtNo,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.btNo')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eFabricCodeTableKey.BtNo)} />
        },
        size: 120
      },
      {
        accessorKey: eFabricCodeTableKey.ProdSpec,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.prodSpec')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eFabricCodeTableKey.ProdSpec)} />
        },
        size: 150,
        enableSorting: false
      },
      {
        accessorKey: eFabricCodeTableKey.ProdCost,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.prodCost')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eFabricCodeTableKey.ProdCost)} />
        },
        size: 150,
        enableSorting: false
      },
      {
        accessorKey: eFabricCodeTableKey.ProdUnits,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.prodUnits')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eFabricCodeTableKey.ProdUnits)} />
        },
        size: 140,
        enableSorting: false
      },
      {
        accessorKey: eFabricCodeTableKey.SaleUnits,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.saleUnits')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eFabricCodeTableKey.SaleUnits)} />
        },
        size: 120,
        enableSorting: false
      },
      {
        accessorKey: eFabricCodeTableKey.DiscontinuedInProd,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.discontinuedInProd')}
            className='items-start'
            titleClassName='whitespace-normal text-left leading-[18px] text-sm'
          />
        ),
        cell: ({ row }) => {
          const value = (row.original.discontinuedInProd as 'Y' | 'N') || 'N'
          return (
            <Select
              value={value}
              onValueChange={(newValue: 'Y' | 'N') => {
                onDiscontinuedChange?.(row.original, newValue)
              }}
            >
              <SelectTrigger className='w-full h-8 bg-gray-100 border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Y'>Y</SelectItem>
                <SelectItem value='N'>N</SelectItem>
              </SelectContent>
            </Select>
          )
        },
        size: 140
      },
      {
        accessorKey: eFabricCodeTableKey.Loss,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.loss')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eFabricCodeTableKey.Loss)} />
        },
        size: 100
      },
      {
        accessorKey: eFabricCodeTableKey.Remarks,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.remarks')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eFabricCodeTableKey.Remarks) || '-'} />
        },
        size: 370 // Combined width of 3 columns (150 + 120 + 100)
      },
      {
        id: eFabricCodeTableKey.EditOrDelete,
        header: () => (
          <TitleHead title={t(TRANSLATE_KEYS.ENUMS, 'table.fabricCode.editOrDelete')} className='text-center whitespace-normal leading-[18px]' />
        ),
        cell: ({ row }) => {
          return (
            <section className='flex items-center justify-center gap-[5px]'>
              <EditIcon
                className='w-[30px] h-[30px] text-gray-main cursor-pointer'
                onClick={() => onEditAction?.(row.original)}
              />
              <DeleteIcon
                className='w-[30px] h-[30px] text-gray-main cursor-pointer'
                onClick={() => onDeleteAction?.(row.original)}
              />
            </section>
          )
        },
        size: 120,
        enableSorting: false
      }
    ]
    return columns
  },
  getColumnsBusinessCodeTable: (
    t: IAppTranslations,
    onDeleteAction?: (data?: IBusinessCode) => void,
    onEditAction?: (data?: IBusinessCode) => void,
    onTransactionEndChange?: (data: IBusinessCode, value: 'Y' | 'N') => void
  ): ColumnDef<IBusinessCode, unknown>[] => {
    const columns: ColumnDef<IBusinessCode, unknown>[] = [
      {
        accessorKey: eBusinessCodeTableKey.BusinessCategory,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.businessCategory')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.original.businessCategory || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 180
      },
      {
        accessorKey: eBusinessCodeTableKey.PartnerName,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.partnerName')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.original.partnerName || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 150
      },
      {
        accessorKey: eBusinessCodeTableKey.BusinessRegistrationNumber,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.businessRegistrationNumber')}
            className='whitespace-normal'
            titleClassName='whitespace-normal text-left leading-[18px] break-words'
          />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eBusinessCodeTableKey.BusinessRegistrationNumber) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 150
      },
      {
        accessorKey: eBusinessCodeTableKey.PhoneFax,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.phoneFax')}
            className='whitespace-normal'
            titleClassName='whitespace-normal text-left leading-[18px] break-words'
          />
        ),
        cell: ({ row }) => {
          const phone = row.original.phone
          const fax = row.original.fax
          if (!phone && !fax) {
            return <ContentBody content='-' className='font-gothic-a1 font-[400]' />
          }
          return (
            <section className='flex flex-col gap-[2px]'>
              {phone && <ContentBody content={phone} className='font-gothic-a1 font-[400]' />}
              {fax && <ContentBody content={fax} className='font-gothic-a1 font-[400]' />}
            </section>
          )
        },
        size: 150,
        enableSorting: false
      },
      {
        accessorKey: eBusinessCodeTableKey.HeadOfficeAddress,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.headOfficeAddress')}
            className='whitespace-normal'
            titleClassName='whitespace-normal text-left leading-[18px] break-words'
          />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eBusinessCodeTableKey.HeadOfficeAddress) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 350 // 2 columns width
      },
      {
        accessorKey: eBusinessCodeTableKey.PicNamePosition,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.picNamePosition')}
            className='whitespace-normal'
            titleClassName='whitespace-normal text-left leading-[18px] break-words'
          />
        ),
        cell: ({ row }) => {
          const name = row.original.contactPersonName
          const position = row.original.contactPersonPosition
          if (!name && !position) {
            return <ContentBody content='-' className='font-gothic-a1 font-[400]' />
          }
          const displayText = position ? `${name} (${position})` : name
          return <ContentBody content={displayText || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 150,
        enableSorting: false
      },
      {
        accessorKey: eBusinessCodeTableKey.ContactEmail,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.contactEmail')}
            className='whitespace-normal'
            titleClassName='whitespace-normal text-left leading-[18px] break-words'
          />
        ),
        cell: ({ row }) => {
          const phone = row.original.contactPhone
          const email = row.original.contactEmail
          if (!phone && !email) {
            return <ContentBody content='-' className='font-gothic-a1 font-[400]' />
          }
          return (
            <section className='flex flex-col gap-[2px]'>
              {phone && <ContentBody content={phone} className='font-gothic-a1 font-[400]' />}
              {email && <ContentBody content={email} className='font-gothic-a1 font-[400]' />}
            </section>
          )
        },
        size: 180,
        enableSorting: false
      },
      {
        accessorKey: eBusinessCodeTableKey.VendorPIC,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.vendorPIC')}
            className='whitespace-normal'
            titleClassName='whitespace-normal text-left leading-[18px] break-words'
          />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.original.vendorPIC || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 150
      },
      {
        accessorKey: eBusinessCodeTableKey.VatStatus,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.vatStatus')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eBusinessCodeTableKey.VatStatus) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 80
      },
      {
        accessorKey: eBusinessCodeTableKey.TransactionEndStatus,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.transactionEndStatus')}
            className='items-start'
            titleClassName='whitespace-normal text-left leading-[18px] text-sm'
          />
        ),
        cell: ({ row }) => {
          const value = (row.original.transactionEndStatus as 'Y' | 'N') || 'N'
          return (
            <Select
              value={value}
              onValueChange={(newValue: 'Y' | 'N') => {
                onTransactionEndChange?.(row.original, newValue)
              }}
            >
              <SelectTrigger className='w-full h-8 bg-gray-100 border-gray-300 rounded-full font-gothic-a1 font-[400] leading-[20px] tracking-[-0.5%] text-gray-700 hover:bg-gray-200 !text-[12px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Y' className='text-[12px] font-[400]'>Y</SelectItem>
                <SelectItem value='N' className='text-[12px] font-[400]'>N</SelectItem>
              </SelectContent>
            </Select>
          )
        }
      },
      {
        accessorKey: eBusinessCodeTableKey.Remarks,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.remarks')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eBusinessCodeTableKey.Remarks) || '-'} className='font-gothic-a1 font-[400]' />
        },
        size: 350 // 2 columns width
      },
      {
        id: eBusinessCodeTableKey.EditDelete,
        header: () => (
          <TitleHead title={t(TRANSLATE_KEYS.ENUMS, 'table.businessCode.editDelete')} className='text-center whitespace-normal leading-[18px]' />
        ),
        cell: ({ row }) => {
          return (
            <section className='flex items-center justify-center gap-[5px]'>
              <EditIcon
                className='w-[30px] h-[30px] text-gray-main cursor-pointer'
                onClick={() => onEditAction?.(row.original)}
              />
              <DeleteIcon
                className='w-[30px] h-[30px] text-gray-main cursor-pointer'
                onClick={() => onDeleteAction?.(row.original)}
              />
            </section>
          )
        },
        size: 100,
        enableSorting: false
      }
    ]
    return columns
  },
  getColumnsClientCodeTable: (
    t: IAppTranslations,
    onDeleteAction?: (data?: ClientCode) => void,
    onEditAction?: (data?: ClientCode) => void,
    onDiscontinuedChange?: (data: ClientCode, value: 'Y' | 'N') => void
  ): ColumnDef<ClientCode, unknown>[] => {
    const columns: ColumnDef<ClientCode, unknown>[] = [
      {
        accessorKey: eClientCodeTableKey.BusinessRegistrationNumber,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.businessRegistrationNumber')} />
        ),
        cell: ({ row }) => {
          return <ContentBody  content={row.getValue(eClientCodeTableKey.BusinessRegistrationNumber)} />
        },
        size: 150
      },
      {
        accessorKey: eClientCodeTableKey.ClientType,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.clientType')}
            className='items-start'
            titleClassName='text-left leading-[18px]'
          />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eClientCodeTableKey.ClientType)} />
        },
        size: 120,
        enableSorting: false
      },
      {
        accessorKey: eClientCodeTableKey.CompanyName,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.companyName')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eClientCodeTableKey.CompanyName)} />
        },
        size: 180
      },
      {
        accessorKey: eClientCodeTableKey.BrandName,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.brandName')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eClientCodeTableKey.BrandName)} />
        },
        size: 180
      },
      {
        accessorKey: eClientCodeTableKey.ClientTiers,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.clientTiers')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eClientCodeTableKey.ClientTiers)} />
        },
        size: 100,
        enableSorting: false
      },
      {
        accessorKey: eClientCodeTableKey.MainSalesChannel,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.mainSalesChannel')} />
        ),
        cell: ({ row }) => {
          const data = row.getValue(eClientCodeTableKey.MainSalesChannel) as { name: string; platform: string[]; others?:string }[] ;
              return (<div className='flex flex-col ' >
                <ContentBody className='font-[600] pb-[3px]' content={"Market"} />
                <ContentBody className='font-[600] py-[3px]' content={t(TRANSLATE_KEYS.LABEL, 'platform')} />
                {
                  data?.[0]?.platform?.map((platform:string, index:number)=>(
                    <ul className="list-disc ml-4 leading-5" key={index}>
                      <li><ContentBody key={index} content={platform} className=""/></li>
                    </ul>
                  ))
                }
                <ContentBody className='font-[600] pt-[10px]' content={"Other"} />
                <ul className="list-disc ml-4">
                  <li><ContentBody content={"Others"} className=""/></li>
                </ul>
                
              </div>
              )
            
             
        },
        size: 130,
        enableSorting: false
      },
      {
        accessorKey: eClientCodeTableKey.HeadOfficeAddress,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.headOfficeAddress')} />
        ),
        cell: ({ row }) => {
          return (
            <div className=''>
              <ContentBody className="whitespace-normal py-2 " content={"158-880"} />
              <ContentBody className="whitespace-normal leading-[18px]" content={row.getValue(eClientCodeTableKey.HeadOfficeAddress)} />
            </div>

          )
        },
        size: 150,
        enableSorting: false
      },
      {
        accessorKey: eClientCodeTableKey.SalesUrl,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.salesUrl')}
            className='items-start'
            titleClassName='whitespace-normal text-left leading-[18px] text-sm'
          />
        ),
        cell: ({ row }) => {
          return <ContentBody className="whitespace-normal leading-[18px]" content={row.getValue(eClientCodeTableKey.SalesUrl)} />
        },
        size: 200,
        enableSorting: false
      },
      {
        accessorKey: eClientCodeTableKey.ContactInfo,
        header: ({ column }) => (
          <DataTableColumnHeader className='py-2' column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.contactInfo')} subTitle={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.contactLongForm')} />
        ),
        cell: ({ row }) => {
          return (
            <section className=" leading-[18px]">
              <ContentBody className="leading-[18px]" content={"이순영 (팀장)"} />
              <ContentBody className="leading-[18px]" content={"010-1234-5678"} />
              <ContentBody className="leading-[18px]" content={"company@gmail.com"} />
            </section>
          )
        },
        size: 200,
        enableSorting: false
      },
      {
        accessorKey: eClientCodeTableKey.Referrer,
        header: ({ column }) => (
          <DataTableColumnHeader className='py-2' column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.referrer')} subTitle={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.referrerLongForm')}/>
        ),
        cell: ({ row }) => {
          return( <section className=" leading-[18px]">
              <ContentBody className="leading-[18px]" content={"수아레/수아레)"} />
              <ContentBody className="leading-[18px]" content={"김수영"} />
              <ContentBody className="leading-[18px]" content={"010-1234-5678"} />
            </section>)
        },
        size: 200,
        enableSorting: false
      },
      {
        accessorKey: eClientCodeTableKey.GroupChatAgreement,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.groupChatAgreement')} />
        ),
        cell: ({ row }) => {
          return <ContentBody className='text-center' content={row.getValue(eClientCodeTableKey.GroupChatAgreement) || '-'} />
        },
        size: 100 ,
        enableSorting: false
      },
      {
        accessorKey: eClientCodeTableKey.JoinDate,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.joinDate')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eClientCodeTableKey.JoinDate) || '-'} />
        },
        size: 150 // Combined width of 3 columns (150 + 120 + 100)
      },
      {
        accessorKey: eClientCodeTableKey.LastAccessed,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.lastAccessed')} />
        ),
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(eClientCodeTableKey.LastAccessed) || '-'} />
        },
        size: 130 // Combined width of 3 columns (150 + 120 + 100)
      },
      {
        id: eFabricCodeTableKey.EditOrDelete,
        header: () => (
          <TitleHead title={t(TRANSLATE_KEYS.ENUMS, 'table.clientCode.editOrDelete')} className='text-center whitespace-normal leading-[18px]' />
        ),
        cell: ({ row }) => {
          return (
            <section className='flex items-center justify-center gap-[5px]'>
              <EditIcon
                className='w-[30px] h-[30px] text-gray-main cursor-pointer'
                onClick={() => onEditAction?.(row.original)}
              />
              <DeleteIcon
                className='w-[30px] h-[30px] text-gray-main cursor-pointer'
                onClick={() => onDeleteAction?.(row.original)}
              />
            </section>
          )
        },
        size: 120,
        enableSorting: false
      }
    ]
    return columns
  },
}

export default columnHelper
