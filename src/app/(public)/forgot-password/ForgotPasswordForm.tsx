'use client';

import { useEffect, useRef, useState, useTransition } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Field';
import { requestPasswordReset } from '@/lib/auth/actions';

import styles from '../auth.module.css';

/*
 * Requests a real reset email from Supabase Auth. The answer is the same whether or
 * not an account exists for the address, so this form never reveals who has an
 * account. The link in the email returns through /auth/callback to /update-password.
 */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [note, setNote] = useState<string>();
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const emailRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const input = emailRef.current;
    const problem = input?.validity.valueMissing
      ? 'Enter your email address.'
      : input?.validity.valid
        ? undefined
        : 'Enter a valid email address.';
    setError(problem);
    setNote(undefined);
    if (problem) {
      input?.focus();
      return;
    }
    startTransition(async () => {
      const result = await requestPasswordReset({ email });
      if (result.sent) setSent(true);
      else if (result.error) setNote(result.error);
    });
  }

  if (sent) {
    return (
      <div ref={doneRef} tabIndex={-1} className={styles.done}>
        <p className={styles.doneTitle}>Check your email.</p>
        <p className={styles.doneText}>
          If there’s an account for {email.trim()}, we’ve sent a link to reset your password.
          Open it in this browser.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        ref={emailRef}
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required
        value={email}
        error={error}
        onChange={(event) => {
          setEmail(event.target.value);
          if (error) setError(undefined);
          setNote(undefined);
        }}
      />
      <div className={styles.submit}>
        <Button type="submit" disabled={pending}>
          {pending ? 'Sending…' : 'Send reset link'}
        </Button>
        <div role="status" className={styles.status}>
          {note ? <p>{note}</p> : null}
        </div>
      </div>
    </form>
  );
}
