'use client';

import { useRef, useState, useTransition } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Field';

import { saveEnquiryEmail } from '../actions';
import styles from './EnquiryForm.module.css';

const MESSAGE = {
  empty: 'Enter an email address to continue.',
  invalid: 'Enter a valid email address.',
} as const;

/*
 * Saves where enquiries should go (businesses.enquiry_email, see ../actions).
 *
 * The address is checked here with the browser's own type="email" rule, then again on
 * the server. Once it is genuinely saved, Continue moves on to Test Assistant; if
 * saving fails the owner stays here with a calm message. Only the address is real:
 * nothing is emailed to it yet, and no screen claims enquiry delivery works.
 */
export function EnquiryForm({ initialEmail }: { initialEmail: string }) {
  const [value, setValue] = useState(initialEmail);
  const [error, setError] = useState<string>();
  const [note, setNote] = useState<string>();
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = inputRef.current;
    if (!input || pending) return;

    // The browser's own type="email" check: permissive enough for real addresses,
    // no hand-written regex. `required` makes an empty value a `valueMissing`.
    const problem = input.validity.valueMissing
      ? MESSAGE.empty
      : input.validity.valid
        ? undefined
        : MESSAGE.invalid;

    setError(problem);
    setNote(undefined);
    if (problem) {
      input.focus();
      return;
    }

    startTransition(async () => {
      // On success the action redirects to /setup/test and nothing below runs.
      const result = await saveEnquiryEmail({ email: value });
      if (result.error) setNote(result.error);
    });
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
          setNote(undefined);
        }}
        action={
          <Button type="submit" disabled={pending}>
            {pending ? 'Saving…' : 'Continue'}
          </Button>
        }
      />

      {/* Polite: announces a save problem without interrupting. Field errors are tied to the field. */}
      <div role="status" className={styles.status}>
        {note ? <p>{note}</p> : null}
      </div>
    </form>
  );
}
