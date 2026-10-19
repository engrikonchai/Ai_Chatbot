'use client';

import { useRef, useState, useTransition } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Field';
import { normalizeWebsite } from '@/lib/website-url';

import { saveWebsite } from './actions';
import styles from './AddWebsiteForm.module.css';

const MESSAGE = {
  empty: 'Enter your website address to continue.',
  invalid: 'That doesn’t look like a website address. Try something like myhotel.me.',
} as const;

/**
 * Saves the owner's website address to their business (see ./actions).
 *
 * TEMPORARY until website analysis exists (Phase 2 Part 2): a valid address is saved
 * for real, and the form says exactly that. It does NOT start analysis, navigate to
 * Learning or show results, because nothing reads the site yet. When analysis exists,
 * the success branch starts it and moves on. "Set up manually" is still a placeholder.
 */
export function AddWebsiteForm({ initialWebsite }: { initialWebsite: string | null }) {
  const [value, setValue] = useState(initialWebsite ?? '');
  const [pending, startTransition] = useTransition();
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
    if (pending) return;
    startTransition(async () => {
      const saved = await saveWebsite({ website: value });
      if (saved.error) {
        setNote(saved.error);
        return;
      }
      // TEMPORARY (see above): saved for real, but nothing was scanned.
      setValue(saved.saved ?? result.url);
      setNote(
        `Saved ${saved.saved ?? result.url}. Website analysis isn’t available yet, so nothing has been scanned.`,
      );
    });
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
        action={
          <Button type="submit" disabled={pending}>
            {pending ? 'Saving…' : 'Analyze website'}
          </Button>
        }
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
