'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { demoInstall } from '@/lib/demo';

import styles from './Installation.module.css';

/*
 * UX VALIDATION ONLY, until the embeddable widget and installation checking exist.
 *
 * The snippet is REPRESENTATIVE DEMO CONTENT (see `demoInstall`): example.com is not a
 * real endpoint and pasting it installs nothing. "Copy code" uses the real clipboard,
 * so "Copied." is only shown when the copy actually happened. Nothing else here sends,
 * saves or detects anything: no requests, no storage.
 */

const COPIED = 'Copied.';
const COPY_FAILED = 'Couldn’t copy automatically. The code is selected so you can copy it yourself.';

export function Installation() {
  const [copied, setCopied] = useState<boolean>();
  const [note, setNote] = useState<string>();
  const codeRef = useRef<HTMLElement>(null);

  async function handleCopy() {
    // Clear first so a second copy is announced again.
    setCopied(undefined);
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(demoInstall.snippet);
      setCopied(true);
    } catch {
      // Blocked, unsupported or denied: never claim success. Select the code instead so
      // copying by hand is one keystroke away.
      const code = codeRef.current;
      const selection = window.getSelection();
      if (code && selection) {
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setCopied(false);
    }
  }

  return (
    <div className={styles.content}>
      <section aria-labelledby="install-code" className={styles.code}>
        <h2 id="install-code" className="visually-hidden">
          Installation code
        </h2>
        {/* Wraps instead of scrolling, so it never widens the page on a phone. */}
        <pre className={styles.snippet}>
          <code ref={codeRef}>{demoInstall.snippet}</code>
        </pre>
        <div className={styles.copyRow}>
          <Button variant="secondary" onClick={handleCopy}>
            Copy code
          </Button>
          <div role="status" className={styles.copyStatus}>
            {copied === true ? (
              <p className={styles.copied}>
                <svg
                  className={styles.check}
                  viewBox="0 0 20 20"
                  width="16"
                  height="16"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M4.5 10.5 8 14l7.5-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {COPIED}
              </p>
            ) : copied === false ? (
              <p>{COPY_FAILED}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="install-steps" className={styles.steps}>
        <h2 id="install-steps" className={styles.stepsTitle}>
          Custom website
        </h2>
        <ol className={styles.list}>
          <li>Copy the code.</li>
          <li>
            Paste it just before the closing <code className={styles.tag}>&lt;/body&gt;</code> tag on
            your website.
          </li>
          <li>Publish your website.</li>
        </ol>
      </section>

      <div className={styles.finish}>
        <div className={styles.actions}>
          {/*
           * TEMPORARY FRONTEND VALIDATION: there is no installation detection yet, so this
           * only says so. It must never report "Widget detected" or success until a real
           * check exists. Replace with the checking / found / not found states.
           */}
          <Button onClick={() => setNote('Installation checking isn’t connected yet.')}>
            Check installation
          </Button>
          {/* TEMPORARY until Go Live exists: acknowledges the choice, does not navigate. */}
          <Button
            variant="quiet"
            onClick={() => setNote('No problem. You can add it whenever you’re ready.')}
          >
            I’ll install it later
          </Button>
        </div>
        <div role="status" className={styles.status}>
          {note ? <p>{note}</p> : null}
        </div>
      </div>
    </div>
  );
}
