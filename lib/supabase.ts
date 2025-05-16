import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

// Re-export createClient
export { createClient }

// These environment variables need to be set in your .env.local file
// NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a conditional supabase client
let supabaseClient: ReturnType<typeof createClient<Database>> | null = null

// Only create the client if both URL and key are available
if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
} else {
  // Log a warning in development
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.",
    )
  }
}

// Export the client directly for backward compatibility
export const supabase = supabaseClient

// Export a function to safely get the supabase client
export function getSupabaseClient() {
  return supabaseClient
}

// Create a server-side supabase client (for use in Server Components, API routes, etc.)
export async function createServerSupabaseClient() {
  const { cookies } = await import("next/headers")
  const cookieStore = cookies()

  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
}
