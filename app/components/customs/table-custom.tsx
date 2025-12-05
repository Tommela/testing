import { useEffect, useState } from 'react'

import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import clsx from 'clsx'
import TableRowContextMenu from '~/components/customs/table-row-context-menu'
import { DataTablePagination } from '~/components/tables/data-table-pagination'
import { Skeleton } from '~/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  classNameTable?: string
  loading?: boolean
  skeletonLength?: number
  maxHeightClass?: string
  onRowEdit?: (data: TData) => void
  onRowDelete?: (data: TData) => void
  onRowDuplicate?: (data: TData) => void
  onGetSelectedRows?: (getSelectedRows: () => TData[]) => void
  onClearSelection?: (clearSelection: () => void) => void
}

const TableCustom = <TData, TValue>({
  columns,
  data,
  classNameTable,
  loading,
  skeletonLength = 9,
  maxHeightClass,
  onRowEdit,
  onRowDelete,
  onRowDuplicate,
  onGetSelectedRows,
  onClearSelection
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  // Expose getSelectedRows and clearSelection functions to parent component
  useEffect(() => {
    if (onGetSelectedRows) {
      onGetSelectedRows(() => {
        return table.getSelectedRowModel().rows.map((row) => row.original)
      })
    }
    if (onClearSelection) {
      onClearSelection(() => {
        setRowSelection({})
      })
    }
  }, [onGetSelectedRows, onClearSelection, table, rowSelection])

  const skeletonRows = Array.from({ length: skeletonLength })
  return (
    <section className='flex flex-col gap-[30px] w-full'>
      <section className='rounded-radius-main border border-light-gray overflow-hidden main-shadow'>
        <Table className={clsx('table-fixed bg-white', classNameTable)} classNameWrapperTable={maxHeightClass}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='[&>th:last-child]:border-r-0'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='border-r-[3px] border-r-light-gray border-b border-b-light-gray'
                      style={{ width: header.column.getSize() }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              skeletonRows.map((_, i) => (
                <TableRow key={`skeleton-${i}`} className='[&>td:last-child]:border-r-0'>
                  {columns.map((_, j) => (
                    <TableCell
                      key={`skeleton-cell-${j}`}
                      className='border-r-[3px] border-r-light-gray border-b border-b-light-gray'
                    >
                      <Skeleton className='h-3' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const rowData = row.original
                return (
                  <TableRowContextMenu
                    key={row.id}
                    data={rowData}
                    onEdit={onRowEdit}
                    onDelete={onRowDelete}
                    onDuplicate={onRowDuplicate}
                  >
                    <TableRow
                      data-state={row.getIsSelected() && 'selected'}
                      className='[&>td:last-child]:border-r-0'
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className='border-r-[3px] border-r-light-gray border-b border-b-light-gray'
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableRowContextMenu>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center !border-r-[3px] !border-r-light-gray !border-b !border-b-light-gray'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
      {!loading && <DataTablePagination table={table} />}
    </section>
  )
}

export default TableCustom
