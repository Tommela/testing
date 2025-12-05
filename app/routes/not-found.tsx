import { NotFoundBlobIcon } from '~/assets/icons'

const NotFound = () => {
  return (
    <section className='flex items-center justify-center h-[100vh] bg-gray-900'>
      <section className='relative'>
        <NotFoundBlobIcon className='w-[500px] h-[500px] text-primary-main' />
        <section className='flex flex-col gap-[30px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]'>
          <p className='text-center text-white font-bold text-[50px] tracking-widest font-mono'>404</p>
          <p className='text-white font-bold text-[27px] font-mono'>Page not found !</p>
        </section>
      </section>
    </section>
  )
}

export default NotFound
