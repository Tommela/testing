import { Navigate } from 'react-router'
import { ROUTES } from '~/constants'
import cookieHelper from '~/helpers/cookie.helper'

const AdminPage = () => {
  const token = cookieHelper.getAccessToken()

  if (!token) {
    return <Navigate to={`/${ROUTES.ADMIN.BASE}/${ROUTES.ADMIN.AUTH.LOGIN}`} replace />
  }

  // After successful authentication, show dashboard
  // return <Navigate to={`/${ROUTES.ADMIN.BASE}/${ROUTES.ADMIN.BASE_LINE_INFORMATION_MANAGEMENT.YARN_CODE}`} replace />
}

export default AdminPage
