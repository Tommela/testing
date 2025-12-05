import { Edit, Trash2, Copy } from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from '~/components/ui/context-menu'
import { TRANSLATE_KEYS } from '~/constants'
import useAppTranslations from '~/hooks/use-app-translations'

interface ITableRowContextMenuProps<TData> {
  children: React.ReactNode
  data: TData
  onEdit?: (data: TData) => void
  onDelete?: (data: TData) => void
  onDuplicate?: (data: TData) => void
}

const TableRowContextMenu = <TData,>({
  children,
  data,
  onEdit,
  onDelete,
  onDuplicate
}: ITableRowContextMenuProps<TData>) => {
  const { t } = useAppTranslations()
  
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className='w-40 bg-white rounded-lg shadow-lg border border-gray-200'>
        <ContextMenuItem
          onClick={() => onEdit?.(data)}
          className='flex items-center gap-2 cursor-pointer hover:bg-gray-100'
        >
          <Edit className='w-4 h-4 text-gray-600' />
          <span className='text-sm text-gray-700'>{t(TRANSLATE_KEYS.ACTION, 'edit')}</span>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => onDelete?.(data)}
          className='flex items-center gap-2 cursor-pointer hover:bg-gray-100'
        >
          <Trash2 className='w-4 h-4 text-gray-600' />
          <span className='text-sm text-gray-700'>{t(TRANSLATE_KEYS.ACTION, 'delete')}</span>
        </ContextMenuItem>
        
        {
          onDuplicate &&
          <>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => onDuplicate?.(data)}
              className='flex items-center gap-2 cursor-pointer hover:bg-gray-100'
            >
              <Copy className='w-4 h-4 text-gray-600' />
              <span className='text-sm text-gray-700'>{t(TRANSLATE_KEYS.ACTION, 'duplicate')}</span>
            </ContextMenuItem>
          </>
          
        }
        
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default TableRowContextMenu

