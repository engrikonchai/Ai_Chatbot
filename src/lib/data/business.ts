import { cache } from 'react';

import { requireUser } from '@/lib/auth/session';
import type { Business } from '@/lib/supabase/database.types';
import { createClient } from '@/lib/supabase/server';

/*
 * The owner's business: the one place pages and actions read it from.
 *
 * MVP rule: one owner, one business (businesses.owner_id is unique). It is created the
 * first time a signed-in owner reaches setup or the product, with name and website
 * empty until setup provides them; the database adds default widget settings in the
 * same transaction. Every query runs as the signed-in owner, so Row Level Security
 * enforces ownership even if a filter here were wrong. owner_id always comes from the
 * verified session, never from a request.
 */

const UNIQUE_VIOLATION = '23505';

async function fetchBusiness(ownerId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', ownerId)
    .maybeSingle();
  if (error) throw new Error(`Could not load the business: ${error.message}`);
  return data;
}

/** The signed-in owner's business, or null if they have none yet (or nobody is signed in). */
export const getCurrentBusiness = cache(async (): Promise<Business | null> => {
  const user = await requireUser();
  return fetchBusiness(user.id);
});

/**
 * The signed-in owner's business, created on first use. Redirects to Log in when
 * nobody is signed in.
 */
export const requireBusiness = cache(async (): Promise<Business> => {
  const user = await requireUser();
  const existing = await fetchBusiness(user.id);
  if (existing) return existing;

  const supabase = await createClient();
  const { error } = await supabase.from('businesses').insert({ owner_id: user.id });
  // A parallel request may have created it first; that is fine.
  if (error && error.code !== UNIQUE_VIOLATION) {
    throw new Error(`Could not create the business: ${error.message}`);
  }

  const created = await fetchBusiness(user.id);
  if (!created) throw new Error('The business was not found after creating it.');
  return created;
});

/**
 * Where a signed-in owner belongs: Home only once setup is genuinely complete
 * (onboarding_completed_at is set by real completion, never by visiting a screen),
 * otherwise setup. A missing business (first visit) means setup.
 *
 * Deliberately simple until Phase 2 Part 2 adds the analysis, review and test stages:
 * every incomplete owner resumes at /setup, the first step whose answer is durable.
 */
export function destinationFor(business: Pick<Business, 'onboarding_completed_at'> | null) {
  return business?.onboarding_completed_at ? '/home' : '/setup';
}

/**
 * The same decision right after signing in, using the client that holds the new
 * session (its cookies are not readable by a fresh client until the next request).
 */
export async function destinationAfterSignIn(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
) {
  const { data } = await supabase
    .from('businesses')
    .select('onboarding_completed_at')
    .eq('owner_id', userId)
    .maybeSingle();
  return destinationFor(data);
}
