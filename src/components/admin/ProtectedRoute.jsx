import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { Loader } from '../ui/Loader.jsx'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) return <Loader label="Checking session" />
  if (!session) return <Navigate to="/admin/login" replace />

  return children
}
