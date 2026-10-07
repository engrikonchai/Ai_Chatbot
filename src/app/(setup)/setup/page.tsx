import type { Metadata } from 'next';

import { AssistantMark } from '@/components/AssistantMark';
import { Container } from '@/components/Container';

import { AddWebsiteForm } from './AddWebsiteForm';
import styles from './setup.module.css';

export const metadata: Metadata = { title: 'Add your website' };

/**
 * Onboarding step 1: Add website (WIREFRAMES.md, "Step 1 - Add Website").
 * The smallest possible first action: one field, one primary action.
 */
export default function AddWebsitePage() {
  return (
    <Container>
      <div className={styles.intro}>
        <span className={styles.mark}>
          <AssistantMark size={20} />
        </span>
        <h1 className={styles.title}>Let’s build your assistant.</h1>
        <p className={styles.lede}>
          Start with your website. We’ll learn the basics about your business automatically.
        </p>
      </div>

      <AddWebsiteForm />
    </Container>
  );
}
