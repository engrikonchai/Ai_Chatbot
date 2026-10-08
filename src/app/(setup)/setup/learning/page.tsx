import type { Metadata } from 'next';

import { AssistantMark } from '@/components/AssistantMark';
import { Container } from '@/components/Container';
import { demoLearning } from '@/lib/demo';

import { LearningSteps } from './LearningSteps';
import styles from './learning.module.css';

export const metadata: Metadata = { title: 'Learning about your business' };

/**
 * Onboarding step 2: Learning from website (WIREFRAMES.md, "Step 2 - Website Analysis").
 *
 * DEVELOPMENT / VISUAL VALIDATION STATE ONLY.
 * There is no scanning backend yet. This page renders one fixed, representative
 * in-progress state from `demoLearning`. Nothing advances it: no timers, no polling,
 * no navigation into or out of it, and /setup does not link here. Do not add any of
 * those until real progress exists (DESIGN.md section 26: the UI must not invent
 * backend behaviour). The product copy below is deliberately free of developer notes.
 */
export default function LearningPage() {
  return (
    <Container>
      <div className={styles.intro}>
        <span className={styles.mark}>
          <AssistantMark size={20} />
        </span>
        <h1 className={styles.title}>Learning about your business...</h1>
        <p className={styles.lede}>
          This usually only takes a moment. You can leave this page while we work.
        </p>
      </div>

      <LearningSteps steps={demoLearning.steps} />

      <p className={styles.site}>{demoLearning.site}</p>
    </Container>
  );
}
