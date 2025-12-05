import { cn } from '~/lib/utils'

interface FilterFieldProps {
  label: string
  children: React.ReactNode
  labelWidth?: number
  className?: string
  labelClassName?: string
}

export const FilterField = ({
  label,
  children,
  labelWidth = 80,
  className,
  labelClassName
}: FilterFieldProps) => (
  <section className={cn('flex items-center gap-space-main', className)}>
    <p
      className={cn('text-black-main leading-[20px] tracking-[-0.5%] font-semibold whitespace-nowrap', labelClassName)}
      style={{ width: `${labelWidth}px`, minWidth: `${labelWidth}px` }}
    >
      {label}
    </p>
    {children}
  </section>
)
