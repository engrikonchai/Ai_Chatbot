/**
 * Supabase configuration, read once and checked in one place.
 *
 * Only public values live here (URL and publishable key); both reach the browser by
 * design and every query is still checked by Row Level Security. There is deliberately
 * no secret / service-role key anywhere in this app.
 *
 * The `process.env.NEXT_PUBLIC_*` references must stay literal so Next.js can inline
 * them at build time.
 */

export type SupabaseEnv = { url: string; publishableKey: string };

export class SupabaseConfigError extends Error {
  constructor() {
    super(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and ' +
        'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local (see .env.example).',
    );
    this.name = 'SupabaseConfigError';
  }
}

/** The configuration, or null when it is missing. Never throws. */
export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}

/** The configuration, or a clear error naming the missing variables. */
export function requireSupabaseEnv(): SupabaseEnv {
  const env = getSupabaseEnv();
  if (!env) throw new SupabaseConfigError();
  return env;
}

export function isSupabaseConfigured() {
  return getSupabaseEnv() !== null;
}
