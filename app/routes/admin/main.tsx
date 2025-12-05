import clsx from 'clsx'
import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { FullLogoIcon, LogoIcon } from '~/assets/icons'
import { AuthBgImage } from '~/assets/images'
import { DATA, ROUTES } from '~/constants'
import cookieHelper from '~/helpers/cookie.helper'
import useAppTranslations from '~/hooks/use-app-translations'

const AdminMain = () => {
  const { t } = useAppTranslations()
  const navigate = useNavigate()

  // Check authentication on component mount
  useEffect(() => {
    const token = cookieHelper.getAccessToken()
    if (!token) {
      // No token found, redirect to login and replace history
      navigate(`/${ROUTES.ADMIN.BASE}/${ROUTES.ADMIN.AUTH.LOGIN}`, { replace: true })
    }
  }, [navigate])

  return (
    <section
      className='w-full h-[100vh] flex items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: `url(${AuthBgImage})` }}
    >
      <section className='flex flex-col items-center gap-[30px] p-[45px] main-shadow bg-white rounded-radius-main m-5'>
        <FullLogoIcon className='w-[160px] h-6 text-primary-main' />
        <section className='flex flex-wrap items-center gap-[30px]'>
          {DATA.GET_ACCOUNT_TYPE(t).map((item) => {
            return (
              <section
                key={item.color}
                className={clsx(
                  'flex items-center justify-center gap-space-main bg-light-gray rounded-[25px] cursor-pointer hover:scale-[1.1] transition-all duration-300 card-shadow',
                  'py-5 px-5 sm:py-[30px] sm:px-[45px] lg:py-[45px] lg:px-[60px] flex-1 sm:flex-auto'
                )}
                onClick={() => {
                  navigate(`/${ROUTES.ADMIN.BASE}/${ROUTES.ADMIN.BASE_LINE_INFORMATION_MANAGEMENT.YARN_CODE}`)
                }}
              >
                <LogoIcon
                  className='w-[43px] h-[45px]'
                  style={{
                    color: item.color
                  }}
                />
                <p className='font-bold text-[30px] leading-[30px] tracking-[0%] text-black-main'>{item.name}</p>
              </section>
            )
          })}
        </section>
      </section>
    </section>
  )
}

export default AdminMain