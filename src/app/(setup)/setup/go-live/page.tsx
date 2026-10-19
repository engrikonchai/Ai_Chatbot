import type { Metadata } from 'next';

import { AssistantMark } from '@/components/AssistantMark';
import { ButtonLink } from '@/components/Button';
import { Container } from '@/components/Container';

import styles from './go-live.module.css';

export const metadata: Metadata = { title: 'Your assistant is ready' };

/**
 * Onboarding step 9: Go live (WIREFRAMES.md, "Step 9 - Go Live"). The calm end of
 * setup: one statement, one sentence, one way on. No confetti, no tour.
 *
 * DEVELOPMENT / VALIDATION STATE.
 * Nothing is installed or live yet, so this page says "ready", not "live", and
 * promises nothing that depends on installation. "Go to Home" genuinely navigates.
 *
 * Intended copy once installation is verified for real (SCREENS.md section 13):
 *   Your assistant is live.
 *   It can now answer visitors, collect enquiries, and ask for your help when it
 *   genuinely needs it.
 * Switch to it only when a real installation check has found the widget.
 */
export default function GoLivePage() {
  return (
    <Container>
      <div className={styles.intro}>
        <span className={styles.mark}>
          <AssistantMark size={28} />
        </span>
        <h1 className={styles.title}>Your assistant is ready.</h1>
        <p className={styles.lede}>
          You’ve finished the setup. Once installation is connected, your assistant will be ready to
          help visitors and collect enquiries.
        </p>
      </div>

      <div className={styles.actions}>
        <ButtonLink href="/home">Go to Home</ButtonLink>
      </div>
    </Container>
  );
}
