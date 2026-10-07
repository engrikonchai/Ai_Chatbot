import { PRODUCT_NAME } from '@/lib/brand';

import { Container } from './Container';
import styles from './OnboardingHeader.module.css';

/**
 * Setup header (DESIGN.md section 17): wordmark as text only, current task, quiet progress.
 * The assistant-presence mark lives in the page content, not here, so it is never duplicated.
 * Deliberately no product navigation. Not used by any route until Milestone 2.
 */
export function OnboardingHeader({ step, total }: { step?: number; total?: number }) {
  const hasProgress = step !== undefined && total !== undefined;
  return (
    <header className={styles.header}>
      <Container size="wide" className={styles.bar}>
        <span className={styles.wordmark}>{PRODUCT_NAME}</span>
        {hasProgress ? (
          <p className={styles.progress}>
            <span>
              Step {step} of {total}
            </span>
            <span className={styles.track} aria-hidden="true">
              <span className={styles.fill} style={{ width: `${(step / total) * 100}%` }} />
            </span>
          </p>
        ) : null}
      </Container>
    </header>
  );
}
