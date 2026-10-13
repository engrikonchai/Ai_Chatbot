import type { Metadata } from 'next';

import { AssistantMark } from '@/components/AssistantMark';
import { Container } from '@/components/Container';
import { demoReview } from '@/lib/demo';

import { ReviewList } from './ReviewList';
import styles from './review.module.css';

export const metadata: Metadata = { title: 'Just a few things to check' };

/**
 * Onboarding step 3: Review important information (WIREFRAMES.md, "Step 3 - Review
 * Important Information"). The assistant asks its owner a few questions; it never dumps
 * everything it read.
 *
 * DEVELOPMENT / INTERACTION VALIDATION STATE ONLY.
 * There is no knowledge system. The questions come from `demoReview`, a fixed
 * representative set, and answering them only changes React state in this tab (see
 * ReviewList). Nothing is saved or sent, and a refresh starts over. No screen links here
 * yet and there is no Continue action, because the steps around it are not real. The
 * product copy below is deliberately free of developer notes.
 */
export default function ReviewPage() {
  return (
    <Container>
      <div className={styles.content}>
        <div className={styles.intro}>
          <span className={styles.mark}>
            <AssistantMark size={20} />
          </span>
          <h1 className={styles.title}>Just a few things to check.</h1>
          <p className={styles.lede}>
            I understood most of your business. I just need your help with a few details.
          </p>
        </div>

        <ReviewList items={demoReview.items} />
      </div>
    </Container>
  );
}
