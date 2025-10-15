import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
  const { status } = useSelector((s) => s.auth)
  return status === 'authenticated' ? <Outlet /> : <Navigate to="/login" replace />
}
