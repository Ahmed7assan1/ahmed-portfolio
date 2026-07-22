import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import GlassCard from '../../components/ui/GlassCard.jsx'

export default function AdminLogin() {
  const { session, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (session) return <Navigate to="/admin" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center section-container">
      <GlassCard className="w-full max-w-sm">
        <h1 className="font-display text-headline-md text-on-surface mb-1">Admin Login</h1>
        <p className="text-sm text-on-surface-variant mb-6">Sign in to manage your portfolio content.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-on-surface-variant mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded bg-surface-container-low border border-white/10 px-3 py-2 text-on-surface focus:border-primary outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-on-surface-variant mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded bg-surface-container-low border border-white/10 px-3 py-2 text-on-surface focus:border-primary outline-none"
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-xs text-on-surface-variant/70 mt-6">
          Create an admin user in Supabase Dashboard → Authentication → Users, then sign in here.
        </p>
      </GlassCard>
    </div>
  )
}
