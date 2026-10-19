import { headers } from 'next/headers';

/**
 * The site's origin for links in auth emails. Prefers the configured public URL, then
 * the request's own Origin header (always present on Server Action requests). The
 * resulting URL must also be in the Supabase project's allowed redirect URLs.
 */
export async function siteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '');
  if (configured) return configured;
  const origin = (await headers()).get('origin');
  if (origin) return origin;
  throw new Error('Cannot determine the site origin. Set NEXT_PUBLIC_SITE_URL.');
}
