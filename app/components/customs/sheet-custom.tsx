import clsx from 'clsx'
import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '~/components/ui/sheet'

interface ISheetCustomProps {
  open?: boolean
  onOpenChange?: (isOpen: boolean) => void
  title?: string
  description?: string
  cancelText?: string
  okText?: string
  classNameHeader?: string
  classNameContent?: string
  classNameWrapperChildrenContent?: string
  showDescription?: boolean
  hiddenCancelAction?: boolean
  hiddenOkAction?: boolean
  hiddenHeader?: boolean
  hiddenFooter?: boolean
  disabledOkBtn?: boolean
  onCancelAction?: () => void
  onOkAction?: () => void | Promise<void>
  triggerBtn?: React.ReactNode
  children?: React.ReactNode
}
const SheetCustom = ({
  open,
  onOpenChange,
  title,
  description,
  cancelText = 'Cancel',
  okText = 'Ok',
  classNameHeader,
  classNameContent,
  classNameWrapperChildrenContent,
  showDescription = false,
  hiddenCancelAction = false,
  hiddenOkAction = false,
  hiddenHeader = false,
  hiddenFooter = false,
  disabledOkBtn = false,
  onCancelAction,
  onOkAction,
  triggerBtn,
  children
}: ISheetCustomProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {triggerBtn && <SheetTrigger asChild>{triggerBtn}</SheetTrigger>}
      <SheetContent className={clsx('w-[90%] max-w-none p-0 gap-space-main', classNameContent)}>
        {/* Header */}
        <SheetHeader
          className={clsx(
            'p-space-main border-b border-light-gray !text-center',
            hiddenHeader && 'hidden',
            classNameHeader
          )}
        >
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className={clsx(!showDescription && 'hidden')}>{description}</SheetDescription>
        </SheetHeader>

        <section
          className={clsx(
            'px-space-main',
            hiddenFooter && 'pb-space-main',
            hiddenHeader && 'pt-space-main',
            classNameWrapperChildrenContent
          )}
        >
          {children}
        </section>
        {/* Dialog footer */}
        {!hiddenFooter && (
          <SheetFooter className='border-t border-light-gray p-space-main'>
            {!hiddenCancelAction && !hiddenOkAction && (
              <section className='flex-1 flex items-center justify-center gap-space-main'>
                {!hiddenCancelAction && (
                  <SheetClose asChild>
                    <Button
                      variant='outline'
                      className='bg-light-gray border-transparent w-[142px]'
                      onClick={() => onCancelAction?.()}
                    >
                      {cancelText}
                    </Button>
                  </SheetClose>
                )}
                {!hiddenOkAction && (
                  <Button onClick={() => onOkAction?.()} disabled={disabledOkBtn} className='w-[142px]'>
                    {okText}
                  </Button>
                )}
              </section>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default SheetCustom
