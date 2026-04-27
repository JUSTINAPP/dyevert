import { createClient } from '@supabase/supabase-js'

// The env var may be set to a Supabase dashboard URL instead of the project API URL.
// We extract the project ref and construct the correct endpoint automatically.
function resolveUrl(raw: string | undefined): string {
  if (!raw) return 'https://placeholder.supabase.co'
  const match = raw.match(/dashboard\/project\/([a-z0-9]+)/)
  if (match) return `https://${match[1]}.supabase.co`
  return raw
}

export const supabase = createClient(
  resolveUrl(process.env.NEXT_PUBLIC_SUPABASE_URL),
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key',
)
