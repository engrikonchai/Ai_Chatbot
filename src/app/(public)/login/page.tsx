import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/Container';

import styles from '../auth.module.css';
import { LogInForm } from './LogInForm';

export const metadata: Metadata = { title: 'Log in' };

/**
 * Log in (SCREENS.md section 4): email and password, a way to recover, a way to sign up.
 *
 * FRONTEND ONLY: see LogInForm. Nobody is logged in and nothing navigates onward.
 */
export default function LogInPage() {
  return (
    <Container className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Welcome back.</h1>
        <p className={styles.lede}>Log in to check on your assistant.</p>
      </div>

      <LogInForm />

      <p className={styles.switch}>
        New here? <Link href="/signup">Create account</Link>
      </p>
    </Container>
  );
}
