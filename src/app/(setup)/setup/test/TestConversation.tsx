'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Textarea } from '@/components/Field';
import { demoTest } from '@/lib/demo';

import { correct, initialKnowledge, reply, teach } from './demo-answers';
import styles from './TestConversation.module.css';

/*
 * UX VALIDATION ONLY, until the real answer engine exists.
 *
 * The conversation and everything the owner corrects or teaches live in React state in
 * this component and nowhere else: no requests, no storage, no cookies. Replies come
 * synchronously from the local lookup in `demo-answers`, so they appear immediately:
 * there is no typing indicator, delay or streaming, because nothing is being generated.
 * A refresh restores the original demo knowledge and an empty conversation.
 */

type Message =
  | { id: number; from: 'owner'; text: string }
  | { id: number; from: 'assistant'; kind: 'answer'; topic: string; text: string }
  | { id: number; from: 'assistant'; kind: 'unknown'; question: string };

const UNKNOWN = 'I don’t know that yet.';
const EMPTY_ANSWER = 'Write what your assistant should say.';

export function TestConversation() {
  const [knowledge, setKnowledge] = useState(initialKnowledge);
  const [messages, setMessages] = useState<readonly Message[]>([]);
  const [draft, setDraft] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [ready, setReady] = useState(false);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  function ask(raw: string) {
    const question = raw.trim();
    if (!question) return;
    const result = reply(knowledge, question);
    const id = nextId.current;
    nextId.current += 2;
    const answer: Message =
      result.kind === 'answer'
        ? { id: id + 1, from: 'assistant', kind: 'answer', topic: result.topic, text: result.text }
        : { id: id + 1, from: 'assistant', kind: 'unknown', question };
    setMessages((current) => [...current, { id, from: 'owner', text: question }, answer]);
    // Announce only the reply (the owner knows what they asked). The trailing character
    // alternates so the same reply twice in a row is still read out.
    const spoken = result.kind === 'answer' ? result.text : `${UNKNOWN} You can teach it below.`;
    setAnnouncement((previous) => `Assistant: ${spoken}${previous.endsWith(' ') ? '' : ' '}`);
  }

  function handleSend(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    ask(draft);
    setDraft('');
    // Send disables itself once the field is empty, so keep focus in the field.
    inputRef.current?.focus();
  }

  return (
    <div className={styles.content}>
      <section className={styles.surface} aria-label="Test conversation">
        <p className={styles.mode}>
          <span className={styles.modeName}>Test mode</span>
          <span>Only you can see this.</span>
        </p>

        <ol className={styles.messages} role="list">
          <li className={styles.assistant}>
            <p className={styles.assistantText}>
              <span className="visually-hidden">Assistant: </span>
              {demoTest.greeting}
            </p>
          </li>

          {messages.map((message) =>
            message.from === 'owner' ? (
              <li key={message.id} className={styles.owner}>
                <p className={styles.ownerText}>
                  <span className="visually-hidden">You: </span>
                  {message.text}
                </p>
              </li>
            ) : (
              <li key={message.id} className={styles.assistant}>
                {message.kind === 'answer' ? (
                  <Answer
                    text={message.text}
                    onCorrect={(text) => setKnowledge((k) => correct(k, message.topic, text))}
                  />
                ) : (
                  <Unknown
                    question={message.question}
                    onTeach={(text) => setKnowledge((k) => teach(k, message.question, text))}
                  />
                )}
              </li>
            ),
          )}
        </ol>

        <div className={styles.composer}>
          {/*
           * Suggestions help the owner start, then get out of the way: once the first
           * question is sent they are gone and only the input remains. Clicking one removes
           * the button that had focus, so focus moves to the input instead of the page.
           */}
          {messages.length === 0 ? (
            <div className={styles.suggestions} role="group" aria-label="Suggested questions">
              {demoTest.suggestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className={styles.suggestion}
                  onClick={() => {
                    ask(question);
                    inputRef.current?.focus();
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          ) : null}

          <form className={styles.send} onSubmit={handleSend} noValidate>
            <label htmlFor={inputId} className="visually-hidden">
              Ask your assistant
            </label>
            <input
              ref={inputRef}
              id={inputId}
              className={styles.input}
              type="text"
              name="question"
              autoComplete="off"
              placeholder="Ask your assistant…"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            {/* Blank or whitespace-only questions are never sent: Send stays disabled. */}
            <Button type="submit" disabled={!draft.trim()}>
              Send
            </Button>
          </form>
        </div>
      </section>

      <p role="status" className="visually-hidden">
        {announcement}
      </p>

      <div className={styles.finish}>
        {/*
         * TEMPORARY: "Looks good" only shows a local status. It does not navigate, save
         * or send anything. Widget Setup exists, but the move to it is deliberately
         * deferred until onboarding state and taught knowledge can persist; until then
         * leaving would silently drop the owner's corrections.
         */}
        <Button onClick={() => setReady(true)}>Looks good</Button>
        <div role="status" className={styles.ready}>
          {ready ? <p>Ready for the next step.</p> : null}
        </div>
      </div>
    </div>
  );
}

/** A normal answer with the quiet "Not correct?" path to fix it inline. */
function Answer({ text, onCorrect }: { text: string; onCorrect: (text: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();
  const [updated, setUpdated] = useState<string>();
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const returnFocus = useRef(false);
  const answerId = useId();

  // Opening the editor focuses the field; Cancel returns focus to "Not correct?";
  // updating moves focus to the "Updated." line, which replaces the controls.
  useEffect(() => {
    if (updated !== undefined) doneRef.current?.focus();
    else if (editing) fieldRef.current?.focus();
    else if (returnFocus.current) {
      returnFocus.current = false;
      toggleRef.current?.focus();
    }
  }, [editing, updated]);

  function cancel() {
    setValue('');
    setError(undefined);
    returnFocus.current = true;
    setEditing(false);
  }

  function handleUpdate(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const correction = value.trim();
    if (!correction) {
      setError(EMPTY_ANSWER);
      fieldRef.current?.focus();
      return;
    }
    onCorrect(correction);
    setEditing(false);
    setUpdated(correction);
  }

  return (
    <>
      <p id={answerId} className={styles.assistantText}>
        <span className="visually-hidden">Assistant: </span>
        {text}
      </p>

      {updated !== undefined ? (
        <Done ref={doneRef} label="Updated." detail={`From now on in this test it will say: ${updated}`} />
      ) : editing ? (
        <form className={styles.fix} onSubmit={handleUpdate} noValidate>
          <Textarea
            ref={fieldRef}
            label="What should your assistant know instead?"
            name="correction"
            rows={2}
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
          <div className={styles.fixActions}>
            <Button type="submit">Update assistant</Button>
            <Button variant="quiet" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <button
          ref={toggleRef}
          type="button"
          className={styles.notCorrect}
          aria-describedby={answerId}
          onClick={() => setEditing(true)}
        >
          Not correct?
        </button>
      )}
    </>
  );
}

/** The assistant admits it doesn't know, and the owner can teach it on the spot. */
function Unknown({ question, onTeach }: { question: string; onTeach: (text: string) => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();
  const [taught, setTaught] = useState(false);
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (taught) doneRef.current?.focus();
  }, [taught]);

  function handleTeach(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const answer = value.trim();
    if (!answer) {
      setError(EMPTY_ANSWER);
      fieldRef.current?.focus();
      return;
    }
    onTeach(answer);
    setTaught(true);
  }

  return (
    <>
      <p className={styles.assistantText}>
        <span className="visually-hidden">Assistant: </span>
        {UNKNOWN}
      </p>

      {taught ? (
        <Done ref={doneRef} label="Got it." detail={`Ask “${question}” again to see the new answer.`} />
      ) : (
        <form className={styles.fix} onSubmit={handleTeach} noValidate>
          <Textarea
            ref={fieldRef}
            label="Teach your assistant"
            hint={`Someone asked: “${question}”`}
            name="teach"
            rows={2}
            value={value}
            error={error}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError(undefined);
            }}
          />
          <div className={styles.fixActions}>
            <Button type="submit">Teach assistant</Button>
          </div>
        </form>
      )}
    </>
  );
}

/** The small settled line. The check is a shape; the words carry the meaning. */
function Done({
  ref,
  label,
  detail,
}: {
  ref: React.Ref<HTMLParagraphElement>;
  label: string;
  detail: string;
}) {
  return (
    <p ref={ref} tabIndex={-1} className={styles.done}>
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
      <span>
        {label}
        <span className="visually-hidden"> {detail}</span>
      </span>
    </p>
  );
}
