'use client';

import { useState } from 'react';

import { Shell, useFieldIds } from './Field';
import fieldStyles from './Field.module.css';
import styles from './PasswordInput.module.css';

type PasswordInputProps = {
  label: string;
  hint?: string;
  error?: string;
} & Omit<React.ComponentPropsWithRef<'input'>, 'type'>;

/**
 * A real password field with a Show / Hide button inside it. Same label, hint and
 * error behaviour as the shared Input. The button names what it does ("Show password")
 * and keeps focus, so keyboard and screen-reader users can check what they typed.
 * No strength meter and no rules: the password policy is not decided yet.
 */
export function PasswordInput({ label, hint, error, id, className, ...rest }: PasswordInputProps) {
  const ids = useFieldIds(id, hint, error);
  const [visible, setVisible] = useState(false);

  return (
    <Shell {...ids} label={label} hint={hint} error={error}>
      <div className={styles.wrap}>
        <input
          id={ids.fieldId}
          type={visible ? 'text' : 'password'}
          className={[fieldStyles.control, fieldStyles.input, styles.input, className]
            .filter(Boolean)
            .join(' ')}
          aria-describedby={ids.describedBy}
          aria-invalid={error ? true : undefined}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          {...rest}
        />
        <button
          type="button"
          className={styles.toggle}
          aria-controls={ids.fieldId}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? 'Hide' : 'Show'}
          <span className="visually-hidden"> password</span>
        </button>
      </div>
    </Shell>
  );
}
