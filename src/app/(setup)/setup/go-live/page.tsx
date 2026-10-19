import type { Metadata } from 'next';

import { ButtonLink } from '@/components/Button';
import { Container } from '@/components/Container';
import { OnboardingIntro } from '@/components/OnboardingIntro';

import styles from './go-live.module.css';

export const metadata: Metadata = { title: 'Your assistant is ready' };

/**
 * Onboarding step 9: Go live (WIREFRAMES.md, "Step 9 - Go Live"). The calm end of
 * setup: one statement, one sentence, one way on. No confetti, no tour.
 *
 * DEVELOPMENT / VALIDATION STATE.
 * Nothing is installed or live yet, so this page says "ready", not "live", and
 * promises nothing that depends on installation. It is reached in the real flow from
 * Installation ("I'll install it later") but does NOT set onboarding_completed_at:
 * analysis, review and test are not real yet, so setup is not genuinely complete.
 * "Go to Home" navigates for real; Home sends owners back to setup until completion.
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
      <OnboardingIntro
        title="Your assistant is ready."
        markSize={28}
        lede="You’ve finished the setup. Once installation is connected, your assistant will be ready to help visitors and collect enquiries."
      />

      <div className={styles.actions}>
        <ButtonLink href="/home">Go to Home</ButtonLink>
      </div>
    </Container>
  );
}
