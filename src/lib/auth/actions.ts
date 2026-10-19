'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { SupabaseConfigError } from '@/lib/supabase/env';

import { authErrorMessage, GENERIC_AUTH_ERROR, NOT_CONFIGURED_ERROR } from './errors';
import { siteOrigin } from './origin';
import { destinationFor } from './session';
import { cleanEmail, cleanName, cleanPassword, isEmail } from './validate';

/*
 * Real authentication with Supabase Auth, run on the server only.
 *
 * Every action re-validates its input (the browser's checks are a convenience, not a
 * guarantee), never accepts a user id from the client, and returns calm messages
 * instead of provider errors. Unexpected failures are logged server-side without
 * passwords or tokens. `redirect()` is always called outside try/catch so Next.js can
 * perform it.
 */

export type AuthResult = { error?: string; checkEmail?: boolean; sent?: boolean };

function unexpected(error: unknown): AuthResult {
  if (error instanceof SupabaseConfigError) {
    console.error(error.message);
    return { error: NOT_CONFIGURED_ERROR };
  }
  console.error('Auth action failed:', error instanceof Error ? error.message : 'unknown error');
  return { error: GENERIC_AUTH_ERROR };
}

export async function signUp(input: {
  name: unknown;
  email: unknown;
  password: unknown;
}): Promise<AuthResult> {
  const name = cleanName(input.name);
  const email = cleanEmail(input.email);
  const password = cleanPassword(input.password);
  if (!name) return { error: 'Enter your name.' };
  if (!isEmail(email)) return { error: 'Enter a valid email address.' };
  if (!password) return { error: 'Enter a password.' };

  let signedIn = false;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Read by the handle_new_user trigger to create the profile.
        data: { name },
        emailRedirectTo: `${await siteOrigin()}/auth/callback?next=/setup`,
      },
    });
    if (error) return { error: authErrorMessage(error) };
    // No session means the project requires email confirmation: say so honestly.
    if (!data.session) return { checkEmail: true };
    signedIn = true;
  } catch (error) {
    return unexpected(error);
  }

  if (signedIn) redirect('/setup');
  return { error: GENERIC_AUTH_ERROR };
}

export async function logIn(input: { email: unknown; password: unknown }): Promise<AuthResult> {
  const email = cleanEmail(input.email);
  const password = cleanPassword(input.password);
  if (!isEmail(email)) return { error: 'Enter a valid email address.' };
  if (!password) return { error: 'Enter your password.' };

  let destination: string;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return { error: authErrorMessage(error) };
    destination = await destinationFor(data.user.id);
  } catch (error) {
    return unexpected(error);
  }

  redirect(destination);
}

export async function logOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    unexpected(error);
  }
  redirect('/login');
}

export async function requestPasswordReset(input: { email: unknown }): Promise<AuthResult> {
  const email = cleanEmail(input.email);
  if (!isEmail(email)) return { error: 'Enter a valid email address.' };

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${await siteOrigin()}/auth/callback?next=/update-password`,
    });
    // Rate limits are worth reporting; anything else is answered the same way as
    // success so the form never reveals whether an account exists.
    if (error?.code === 'over_email_send_rate_limit' || error?.code === 'over_request_rate_limit') {
      return { error: authErrorMessage(error) };
    }
  } catch (error) {
    return unexpected(error);
  }
  return { sent: true };
}

export async function updatePassword(input: { password: unknown }): Promise<AuthResult> {
  const password = cleanPassword(input.password);
  if (!password) return { error: 'Enter a new password.' };

  let destination: string;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error || !data.user) return { error: authErrorMessage(error) };
    destination = await destinationFor(data.user.id);
  } catch (error) {
    return unexpected(error);
  }

  redirect(destination);
}
