import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user || null
}

export async function isAdmin(userId) {
  if (!userId) return false
  const { data } = await supabase
    .from('couples')
    .select('is_admin')
    .eq('id', userId)
    .single()
  return data?.is_admin === true
}

export function generateSlug(name1, name2) {
  return `${name1}-weds-${name2}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
