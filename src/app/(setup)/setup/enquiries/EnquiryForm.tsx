'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Field';

import styles from './EnquiryForm.module.css';

const MESSAGE = {
  empty: 'Enter an email address to continue.',
  invalid: 'Enter a valid email address.',
} as const;

/*
 * UX VALIDATION ONLY, until enquiry delivery exists.
 *
 * The address lives in React state in this component and nowhere else: no requests,
 * no storage, no cookies. A valid address is not saved and nothing will be emailed to
 * it, so the only feedback is "Looks good." (the address is well formed), never "Saved"
 * or "Connected". Continue does not navigate because the next step is not built yet.
 * A refresh resets everything. When delivery exists, the success branch of
 * `handleSubmit` becomes a save (with a pending state and a calm failure) followed by
 * moving on to Test Assistant.
 */
export function EnquiryForm() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();
  const [confirmed, setConfirmed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = inputRef.current;
    if (!input) return;

    // The browser's own type="email" check: permissive enough for real addresses,
    // no hand-written regex. `required` makes an empty value a `valueMissing`.
    const problem = input.validity.valueMissing
      ? MESSAGE.empty
      : input.validity.valid
        ? undefined
        : MESSAGE.invalid;

    setError(problem);
    setConfirmed(!problem);
    if (problem) input.focus();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        ref={inputRef}
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required
        placeholder="reservations@example.com"
        value={value}
        error={error}
        onChange={(event) => {
          setValue(event.target.value);
          if (error) setError(undefined);
          if (confirmed) setConfirmed(false);
        }}
        action={<Button type="submit">Continue</Button>}
      />

      {/* Polite: announces "Looks good." without interrupting. Errors are tied to the field. */}
      <div role="status" className={styles.status}>
        {confirmed ? <p>Looks good.</p> : null}
      </div>
    </form>
  );
}
