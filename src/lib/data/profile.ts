import { cache } from 'react';

import { requireUser } from '@/lib/auth/session';
import type { Profile } from '@/lib/supabase/database.types';
import { createClient } from '@/lib/supabase/server';

/**
 * The signed-in owner's profile (created at sign-up by the handle_new_user trigger).
 * Read as the owner, so Row Level Security only ever returns their own row.
 */
export const getCurrentProfile = cache(async (): Promise<Profile | null> => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (error) throw new Error(`Could not load the profile: ${error.message}`);
  return data;
});
