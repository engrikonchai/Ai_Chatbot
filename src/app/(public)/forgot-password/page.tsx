import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/Container';

import styles from '../auth.module.css';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Reset your password',
  description: 'Get a link to choose a new password for your website assistant account.',
};

/** Step one of the Supabase password-reset flow: ask for the email and send a link. */
export default function ForgotPasswordPage() {
  return (
    <Container className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Reset your password.</h1>
        <p className={styles.lede}>We’ll email you a link to choose a new one.</p>
      </div>

      <ForgotPasswordForm />

      <p className={styles.switch}>
        Remembered it? <Link href="/login">Log in</Link>
      </p>
    </Container>
  );
}
