import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/Container';
import { getCurrentUser } from '@/lib/auth/session';

import styles from '../auth.module.css';
import { UpdatePasswordForm } from './UpdatePasswordForm';

export const metadata: Metadata = {
  title: 'Choose a new password',
  robots: { index: false, follow: false },
};

/**
 * Step two of the password-reset flow. The reset link signs the owner in through
 * /auth/callback, so a session must exist here; without one, the link was missing,
 * expired or already used, and the page says so instead of showing a form that would
 * fail.
 */
export default async function UpdatePasswordPage() {
  const user = await getCurrentUser();

  return (
    <Container className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Choose a new password.</h1>
        <p className={styles.lede}>
          {user
            ? 'You’ll use it the next time you log in.'
            : 'This reset link has expired or was already used.'}
        </p>
      </div>

      {user ? (
        <UpdatePasswordForm />
      ) : (
        <p className={styles.switch}>
          <Link href="/forgot-password">Request a new link</Link>
        </p>
      )}
    </Container>
  );
}
