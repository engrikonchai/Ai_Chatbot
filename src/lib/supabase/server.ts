import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import type { Database } from './database.types';
import { requireSupabaseEnv } from './env';

/**
 * The Supabase client for Server Components, Server Functions and Route Handlers.
 *
 * Create a new one per request (never share it): it reads that request's auth cookies.
 * It acts as the signed-in owner with the publishable key, so Row Level Security
 * applies to every query. Throws SupabaseConfigError when Supabase is not configured.
 */
export async function createClient() {
  const { url, publishableKey } = requireSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components cannot write cookies. That is expected: the proxy
          // (src/proxy.ts) refreshes the session on every request before rendering.
        }
      },
    },
  });
}
