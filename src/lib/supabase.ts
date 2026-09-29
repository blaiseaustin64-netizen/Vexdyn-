import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ymzapatkttkkbpxmqiia.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_qIY6mKkgfXvq0GmycriAlw_Sr3Fz2v4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
