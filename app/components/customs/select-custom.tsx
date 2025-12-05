import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '~/components/ui/select'

interface ISelectCustomProps {
  value?: string
  onChange?: (value?: string) => void
  placeholder?: string
  classNameSelectTrigger?: string
  children?: React.ReactNode
  className?: string
}
const SelectCustom = ({
  value,
  onChange,
  placeholder = 'Select',
  classNameSelectTrigger,
  children,
  className
}: ISelectCustomProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger isHiddenBorder className={classNameSelectTrigger}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={(e) => e.preventDefault()} className={className}>
        <SelectGroup>{children}</SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectCustom
