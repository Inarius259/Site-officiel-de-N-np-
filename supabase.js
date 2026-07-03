import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://akhezzpdcdlmlbuvpice.supabase.co"
const supabaseKey = "sb_publishable_uZr6wMVHhSN5otho_n2cUA_-R0aCmTm"

export const supabase = createClient(supabaseUrl, supabaseKey)
