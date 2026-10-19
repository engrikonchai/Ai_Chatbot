'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { OnboardingIntro } from '@/components/OnboardingIntro';
import { Input, Textarea } from '@/components/Field';

import styles from './ReviewList.module.css';

/*
 * UX VALIDATION ONLY, until the real knowledge system exists.
 *
 * Every answer lives in React state in this component and nowhere else: no requests,
 * no storage, no cookies. "Resolving" an item only changes what this tab shows, so the
 * assistant has not actually learned anything and a refresh resets the screen. When the
 * knowledge system exists, `resolve` becomes a save (with a pending state and a calm
 * failure) and the items come from it instead of demo data.
 */

type Verify = {
  readonly kind: 'verify';
  readonly key: string;
  readonly topic: string;
  readonly found: string;
  readonly editLabel: string;
};
type Choose = {
  readonly kind: 'choose';
  readonly key: string;
  readonly topic: string;
  readonly options: readonly string[];
};
type Teach = {
  readonly kind: 'teach';
  readonly key: string;
  readonly topic: string;
  readonly question: string;
  readonly example: string;
};
export type ReviewItem = Verify | Choose | Teach;

type ItemProps<T> = { item: T; onResolve: (answer: string) => void };

function summaryLine(remaining: number) {
  if (remaining === 0) return 'Everything important is clear.';
  return remaining === 1 ? '1 thing needs your help.' : `${remaining} things need your help.`;
}

export function ReviewList({ items }: { items: readonly ReviewItem[] }) {
  // Item key -> the answer the owner settled on. Ephemeral by design (see above).
  const [answers, setAnswers] = useState<Readonly<Record<string, string>>>({});
  const [announcement, setAnnouncement] = useState('');
  const [lastResolved, setLastResolved] = useState<string>();
  const rows = useRef(new Map<string, HTMLLIElement>());
  const headingId = useId();

  const remaining = items.filter((item) => answers[item.key] === undefined).length;

  // The control the owner just used is gone, so keep their place: focus the compact
  // "Got it." row, which reads out what was settled.
  useEffect(() => {
    if (lastResolved) rows.current.get(lastResolved)?.focus();
  }, [lastResolved]);

  function resolve(key: string, answer: string) {
    const next = { ...answers, [key]: answer };
    setAnswers(next);
    setLastResolved(key);
    // One short polite update with the new count. The row itself is read on focus.
    setAnnouncement(summaryLine(items.filter((item) => next[item.key] === undefined).length));
  }

  return (
    <>
      <OnboardingIntro
        title="Just a few things to check."
        lede={
          remaining === 0
            ? 'Thanks — I have what I need.'
            : 'I understood most of your business. I just need your help with a few details.'
        }
      />

      <section aria-labelledby={headingId}>
        <h2 id={headingId} className={styles.summary}>
          {summaryLine(remaining)}
        </h2>

        {/* role="list" because list-style: none removes list semantics in some browsers. */}
        <ul className={styles.list} role="list">
          {items.map((item) => {
            const answer = answers[item.key];
            const isResolved = answer !== undefined;
            return (
              <li
                key={item.key}
                ref={(node) => {
                  if (node) rows.current.set(item.key, node);
                  else rows.current.delete(item.key);
                }}
                tabIndex={isResolved ? -1 : undefined}
                className={`${styles.item} ${isResolved ? styles.resolved : ''}`}
              >
                {isResolved ? (
                  <Resolved topic={item.topic} answer={answer} />
                ) : (
                  <Question item={item} onResolve={(value) => resolve(item.key, value)} />
                )}
              </li>
            );
          })}
        </ul>

        <p role="status" className="visually-hidden">
          {announcement}
        </p>
      </section>
    </>
  );
}

function Question({ item, onResolve }: ItemProps<ReviewItem>) {
  switch (item.kind) {
    case 'verify':
      return <VerifyQuestion item={item} onResolve={onResolve} />;
    case 'choose':
      return <ChooseQuestion item={item} onResolve={onResolve} />;
    case 'teach':
      return <TeachQuestion item={item} onResolve={onResolve} />;
  }
}

/** "I found X. Is this right?" Confirm in one tap, or correct it inline. */
function VerifyQuestion({ item, onResolve }: ItemProps<Verify>) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.found);
  const [error, setError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef(false);
  const changeId = useId();

  // Opening the editor is an explicit request to type, so focus the field with the caret
  // after the current value. Closing it without saving returns focus to "Change".
  useEffect(() => {
    if (editing) {
      const input = inputRef.current;
      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    } else if (returnFocus.current) {
      returnFocus.current = false;
      document.getElementById(changeId)?.focus();
    }
  }, [editing, changeId]);

  function cancel() {
    setValue(item.found);
    setError(undefined);
    returnFocus.current = true;
    setEditing(false);
  }

  function handleSave(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const answer = value.trim();
    if (!answer) {
      setError('Enter what customers should be told.');
      inputRef.current?.focus();
      return;
    }
    onResolve(answer);
  }

  return (
    <div className={styles.question}>
      <h3 className={styles.topic}>{item.topic}</h3>
      <p className={styles.says}>I found: {item.found}.</p>

      {editing ? (
        <form className={styles.form} onSubmit={handleSave} noValidate>
          <Input
            ref={inputRef}
            label={item.editLabel}
            name={item.key}
            type="text"
            autoComplete="off"
            value={value}
            error={error}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError(undefined);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') cancel();
            }}
          />
          <div className={styles.actions}>
            <Button type="submit">Save</Button>
            <Button variant="quiet" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <>
          <p className={styles.note}>Is this right?</p>
          <div className={styles.actions}>
            <Button onClick={() => onResolve(item.found)}>Yes, that’s right</Button>
            <Button id={changeId} variant="secondary" onClick={() => setEditing(true)}>
              Change
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

/** Two conflicting values found: the owner picks the one to use. */
function ChooseQuestion({ item, onResolve }: ItemProps<Choose>) {
  const [choice, setChoice] = useState<string>();
  const [error, setError] = useState<string>();
  const firstRef = useRef<HTMLInputElement>(null);
  const name = useId();
  const errorId = `${name}-error`;

  function handleConfirm(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (choice === undefined) {
      setError('Choose one of the times.');
      firstRef.current?.focus();
      return;
    }
    onResolve(choice);
  }

  return (
    <div className={styles.question}>
      <h3 className={styles.topic}>{item.topic}</h3>
      <p className={styles.says}>
        I found two different times on your website. Which one should I use?
      </p>

      <form className={styles.form} onSubmit={handleConfirm} noValidate>
        <fieldset className={styles.choices} aria-describedby={error ? errorId : undefined}>
          <legend className="visually-hidden">{item.topic}</legend>
          <div className={styles.options}>
            {item.options.map((option, index) => (
              <label key={option} className={styles.option}>
                <input
                  ref={index === 0 ? firstRef : undefined}
                  className={styles.radio}
                  type="radio"
                  name={name}
                  value={option}
                  checked={choice === option}
                  onChange={() => {
                    setChoice(option);
                    setError(undefined);
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {error ? (
            <p id={errorId} className={styles.error}>
              {error}
            </p>
          ) : null}
        </fieldset>
        <div className={styles.actions}>
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    </div>
  );
}

/** Nothing found: the owner answers in their own words. No categories, no metadata. */
function TeachQuestion({ item, onResolve }: ItemProps<Teach>) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();
  const fieldRef = useRef<HTMLTextAreaElement>(null);

  function handleTeach(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const answer = value.trim();
    if (!answer) {
      setError('Write a short answer for your customers first.');
      fieldRef.current?.focus();
      return;
    }
    onResolve(answer);
  }

  return (
    <div className={styles.question}>
      <h3 className={styles.topic}>{item.topic}</h3>
      <p className={styles.says}>Customers may ask: “{item.question}”</p>
      <p className={styles.note}>I couldn’t find an answer on your website.</p>

      <form className={styles.form} onSubmit={handleTeach} noValidate>
        <Textarea
          ref={fieldRef}
          label="Your answer"
          name={item.key}
          placeholder={item.example}
          value={value}
          error={error}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) setError(undefined);
          }}
        />
        <div className={styles.actions}>
          <Button type="submit">Teach assistant</Button>
        </div>
      </form>
    </div>
  );
}

/**
 * The compact settled state: check, topic, answer. The check is a shape; screen readers
 * hear "Resolved: Airport transfer, €25 each way." when the row takes focus.
 */
function Resolved({ topic, answer }: { topic: string; answer: string }) {
  return (
    <div className={styles.done}>
      <svg
        className={styles.check}
        viewBox="0 0 20 20"
        width="20"
        height="20"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M4.5 10.5 8 14l7.5-8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={styles.doneText}>
        <p className={styles.doneTopic}>
          <span className="visually-hidden">Resolved: </span>
          {topic}
          <span className="visually-hidden">,</span>
        </p>
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
}
