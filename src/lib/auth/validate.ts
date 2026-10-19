/**
 * The same rules the forms check in the browser, re-checked on the server: browser
 * input is never trusted. Deliberately minimal; the password policy itself belongs to
 * the Supabase project settings, which report problems back as `weak_password`.
 */

// Pragmatic shape check, close to the browser's own type="email" rule.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanEmail(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function isEmail(value: string) {
  return value.length <= 320 && EMAIL.test(value);
}

export function cleanName(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 200) : '';
}

export function cleanPassword(value: unknown) {
  // Passwords are never trimmed: spaces may be intentional.
  return typeof value === 'string' ? value : '';
}

/**
 * Only same-site paths may be used as a post-auth destination, never an absolute or
 * protocol-relative URL (open-redirect protection).
 */
export function safeNextPath(value: string | null | undefined, fallback: string) {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return fallback;
  }
  return value;
}
