/**
 * Gentle client-side check for the "Add website" field (WIREFRAMES.md, "Website URL
 * Validation"). It accepts `myhotel.me` as well as a full address and returns a
 * normalized https/http URL. This only judges the *shape* of what was typed. It never
 * contacts the site, so it says nothing about whether the site exists or can be read.
 * Server-side validation (including blocking private network addresses) is still
 * required once real scanning exists.
 */

export type WebsiteCheck =
  | { ok: true; url: string }
  | { ok: false; reason: 'empty' | 'invalid' };

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;
const HOST_LABEL = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
// Real top-level domains are letters, or punycode (xn--) for internationalised ones.
const TOP_LEVEL = /^([a-z]{2,63}|xn--[a-z0-9-]{1,59})$/;

const INVALID = { ok: false, reason: 'invalid' } as const;

export function normalizeWebsite(raw: string): WebsiteCheck {
  const input = raw.trim();
  if (!input) return { ok: false, reason: 'empty' };
  if (/\s/.test(input)) return INVALID;

  const candidate = HAS_SCHEME.test(input) ? input : `https://${input}`;

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return INVALID;
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') return INVALID;
  if (url.username || url.password) return INVALID;

  // URL lowercases the host and converts internationalised names to punycode.
  const labels = url.hostname.split('.');
  if (labels.length < 2) return INVALID; // "localhost", "intranet"
  if (!labels.every((label) => HOST_LABEL.test(label))) return INVALID;
  if (!TOP_LEVEL.test(labels[labels.length - 1] ?? '')) return INVALID; // IP addresses end here

  const path = url.pathname.replace(/\/+$/, '');
  return { ok: true, url: `${url.protocol}//${url.host}${path}` };
}
