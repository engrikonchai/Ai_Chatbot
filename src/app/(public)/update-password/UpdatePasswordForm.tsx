'use client';

import { useRef, useState, useTransition } from 'react';

import { Button } from '@/components/Button';
import { PasswordInput } from '@/components/PasswordInput';
import { updatePassword } from '@/lib/auth/actions';

import styles from '../auth.module.css';

/*
 * Sets the new password for the signed-in owner (who arrived from a reset link) with
 * Supabase Auth, then continues to setup or Home. The password policy comes from the
 * Supabase project; its answer is shown as a calm message.
 */
export function UpdatePasswordForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [note, setNote] = useState<string>();
  const [pending, startTransition] = useTransition();
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setNote(undefined);
    if (!password) {
      setError('Enter a new password.');
      passwordRef.current?.focus();
      return;
    }
    startTransition(async () => {
      // On success the action redirects and nothing below runs.
      const result = await updatePassword({ password });
      if (result.error) setNote(result.error);
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <PasswordInput
        ref={passwordRef}
        label="New password"
        name="password"
        autoComplete="new-password"
        required
        value={password}
        error={error}
        onChange={(event) => {
          setPassword(event.target.value);
          if (error) setError(undefined);
          setNote(undefined);
        }}
      />
      <div className={styles.submit}>
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save password'}
        </Button>
        <div role="status" className={styles.status}>
          {note ? <p>{note}</p> : null}
        </div>
      </div>
    </form>
  );
}
