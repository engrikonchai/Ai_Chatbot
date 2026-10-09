'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';

import styles from './ReviewAction.module.css';

/**
 * The primary action of the Analysis complete screen.
 *
 * TEMPORARY: the Review Information screen does not exist yet, and this state is not
 * wired into any real flow. So the button does not navigate anywhere or pretend a
 * review happened. It only says, plainly, that the next step is not available.
 * Replace `handleClick` with real navigation when Review Information is built.
 */
export function ReviewAction() {
  const [note, setNote] = useState<string>();

  function handleClick() {
    // TEMPORARY (see above): honest placeholder, no fake flow.
    setNote('The review step isn’t available yet, so nothing was reviewed.');
  }

  return (
    <div className={styles.review}>
      <Button onClick={handleClick}>Review important information</Button>
      <div role="status" className={styles.status}>
        {note ? <p>{note}</p> : null}
      </div>
    </div>
  );
}
