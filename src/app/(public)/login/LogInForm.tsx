'use client';

import Link from 'next/link';
import { useRef, useState, useTransition } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Field';
import { PasswordInput } from '@/components/PasswordInput';
import { logIn } from '@/lib/auth/actions';

import styles from '../auth.module.css';

/*
 * Real email and password login with Supabase Auth (see lib/auth/actions).
 *
 * Fields are checked here first, then on the server. On success the action sends the
 * owner to Home if setup is genuinely complete, otherwise to setup; completion comes
 * from the database, never from this form. Wrong credentials get one calm line that
 * does not say which field was wrong.
 */

type Errors = { email?: string; password?: string };

export function LogInForm({ initialNote }: { initialNote?: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [note, setNote] = useState<string | undefined>(initialNote);
  const [pending, startTransition] = useTransition();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const emailInput = emailRef.current;
    const next: Errors = {
      email: emailInput?.validity.valueMissing
        ? 'Enter your email address.'
        : emailInput?.validity.valid
          ? undefined
          : 'Enter a valid email address.',
      password: password ? undefined : 'Enter your password.',
    };
    setErrors(next);
    setNote(undefined);

    if (next.email) emailInput?.focus();
    else if (next.password) passwordRef.current?.focus();
    else {
      startTransition(async () => {
        // On success the action redirects and nothing below runs.
        const result = await logIn({ email, password });
        if (result.error) setNote(result.error);
      });
    }
  }

  function clear(field: keyof Errors) {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    setNote(undefined);
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
        error={errors.email}
        onChange={(event) => {
          setEmail(event.target.value);
          clear('email');
        }}
      />
      <PasswordInput
        ref={passwordRef}
        label="Password"
        name="password"
        autoComplete="current-password"
        required
        value={password}
        error={errors.password}
        onChange={(event) => {
          setPassword(event.target.value);
          clear('password');
        }}
      />
      <Link href="/forgot-password" className={styles.forgot}>
        Forgot password?
      </Link>

      <div className={styles.submit}>
        <Button type="submit" disabled={pending}>
          {pending ? 'Logging in…' : 'Log in'}
        </Button>
        <div role="status" className={styles.status}>
          {note ? <p>{note}</p> : null}
        </div>
      </div>
    </form>
  );
}
