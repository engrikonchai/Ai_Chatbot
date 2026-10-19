import type { EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';

import { safeNextPath } from '@/lib/auth/validate';
import { createClient } from '@/lib/supabase/server';

/**
 * Where links in auth emails land (sign-up confirmation, password reset).
 *
 * Handles both link styles Supabase can send:
 * - PKCE (the @supabase/ssr default): `?code=...`, exchanged for a session. This works
 *   in the same browser that started the flow, which holds the code verifier cookie.
 * - Token hash (custom email templates): `?token_hash=...&type=...`, verified directly.
 *
 * On success the owner continues to `next` (same-site paths only). Anything else goes
 * to Log in with a calm explanation; no provider error is shown.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const next = safeNextPath(url.searchParams.get('next'), '/setup');
  const code = url.searchParams.get('code');
  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type') as EmailOtpType | null;

  try {
    const supabase = await createClient();
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL(next, url.origin));
    } else if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
      if (!error) return NextResponse.redirect(new URL(next, url.origin));
    }
  } catch (error) {
    console.error('Auth callback failed:', error instanceof Error ? error.message : 'unknown error');
  }

  return NextResponse.redirect(new URL('/login?link=expired', url.origin));
}
