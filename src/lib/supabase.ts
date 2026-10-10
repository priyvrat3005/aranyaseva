/**
 * Supabase Client Configuration
 * 
 * SECURITY NOTE:
 * - This file uses ONLY the anon (public) key, which is safe for frontend use
 * - Row Level Security (RLS) policies enforce access control on the server
 * - The service-role key MUST NEVER be used here - it bypasses RLS
 * - Service-role key is only for server-side operations (Edge Functions, etc.)
 * 
 * Environment variables required:
 * - VITE_SUPABASE_URL: Your Supabase project URL
 * - VITE_SUPABASE_ANON_KEY: Your Supabase anon/public key
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase credentials not configured. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file. ' +
    'The app will run in demo mode with local data.'
  );
}

/**
 * Supabase client with anon key (RLS-protected)
 * Returns null if not configured, allowing fallback to demo mode
 */
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Check if Supabase is properly configured
 */
export function isSupabaseConfigured(): boolean {
  return supabase !== null;
}

/**
 * Get current session user
 */
export async function getCurrentUser() {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Get current user's profile with role
 */
export async function getCurrentProfile(): Promise<import('./database.types').Profile | null> {
  if (!supabase) return null;
  const user = await getCurrentUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error || !profile) return null;
  return profile as import('./database.types').Profile;
}

/**
 * Check if current user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const profile = await getCurrentProfile();
  return profile?.role === 'admin';
}

/**
 * Check if current user is nursery
 */
export async function isNursery(): Promise<boolean> {
  const profile = await getCurrentProfile();
  return profile?.role === 'nursery';
}
