import clsx from 'clsx'

interface ITitleHeadProps {
  title?: string
  className?: string
}
const TitleHead = ({ title, className }: ITitleHeadProps) => {
  return <p className={clsx('text-black-main font-[600] text-[12px] leading-[20px] tracking-[-0.5%]', className)}>{title}</p>
}

export default TitleHead
