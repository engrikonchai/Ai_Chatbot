import { useId } from 'react';

import styles from './Field.module.css';

type FieldProps = {
  label: string;
  /** Plain-language help or an example. */
  hint?: string;
  /** Calm, specific error text. Shown only when the field is actually in error. */
  error?: string;
};

function useFieldIds(id: string | undefined, hint?: string, error?: string) {
  const generated = useId();
  const fieldId = id ?? generated;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return { fieldId, hintId, errorId, describedBy };
}

function Shell({
  fieldId,
  hintId,
  errorId,
  label,
  hint,
  error,
  children,
}: FieldProps & { fieldId: string; hintId?: string; errorId?: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
      {hint ? (
        <p className={styles.hint} id={hintId}>
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({
  label,
  hint,
  error,
  id,
  className,
  ...rest
}: FieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const ids = useFieldIds(id, hint, error);
  return (
    <Shell {...ids} label={label} hint={hint} error={error}>
      <input
        id={ids.fieldId}
        className={[styles.control, styles.input, className].filter(Boolean).join(' ')}
        aria-describedby={ids.describedBy}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
    </Shell>
  );
}

export function Textarea({
  label,
  hint,
  error,
  id,
  className,
  rows = 3,
  ...rest
}: FieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ids = useFieldIds(id, hint, error);
  return (
    <Shell {...ids} label={label} hint={hint} error={error}>
      <textarea
        id={ids.fieldId}
        rows={rows}
        className={[styles.control, styles.textarea, className].filter(Boolean).join(' ')}
        aria-describedby={ids.describedBy}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
    </Shell>
  );
}
