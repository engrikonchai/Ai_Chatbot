import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/Container';

import styles from '../auth.module.css';
import { SignUpForm } from './SignUpForm';

export const metadata: Metadata = {
  title: 'Create your account',
  description: 'Create an account and start building an AI assistant for your website.',
};

/**
 * Sign up (SCREENS.md section 3): name, email, password, nothing else. Business details
 * come from the website during setup, not from this form.
 *
 * Real sign-up: see SignUpForm and lib/auth/actions.
 */
export default function SignUpPage() {
  return (
    <Container className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Create your account.</h1>
        <p className={styles.lede}>Then we’ll start building your assistant from your website.</p>
      </div>

      <SignUpForm />

      <p className={styles.switch}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </Container>
  );
}
