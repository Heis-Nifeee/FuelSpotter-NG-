import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

function assertSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.'
    )
  }

  try {
    new URL(supabaseUrl)
  } catch {
    throw new Error(
      'Invalid NEXT_PUBLIC_SUPABASE_URL. It must be a full URL like https://<project>.supabase.co.'
    )
  }
}

assertSupabaseConfig()

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
