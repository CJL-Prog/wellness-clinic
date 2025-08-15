import { createBrowserClient } from '@supabase/ssr';

// Create client function to avoid build-time errors
export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// For backward compatibility, export a getter
export const supabase = typeof window !== 'undefined' 
  ? createSupabaseClient() 
  : null as any;