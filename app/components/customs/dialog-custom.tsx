import clsx from 'clsx'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'

interface IDialogCustomProps {
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
const DialogCustom = ({
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
}: IDialogCustomProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Trigger Btn */}
      {triggerBtn && <DialogTrigger asChild>{triggerBtn}</DialogTrigger>}

      {/* Dialog content */}
      <DialogContent className={clsx('sm:max-w-[425px] p-0 gap-space-main', classNameContent)}>
        {/* Dialog header */}
        <DialogHeader
          className={clsx(
            'p-space-main border-b border-light-gray !text-center',
            hiddenHeader && 'hidden',
            classNameHeader
          )}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className={clsx(!showDescription && 'hidden')}>{description}</DialogDescription>
        </DialogHeader>

        {/* Main content */}
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
          <DialogFooter className='border-t border-light-gray p-space-main'>
            {!hiddenCancelAction && !hiddenOkAction && (
              <section className='flex-1 flex items-center justify-center gap-space-main'>
                {!hiddenCancelAction && (
                  <DialogClose asChild>
                    <Button
                      variant='outline'
                      className='bg-light-gray border-transparent w-[142px]'
                      onClick={() => onCancelAction?.()}
                    >
                      {cancelText}
                    </Button>
                  </DialogClose>
                )}
                {!hiddenOkAction && (
                  <Button onClick={() => onOkAction?.()} disabled={disabledOkBtn} className='w-[142px]'>
                    {okText}
                  </Button>
                )}
              </section>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogCustom
