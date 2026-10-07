'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Field';
import { normalizeWebsite } from '@/lib/website-url';

import styles from './AddWebsiteForm.module.css';

const MESSAGE = {
  empty: 'Enter your website address to continue.',
  invalid: 'That doesn’t look like a website address. Try something like myhotel.me.',
} as const;

/**
 * Milestone 2: the form checks the address and stops there.
 *
 * TEMPORARY: there is no website scanner yet, so a valid address does NOT start
 * analysis, navigate, or show results. It only tells the owner, plainly, that
 * scanning is not connected. Replace `handleSubmit`'s success branch when the
 * real analysis flow exists. Likewise "Set up manually" is a placeholder.
 */
export function AddWebsiteForm() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();
  const [note, setNote] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setNote(undefined);

    const result = normalizeWebsite(value);
    if (!result.ok) {
      setError(MESSAGE[result.reason]);
      inputRef.current?.focus();
      return;
    }

    setError(undefined);
    // TEMPORARY (see above): honest placeholder, no fake analysis.
    setNote(`Website analysis isn’t connected yet, so nothing was scanned. We would start with ${result.url}.`);
  }

  function handleManual() {
    setError(undefined);
    // TEMPORARY: manual setup is not built.
    setNote('Manual setup isn’t available yet. For now, start with your website.');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        ref={inputRef}
        label="Website"
        name="website"
        type="text"
        inputMode="url"
        autoComplete="url"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required
        placeholder="https://yourbusiness.com"
        value={value}
        error={error}
        onChange={(event) => {
          setValue(event.target.value);
          if (error) setError(undefined);
        }}
        action={<Button type="submit">Analyze website</Button>}
      />

      <div className={styles.manual}>
        <span>No website?</span>
        <Button variant="quiet" className={styles.manualButton} onClick={handleManual}>
          Set up manually
        </Button>
      </div>

      <div role="status" className={styles.status}>
        {note ? <p>{note}</p> : null}
      </div>
    </form>
  );
}
