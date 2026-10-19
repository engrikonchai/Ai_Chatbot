/**
 * Calm, human messages for authentication problems. Raw provider messages, codes and
 * status details never reach the page; anything unrecognised gets a generic line.
 */

const MESSAGES: Record<string, string> = {
  invalid_credentials: 'That email and password don’t match. Check them and try again.',
  email_not_confirmed: 'Confirm your email first. Open the link we sent you, then log in.',
  user_already_exists: 'There’s already an account with that email. Try logging in instead.',
  email_exists: 'There’s already an account with that email. Try logging in instead.',
  weak_password: 'Choose a stronger password. A longer one usually works.',
  same_password: 'Choose a password you haven’t used for this account before.',
  email_address_invalid: 'Enter a valid email address.',
  over_email_send_rate_limit: 'Too many emails were requested. Wait a few minutes, then try again.',
  over_request_rate_limit: 'Too many attempts. Wait a few minutes, then try again.',
  signup_disabled: 'New accounts can’t be created right now.',
  session_not_found: 'Your session has ended. Log in again to continue.',
  session_expired: 'Your session has ended. Log in again to continue.',
};

export const GENERIC_AUTH_ERROR = 'Something went wrong on our side. Please try again.';

export const NOT_CONFIGURED_ERROR =
  'Accounts aren’t available on this site yet. Please try again later.';

export function authErrorMessage(error: { code?: string } | null | undefined) {
  return (error?.code && MESSAGES[error.code]) || GENERIC_AUTH_ERROR;
}
