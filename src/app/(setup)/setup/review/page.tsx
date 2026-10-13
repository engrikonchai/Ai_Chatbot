import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { demoReview } from '@/lib/demo';

import { ReviewList } from './ReviewList';
import styles from './review.module.css';

export const metadata: Metadata = { title: 'Just a few things to check' };

/**
 * Onboarding step 3: Review important information (WIREFRAMES.md, "Step 3 - Review
 * Important Information"). The assistant asks its owner a few questions; it never dumps
 * everything it read. The intro is rendered by ReviewList because its supporting copy
 * changes once every question is answered.
 *
 * DEVELOPMENT / INTERACTION VALIDATION STATE ONLY.
 * There is no knowledge system. The questions come from `demoReview`, a fixed
 * representative set, and answering them only changes React state in this tab (see
 * ReviewList). Nothing is saved or sent, and a refresh starts over. No screen links here
 * yet and there is no Continue action, because the steps around it are not real. The
 * product copy is deliberately free of developer notes.
 */
export default function ReviewPage() {
  return (
    <Container>
      <div className={styles.content}>
        <ReviewList items={demoReview.items} />
      </div>
    </Container>
  );
}
