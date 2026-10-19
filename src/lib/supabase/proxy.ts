import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import type { Database } from './database.types';
import { getSupabaseEnv } from './env';

/**
 * Refreshes the Supabase session for one request and reports who is signed in.
 *
 * Follows the official @supabase/ssr pattern: cookies are read from the request, any
 * refreshed tokens are written to both the forwarded request (so Server Components see
 * them) and the response (so the browser keeps them), together with the no-cache
 * headers the library supplies. `getClaims()` verifies the token; the cookie alone is
 * never trusted.
 *
 * Callers must return `response`, or copy its cookies and headers onto any other
 * response they return (see `withSession`), or a refreshed session is lost.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const env = getSupabaseEnv();
  // Not configured: nothing to refresh. Public pages keep working.
  if (!env) return { response, userId: null as string | null };

  const supabase = createServerClient<Database>(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        for (const [key, value] of Object.entries(headers)) response.headers.set(key, value);
      },
    },
  });

  // Do not run other code between creating the client and this call.
  const { data } = await supabase.auth.getClaims();
  const userId = typeof data?.claims?.sub === 'string' ? data.claims.sub : null;

  return { response, userId };
}

/** Copies refreshed session cookies and cache headers onto another response. */
export function withSession(from: NextResponse, to: NextResponse) {
  for (const cookie of from.cookies.getAll()) to.cookies.set(cookie);
  for (const key of ['cache-control', 'expires', 'pragma']) {
    const value = from.headers.get(key);
    if (value) to.headers.set(key, value);
  }
  return to;
}
