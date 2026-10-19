import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { OnboardingIntro } from '@/components/OnboardingIntro';

import { TestConversation } from './TestConversation';

export const metadata: Metadata = { title: 'Meet your assistant' };

/**
 * Onboarding step 5: Test assistant (WIREFRAMES.md, "Step 5 - Test Assistant"). The owner
 * plays a customer and sees their assistant already understands the business; a wrong
 * or missing answer is fixed right here, inline.
 *
 * DEVELOPMENT / INTERACTION VALIDATION STATE ONLY.
 * There is no answer engine. Replies come from a fixed local lookup over `demoTest`
 * (see demo-answers), and corrections or teaching only change React state in this tab
 * (see TestConversation). Nothing is generated, saved or sent, and a refresh starts
 * over. No screen links here yet, and "Looks good" does not navigate.
 */
export default function TestAssistantPage() {
  return (
    <Container>
      <OnboardingIntro
        title="Meet your assistant."
        lede="Ask it anything a customer might ask."
      />

      <TestConversation />
    </Container>
  );
}
