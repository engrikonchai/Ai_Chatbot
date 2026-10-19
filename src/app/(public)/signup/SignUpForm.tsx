'use client';

import { useEffect, useRef, useState, useTransition } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Field';
import { PasswordInput } from '@/components/PasswordInput';
import { signUp } from '@/lib/auth/actions';

import styles from '../auth.module.css';

/*
 * Creates a real account with Supabase Auth (see lib/auth/actions).
 *
 * Fields are checked here first for quick feedback, then again on the server. On
 * success the owner goes straight to /setup. If the project requires email
 * confirmation, no session exists yet, so the form says "Check your email" and does
 * not pretend the owner is signed in. Problems arrive as calm messages, never raw
 * provider errors. No password rules beyond "not empty" are enforced here; the
 * project's own policy reports back if a password is too weak.
 */

type Errors = { name?: string; email?: string; password?: string };

export function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [note, setNote] = useState<string>();
  const [checkEmail, setCheckEmail] = useState(false);
  const [pending, startTransition] = useTransition();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (checkEmail) doneRef.current?.focus();
  }, [checkEmail]);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const emailInput = emailRef.current;
    const next: Errors = {
      name: name.trim() ? undefined : 'Enter your name.',
      email: emailInput?.validity.valueMissing
        ? 'Enter your email address.'
        : emailInput?.validity.valid
          ? undefined
          : 'Enter a valid email address.',
      password: password ? undefined : 'Enter a password.',
    };
    setErrors(next);
    setNote(undefined);

    if (next.name) nameRef.current?.focus();
    else if (next.email) emailInput?.focus();
    else if (next.password) passwordRef.current?.focus();
    else {
      startTransition(async () => {
        // On success the action redirects to /setup and nothing below runs.
        const result = await signUp({ name, email, password });
        if (result.checkEmail) setCheckEmail(true);
        else if (result.error) setNote(result.error);
      });
    }
  }

  function clear(field: keyof Errors) {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    setNote(undefined);
  }

  if (checkEmail) {
    return (
      <div ref={doneRef} tabIndex={-1} className={styles.done}>
        <p className={styles.doneTitle}>Check your email to continue.</p>
        <p className={styles.doneText}>
          We sent a link to {email.trim()}. Open it in this browser to finish creating your
          account.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        ref={nameRef}
        label="Name"
        name="name"
        autoComplete="name"
        required
        value={name}
        error={errors.name}
        onChange={(event) => {
          setName(event.target.value);
          clear('name');
        }}
      />
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
        autoComplete="new-password"
        required
        value={password}
        error={errors.password}
        onChange={(event) => {
          setPassword(event.target.value);
          clear('password');
        }}
      />

      <div className={styles.submit}>
        <Button type="submit" disabled={pending}>
          {pending ? 'Creating account…' : 'Create account'}
        </Button>
        <div role="status" className={styles.status}>
          {note ? <p>{note}</p> : null}
        </div>
      </div>
    </form>
  );
}
