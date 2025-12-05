import TableCustom from '~/components/customs/table-custom'
import columnHelper from '~/helpers/column.helper'
import useAppTranslations from '~/hooks/use-app-translations'

export const DemoTable = () => {
  const { t } = useAppTranslations()

  return (
    <section className='w-full'>
      <TableCustom
        columns={columnHelper.getColumnsDemoTable(t)}
        data={[
          {
            id: '728ed522f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com'
          },
          {
            id: '728ed5221f',
            amount: 100,
            status: 'pending',
            email: 'n@example.com'
          },
          {
            id: '728ed5321f',
            amount: 100,
            status: 'pending',
            email: 'p@example.com'
          }
        ]}
      />
    </section>
  )
}

export default DemoTable
