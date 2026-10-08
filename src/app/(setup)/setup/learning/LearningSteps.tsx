import styles from './LearningSteps.module.css';

export type StepState = 'done' | 'current' | 'pending';
export type LearningStep = { readonly label: string; readonly state: StepState };

// Spoken to screen readers only. Sighted owners get three different shapes instead.
const STATE_TEXT: Record<StepState, string> = {
  done: 'Done',
  current: 'In progress',
  pending: 'Not started yet',
};

function Marker({ state }: { state: StepState }) {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {state === 'done' ? (
        <path
          className={styles.check}
          d="M4.5 10.5 8 14l7.5-8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
      {state === 'current' ? (
        <>
          <circle className={styles.halo} cx="10" cy="10" r="9" />
          <circle className={styles.dot} cx="10" cy="10" r="4.5" />
        </>
      ) : null}
      {state === 'pending' ? (
        <circle className={styles.ring} cx="10" cy="10" r="7" strokeWidth="1.5" />
      ) : null}
    </svg>
  );
}

/**
 * A plain sequence of human-language steps: done, current, pending.
 *
 * Each state differs by shape (check, filled dot, hollow ring) and weight, not
 * colour alone, and the state is also spoken ("Done: ...") for screen readers.
 * Deliberately static and unanimated: nothing here may suggest live work. When real
 * progress exists, animate the current step and announce changes through a
 * role="status" region, honouring prefers-reduced-motion.
 */
export function LearningSteps({ steps }: { steps: readonly LearningStep[] }) {
  return (
    // role="list" because list-style: none removes list semantics in some browsers.
    <ol className={styles.list} role="list" aria-label="Progress">
      {steps.map((step) => (
        <li
          key={step.label}
          className={`${styles.item} ${styles[step.state]}`}
          aria-current={step.state === 'current' ? 'step' : undefined}
        >
          <span className={styles.marker}>
            <Marker state={step.state} />
          </span>
          <span>
            <span className="visually-hidden">{STATE_TEXT[step.state]}: </span>
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
}
