'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Field';
import { PasswordInput } from '@/components/PasswordInput';

import styles from '../auth.module.css';

/*
 * FRONTEND VALIDATION ONLY, until authentication exists.
 *
 * The form checks its fields in React state and stops there: no request, no account,
 * no storage, no cookies, no navigation. A valid submission only says plainly that
 * account setup isn't connected. It must not move on to /setup or show any signed-in
 * state until real sign-up exists. No password rules are enforced beyond "not empty"
 * because the policy has not been decided.
 */

type Errors = { name?: string; email?: string; password?: string };

export function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [note, setNote] = useState<string>();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
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

    if (next.name) nameRef.current?.focus();
    else if (next.email) emailInput?.focus();
    else if (next.password) passwordRef.current?.focus();
    // TEMPORARY (see above): honest placeholder, no account is created.
    else setNote('Account setup isn’t connected yet.');
  }

  function clear(field: keyof Errors) {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    setNote(undefined);
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
        <Button type="submit">Create account</Button>
        <div role="status" className={styles.status}>
          {note ? <p>{note}</p> : null}
        </div>
      </div>
    </form>
  );
}
