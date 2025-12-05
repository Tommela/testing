import TestForm from '~/routes/main/introduce/components/test-form'
import { useIntroduce } from '~/routes/main/introduce/hooks/use-introduce'

const Introduce = () => {
  const { data: dataListIntroduce, isLoading, isRefetching } = useIntroduce()

  return (
    <section className='max-w-[1200px] mx-auto p-5 mt-[50px]'>
      <TestForm />
    </section>
  )
}

export default Introduce
