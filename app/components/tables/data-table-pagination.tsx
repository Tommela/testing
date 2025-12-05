import { useEffect, useState } from 'react'

import type { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const totalPages = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex + 1
  const maxVisiblePages = 4

  // 🧠 giữ cửa sổ hiển thị riêng, chỉ update khi bấm next/prev
  const [windowStart, setWindowStart] = useState(1)

  // đảm bảo không vượt quá phạm vi
  const windowEnd = Math.min(windowStart + maxVisiblePages - 1, totalPages)
  const visiblePages = Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => windowStart + i)

  // 🡄 khi bấm prev
  const handlePrev = () => {
    if (table.getCanPreviousPage()) {
      table.previousPage()
      // chỉ trượt nếu currentPage nằm trước cửa sổ
      if (currentPage === windowStart) {
        setWindowStart(Math.max(1, windowStart - 1))
      }
    }
  }

  // 🡆 khi bấm next
  const handleNext = () => {
    if (table.getCanNextPage()) {
      table.nextPage()
      // chỉ trượt nếu currentPage nằm ở cuối cửa sổ
      if (currentPage === windowEnd) {
        setWindowStart(Math.min(totalPages - maxVisiblePages + 1, windowStart + 1))
      }
    }
  }

  // nếu trang giảm về đầu (vd reset table) thì đảm bảo không vượt phạm vi
  useEffect(() => {
    if (currentPage < windowStart) {
      setWindowStart(currentPage)
    }
  }, [currentPage])

  return (
    <section className='flex items-center gap-[6.5px] bg-[#dfe4e6] py-[10px] px-[2.5px] rounded-[10px] h-[38px] ml-auto main-shadow'>
      <ChevronLeft
        className={cn(
          'size-6 cursor-pointer !select-none',
          table.getCanPreviousPage() ? 'text-primary-main' : 'text-gray-400 cursor-not-allowed'
        )}
        onClick={handlePrev}
      />

      {visiblePages.map((page, index) => (
        <Button
          key={`page-${index}`}
          variant={page === currentPage ? 'default' : 'ghost'}
          size={'lg'}
          className={cn(
            'size-8 text-sm transition-all duration-200 relative z-10 !h-10',
            page === currentPage
              ? 'bg-white text-black-main shadow-sm scale-[1.1]'
              : 'text-primary-main hover:bg-white hover:text-black-main'
          )}
          onClick={() => table.setPageIndex(page - 1)}
        >
          {page}
        </Button>
      ))}

      <ChevronRight
        className={cn(
          'size-6 cursor-pointer !select-none',
          table.getCanNextPage() ? 'text-primary-main' : 'text-gray-400 cursor-not-allowed'
        )}
        onClick={handleNext}
      />
    </section>
  )
}
