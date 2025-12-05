import type { Column } from '@tanstack/react-table'
import { ChevronDownIconCustom } from '~/assets/icons'
import { cn } from '~/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  titleClassName?: string
  subTitle?: string | undefined
  subTitleClassName?: string
  displaySubtitleInRightSide?: boolean | false
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  titleClassName,
  subTitle,
  subTitleClassName,
  displaySubtitleInRightSide
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={cn('whitespace-nowrap text-[12px] font-[600]', className)}>
        <span className={cn(titleClassName)}>{title}</span>
        {subTitle && <div className={cn('text-[11px] text-gray-500 whitespace-pre-wrap', subTitleClassName)}>{subTitle}</div>}
      </div>
    )
  }

  const sorted = column.getIsSorted()

  const handleSort = () => {
    column.toggleSorting(sorted === 'asc')
  }
  return (
    <section className={cn('flex select-none flex-row justify-between items-center', className)} onClick={handleSort}>
      <div className={`py-3 flex items-center ${displaySubtitleInRightSide ? ' flex-row mt-[5px]' : 'flex flex-col'}`}>
         <span className={cn('whitespace-nowrap text-[12px] font-[600]', titleClassName)}>{title}</span>
        {subTitle && <span className={cn('text-[11px] text-gray-500 whitespace-pre-wrap ', subTitleClassName)}>{subTitle}</span>}
      </div>
      <ChevronDownIconCustom
        className={cn(
          '!w-5 !h-5 transition-transform duration-200 text-black-main shrink-0 items-center my-4',
          sorted === 'asc' && 'rotate-180'
        )}
      />
    </section>
  )
}
