import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { FullLogoIcon } from '~/assets/icons'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { TRANSLATE_KEYS, ROUTES } from '~/constants'
import { type LoginFormSchema, getLoginSchema } from '~/helpers/schemas.helper'
import cookieHelper from '~/helpers/cookie.helper'
import useAppTranslations from '~/hooks/use-app-translations'
import { LoginService } from '~/services/api'
import useGlobalLoaderStore from '~/stores/global-loader'
import { eLoginFormKey } from '~/types/enums/form.enum'

const LoginForm = () => {
  const { t } = useAppTranslations()
  const navigate = useNavigate()
  const { startLoading, stopLoading } = useGlobalLoaderStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formSchema = getLoginSchema(t)
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [eLoginFormKey.Email]: '',
      [eLoginFormKey.Password]: ''
    },
    mode: 'all'
  })

  const onSubmit = async (values: LoginFormSchema) => {
    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      startLoading()

      const response = await LoginService.signIn({
        email: values[eLoginFormKey.Email],
        password: values[eLoginFormKey.Password]
      })

      if (response.token) {
        cookieHelper.setAccessToken(response.token)
        // Save user_id (using user_syskey as user_id)
        if (response.user_syskey) {
          cookieHelper.setUserId(response.user_syskey)
        }
        toast.success(`Welcome back, ${response.user_name}!`)
        // Navigate to main page (don't replace, so user can go back)
        navigate(`/${ROUTES.ADMIN.BASE}/${ROUTES.ADMIN.MAIN}`)
      } else {
        toast.error(t(TRANSLATE_KEYS.MESSAGE, 'loginFailed'))
      }
    } catch (error: any) {
      const errorMessage = error?.message || error?.statusValue || t(TRANSLATE_KEYS.MESSAGE, 'loginFailed')
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
      stopLoading()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-[45px] bg-white p-[45px] rounded-radius-main w-[400px]'
      >
        <FullLogoIcon className='w-[160px] h-[24px] self-center text-primary-main' />

        <section className='flex flex-col gap-8'>
          {/* Email */}
          <FormField
            control={form.control}
            name={eLoginFormKey.Email}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(TRANSLATE_KEYS.INPUT_LABEL, 'email')}</FormLabel>
                <FormControl>
                  <Input placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'email')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name={eLoginFormKey.Password}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(TRANSLATE_KEYS.INPUT_LABEL, 'password')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, 'password')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <Button
          type='submit'
          disabled={!form.formState.isValid || isSubmitting}
          className='!h-10 rounded-[10px] bg-primary-main text-white cursor-pointer transition-all duration-300 hover:bg-primary-main/80 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isSubmitting ? t(TRANSLATE_KEYS.ACTION, 'loggingIn') || 'Logging in...' : t(TRANSLATE_KEYS.ACTION, 'login')}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm