import { Outlet } from 'react-router'

export function meta() {
  return [{ title: 'ERP System - Login' }, { name: 'ERP Application', content: 'Welcome to ERP' }]
}
const AuthLayout = () => {
  return <Outlet />
}

export default AuthLayout
