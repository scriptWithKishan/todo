import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
  const token = Cookies.get('token')

  if (!token) {
    return <Navigate to="/auth" />
  } else {
    return <Outlet />
  }
}

export default ProtectedRoute