'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Field';
import { PasswordInput } from '@/components/PasswordInput';

import styles from '../auth.module.css';

/*
 * FRONTEND VALIDATION ONLY, until authentication exists.
 *
 * The form checks its fields in React state and stops there: no request, no session,
 * no storage, no cookies, no navigation. A valid submission only says plainly that
 * login isn't connected, and "Forgot password?" says reset isn't connected rather than
 * pretending an email was sent. Neither may show a signed-in state or move to /home
 * or /setup until real authentication exists.
 */

type Errors = { email?: string; password?: string };

export function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [note, setNote] = useState<string>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
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

    if (next.email) emailInput?.focus();
    else if (next.password) passwordRef.current?.focus();
    // TEMPORARY (see above): honest placeholder, nobody is logged in.
    else setNote('Login isn’t connected yet.');
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
      {/* TEMPORARY: no reset email exists, so this only says so. */}
      <Button
        variant="quiet"
        className={styles.forgot}
        onClick={() => setNote('Password reset isn’t connected yet.')}
      >
        Forgot password?
      </Button>

      <div className={styles.submit}>
        <Button type="submit">Log in</Button>
        <div role="status" className={styles.status}>
          {note ? <p>{note}</p> : null}
        </div>
      </div>
    </form>
  );
}
