import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import TableManager from './pages/admin/TableManager.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
import { tableConfigs } from './pages/admin/adminConfig.js'

export default function App() {
  return (
    <Routes>
      {/* Public portfolio */}
      <Route path="/" element={<Home />} />

      {/* Admin auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin dashboard (protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        {Object.keys(tableConfigs).map((key) => (
          <Route key={key} path={key} element={<TableManager tableKey={key} />} />
        ))}
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
  )
}
