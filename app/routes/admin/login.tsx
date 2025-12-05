import { AuthBgImage } from '~/assets/images'
import LoginForm from '~/routes/admin/login/components/login-form'

const Login = () => {
  return (
    <section
      className='w-full h-[100vh] flex items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: `url(${AuthBgImage})` }}
    >
      <LoginForm />
    </section>
  )
}

export default Login