import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FileIcon } from '~/assets/icons'
import { NarutoImage } from '~/assets/images'
import ImageCustom from '~/components/customs/image-custom'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { COMMON, TRANSLATE_KEYS } from '~/constants'
import { commonHelper } from '~/helpers'
import useAppTranslations from '~/hooks/use-app-translations'
import { AuthService } from '~/services/api'

const Demo = () => {
  const { setTheme } = useTheme()
  const { t, i18n } = useAppTranslations()
  const [loadingImg, setLoadingImg] = useState(true)
  const { data, isRefetching, isLoading } = useQuery<any>({
    retry: 0,
    queryKey: ['auth', 'login'],
    queryFn: async () => {
      const data = await AuthService.test()
      return data
    }
  })

  const code = `
        function Counter() {
  const [count, setCount] = createSignal(0);
  
  setInterval(
    () => setCount(count() + 1),
    1000
  );

  return <div>The count is {count()}</div>
}
  `
  return (
    <main className='p-4'>
      <div className=''>
        {/* <CodeBlock code={code} language='html' /> */}
        <header className='flex flex-col items-center gap-9'>
          <div className='p-4 flex flex-col gap-5'>
            <p className='font-mono font-bold'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nobis odit veritatis omnis
              voluptatem eos eligendi! Similique atque consequatur nulla adipisci laboriosam? Aut deserunt accusantium
              culpa minima est sed ipsam!
            </p>
            <p className='font-semibold'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nobis odit veritatis omnis
              voluptatem eos eligendi! Similique atque consequatur nulla adipisci laboriosam? Aut deserunt accusantium
              culpa minima est sed ipsam!
            </p>
            <h1>{t(TRANSLATE_KEYS.COMMON, 'product')}</h1>
            <div className='mt-4'>
              <button className='border px-3 py-1 mr-2 cursor-pointer' onClick={() => i18n.changeLanguage('en')}>
                English
              </button>
              <button className='border px-3 py-1 cursor-pointer' onClick={() => i18n.changeLanguage('vi')}>
                Tiếng Việt
              </button>
            </div>
          </div>
          <div className='w-[500px] max-w-[100vw] p-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                  <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                  <span className='sr-only'>Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme(COMMON.THEMES.LIGHT)}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(COMMON.THEMES.DARK)}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(COMMON.THEMES.SYSTEM)}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <p className='text-primary-1 max-w-7xl border border-[red] font-outfit1'>Nguyen Huu Nhan</p>
            <FileIcon className='w-6 h-6 text-blue-500' />
            <p>{commonHelper.formatMoney(1231223)}</p>
          </div>
        </header>
        <section className='flex items-center gap-4 bg-white p-4 rounded'>
          <ImageCustom src={NarutoImage} alt='Naruto' className='w-64 h-40 rounded-lg' />
          <ImageCustom src={'s'} alt='Naruto' className='w-64 h-40 rounded-lg' />
        </section>
      </div>
    </main>
  )
}

export default Demo
