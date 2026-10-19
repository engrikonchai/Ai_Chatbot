import { NextResponse, type NextRequest } from 'next/server';

import { updateSession, withSession } from '@/lib/supabase/proxy';

/**
 * Next.js 16 Proxy (formerly middleware). On every page request it:
 * 1. keeps the Supabase session fresh, so Server Components see a valid session;
 * 2. sends anonymous visitors on owner-only routes to Log in.
 *
 * This is the first line of defence, not the only one: the setup and product layouts
 * require a signed-in owner on the server, and the database enforces ownership with
 * Row Level Security. Signed-in owners who open Log in or Sign up are redirected by
 * those pages, which can read where setup stands.
 */

const PROTECTED = ['/setup', '/home', '/assistant', '/website', '/settings'];

function isProtected(pathname: string) {
  return PROTECTED.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export async function proxy(request: NextRequest) {
  const { response, userId } = await updateSession(request);

  if (!userId && isProtected(request.nextUrl.pathname)) {
    const login = request.nextUrl.clone();
    login.pathname = '/login';
    login.search = '';
    return withSession(response, NextResponse.redirect(login));
  }

  return response;
}

export const config = {
  matcher: [
    // Everything except Next internals and static files (icons, images).
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
