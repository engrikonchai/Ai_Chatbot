import styles from './StatusLine.module.css';

type StatusTone = 'live' | 'attention' | 'idle';

/**
 * Human status: a quiet dot plus words. The words carry the meaning; the dot is
 * decoration, so status never depends on colour alone.
 * live = moss, attention = ochre (assistant needs help), idle = muted.
 */
export function StatusLine({
  tone = 'live',
  children,
}: {
  tone?: StatusTone;
  children: React.ReactNode;
}) {
  return (
    <p className={styles.status}>
      <span className={`${styles.dot} ${styles[tone]}`} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
