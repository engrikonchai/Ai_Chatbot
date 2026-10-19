import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { cache } from 'react';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export type CurrentUser = { id: string; email: string | null };

/**
 * The signed-in user for this request, verified from the session token with
 * `getClaims()` (never trusted from the cookie alone). Null when nobody is signed in
 * or Supabase is not configured. Cached for the duration of one request.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  // Who is signed in is per request: never let a page using this be prerendered,
  // even when a build without configuration would otherwise make it static.
  await connection();
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims || typeof claims.sub !== 'string') return null;
  return { id: claims.sub, email: typeof claims.email === 'string' ? claims.email : null };
});

/**
 * The signed-in user, or a redirect to Log in. Server-side check for protected pages
 * and mutations; the proxy also redirects, but nothing relies on that alone.
 */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}
