import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/Container';

import styles from '../auth.module.css';
import { LogInForm } from './LogInForm';

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in to check on your website assistant.',
};

/** Calm explanations for the reasons the auth callback can send someone here. */
const LINK_NOTES: Record<string, string> = {
  expired: 'That link has expired or was already used. Log in, or request a new link.',
};

/**
 * Log in (SCREENS.md section 4): email and password, a way to recover, a way to sign up.
 * Real authentication: see LogInForm and lib/auth/actions.
 */
export default async function LogInPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { link } = await searchParams;
  const initialNote = typeof link === 'string' ? LINK_NOTES[link] : undefined;

  return (
    <Container className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Welcome back.</h1>
        <p className={styles.lede}>Log in to check on your assistant.</p>
      </div>

      <LogInForm initialNote={initialNote} />

      <p className={styles.switch}>
        New here? <Link href="/signup">Create account</Link>
      </p>
    </Container>
  );
}
