'use client';

import { useRouter } from 'next/navigation';
import { useId, useRef, useState } from 'react';

import { AssistantMark } from '@/components/AssistantMark';
import { Button } from '@/components/Button';
import { Input, Textarea } from '@/components/Field';
import { demoWidget } from '@/lib/demo';

import styles from './WidgetSetup.module.css';

/*
 * UX VALIDATION ONLY, until the embeddable widget and saving exist.
 *
 * Appearance lives in React state in this component and nowhere else: no requests, no
 * storage, no cookies. The preview is drawn here from that state and updates as the
 * owner types; it is a picture of the widget, not the widget. A refresh restores the
 * defaults, and Continue moves on to Installation without saving anything. The four controls are the whole approved set (SCREENS.md section 10):
 * do not add fonts, radii, sizes, shadows, themes or custom CSS here.
 */

type Position = 'left' | 'right';

const MESSAGE = {
  name: 'Give your assistant a name.',
  greeting: 'Write a short welcome message.',
} as const;

const POSITIONS: readonly { value: Position; label: string }[] = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
];

export function WidgetSetup() {
  const [name, setName] = useState<string>(demoWidget.name);
  const [greeting, setGreeting] = useState<string>(demoWidget.greeting);
  const [colour, setColour] = useState<string>(demoWidget.colour);
  const [position, setPosition] = useState<Position>(demoWidget.position);
  const [open, setOpen] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; greeting?: string }>({});
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const greetingRef = useRef<HTMLTextAreaElement>(null);
  const colourId = useId();

  function handleContinue(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = {
      name: name.trim() ? undefined : MESSAGE.name,
      greeting: greeting.trim() ? undefined : MESSAGE.greeting,
    };
    setErrors(next);
    if (next.name) nameRef.current?.focus();
    else if (next.greeting) greetingRef.current?.focus();
    // Nothing to save yet: appearance is not persisted, so this is only the next step.
    else router.push('/setup/install');
  }

  return (
    <div className={styles.layout}>
      <Preview
        name={name}
        greeting={greeting}
        colour={colour}
        position={position}
        open={open}
        onToggle={() => setOpen((current) => !current)}
      />

      <form className={styles.controls} onSubmit={handleContinue} noValidate>
        <Input
          ref={nameRef}
          label="Assistant name"
          name="assistant-name"
          autoComplete="off"
          maxLength={30}
          value={name}
          error={errors.name}
          onChange={(event) => {
            setName(event.target.value);
            if (errors.name) setErrors((current) => ({ ...current, name: undefined }));
          }}
        />

        <Textarea
          ref={greetingRef}
          label="Welcome message"
          name="welcome-message"
          rows={2}
          maxLength={140}
          value={greeting}
          error={errors.greeting}
          onChange={(event) => {
            setGreeting(event.target.value);
            if (errors.greeting) setErrors((current) => ({ ...current, greeting: undefined }));
          }}
        />

        <div className={styles.field}>
          <label htmlFor={colourId} className={styles.label}>
            Primary colour
          </label>
          <div className={styles.colourRow}>
            <input
              id={colourId}
              className={styles.colour}
              type="color"
              name="primary-colour"
              value={colour}
              aria-describedby={`${colourId}-value`}
              onChange={(event) => setColour(event.target.value)}
            />
            {/* The value in words too, so the choice never depends on seeing colour. */}
            <span id={`${colourId}-value`} className={styles.colourValue}>
              {colour.toUpperCase()}
            </span>
          </div>
        </div>

        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>Position</legend>
          <div className={styles.options}>
            {POSITIONS.map((option) => (
              <label key={option.value} className={styles.option}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="position"
                  value={option.value}
                  checked={position === option.value}
                  onChange={() => setPosition(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.finish}>
          <Button type="submit">Continue to installation</Button>
        </div>
      </form>
    </div>
  );
}

/**
 * A picture of the widget on a sketched website. Nothing here talks to anyone: the input
 * row is drawn, not a field, and the only control is the launcher, which shows the
 * closed and open states.
 */
function Preview({
  name,
  greeting,
  colour,
  position,
  open,
  onToggle,
}: {
  name: string;
  greeting: string;
  colour: string;
  position: Position;
  open: boolean;
  onToggle: () => void;
}) {
  const titleId = useId();
  const widgetId = useId();
  const on = readableOn(colour);
  const shownName = name.trim();
  const shownGreeting = greeting.trim();

  return (
    <section className={styles.preview} aria-labelledby={titleId}>
      <div className={styles.previewHead}>
        <h2 id={titleId} className={styles.previewTitle}>
          Preview
        </h2>
        <p className={styles.previewNote}>How it will look to visitors. This is only a preview.</p>
      </div>

      <div
        className={styles.site}
        data-position={position}
        style={{ '--widget-colour': colour } as React.CSSProperties}
      >
        <div className={styles.page} aria-hidden="true">
          <span className={styles.sketchNav} />
          <span className={styles.sketchTitle} />
          <span className={styles.sketchLine} />
          <span className={styles.sketchLine} />
          <span className={styles.sketchShort} />
        </div>

        <div id={widgetId} className={styles.widget} hidden={!open}>
          <div className={styles.widgetHead}>
            <span className={styles.widgetMark}>
              <AssistantMark size={18} />
            </span>
            <p className={styles.widgetName}>{shownName}</p>
          </div>
          <div className={styles.widgetBody}>
            {shownGreeting ? (
              <p className={styles.bubble}>
                <span className="visually-hidden">Welcome message: </span>
                {shownGreeting}
              </p>
            ) : null}
          </div>
          <div className={styles.widgetInput} aria-hidden="true">
            <span>Type your question…</span>
            <span className={styles.widgetSend} data-on={on}>
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" focusable="false">
                <path
                  d="M10 15.5v-11M5.5 9 10 4.5 14.5 9"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        <button
          type="button"
          className={styles.launcher}
          data-on={on}
          aria-expanded={open}
          aria-controls={widgetId}
          onClick={onToggle}
        >
          <span className="visually-hidden">Widget preview</span>
          {open ? (
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true" focusable="false">
              <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            <AssistantMark size={22} />
          )}
        </button>
      </div>
    </section>
  );
}

/*
 * Whichever of the product's light paper (--color-on-moss) or charcoal (--color-text)
 * contrasts more with the owner's colour, so icons on it stay readable whatever they
 * pick. The two hex values mirror those tokens; the CSS uses the tokens themselves.
 */
const LIGHT_LUMINANCE = luminance('#fcfbf8');
const DARK_LUMINANCE = luminance('#23211e');

function readableOn(hex: string): 'light' | 'dark' {
  const value = luminance(hex);
  return contrast(value, LIGHT_LUMINANCE) >= contrast(value, DARK_LUMINANCE) ? 'light' : 'dark';
}

function luminance(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16);
  return 0.2126 * linear((n >> 16) & 255) + 0.7152 * linear((n >> 8) & 255) + 0.0722 * linear(n & 255);
}

function linear(channel: number) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function contrast(a: number, b: number) {
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
