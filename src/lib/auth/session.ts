import { connection } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export type CurrentUser = { id: string; email: string | null };

/**
 * The signed-in user for this request, verified from the session token with
 * `getClaims()` (never trusted from the cookie alone). Null when nobody is signed in
 * or Supabase is not configured.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  // Who is signed in is per request: never let a page using this be prerendered,
  // even when a build without configuration would otherwise make it static.
  await connection();
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims || typeof claims.sub !== 'string') return null;
  return { id: claims.sub, email: typeof claims.email === 'string' ? claims.email : null };
}

/**
 * Where a signed-in owner belongs: Home once setup is genuinely complete, otherwise
 * the start of setup. Completion is read from the database, never guessed.
 */
export async function destinationFor(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('businesses')
    .select('onboarding_completed_at')
    .eq('owner_id', userId)
    .maybeSingle();
  return data?.onboarding_completed_at ? '/home' : '/setup';
}
