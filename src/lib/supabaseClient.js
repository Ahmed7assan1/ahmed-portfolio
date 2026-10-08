import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseKey &&
    supabaseUrl !== 'https://YOUR-PROJECT-REF.supabase.co' &&
    !supabaseUrl.includes('YOUR-PROJECT-REF')
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null
