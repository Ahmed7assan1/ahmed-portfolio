import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setSession(null)
      setLoading(false)
      return
    }

    try {
      supabase.auth.getSession().then(({ data }) => {
        setSession(data?.session ?? null)
        setLoading(false)
      }).catch(() => {
        setSession(null)
        setLoading(false)
      })

      const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
        setSession(newSession)
      })

      return () => listener?.subscription?.unsubscribe()
    } catch {
      setSession(null)
      setLoading(false)
    }
  }, [])

  const signIn = async (email, password) => {
    if (!supabase) throw new Error('Supabase client is not configured')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    return data
  }

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
