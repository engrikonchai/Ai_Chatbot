import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { OnboardingIntro } from '@/components/OnboardingIntro';

import { WidgetSetup } from './WidgetSetup';

export const metadata: Metadata = { title: 'Make it yours' };

/**
 * Onboarding step 6: Widget setup (WIREFRAMES.md, "Step 6 - Widget Setup"). Answers one
 * question, "What will my customers see?", with a preview and four basics. Strong
 * defaults: the owner can continue without changing anything.
 *
 * DEVELOPMENT / INTERACTION VALIDATION STATE ONLY.
 * The preview is drawn by this page; it is not the embeddable widget, which does not
 * exist yet. Appearance lives in React state only (see WidgetSetup): nothing is saved
 * or sent, and a refresh restores the defaults in `demoWidget`.
 */
export default function WidgetSetupPage() {
  return (
    <Container size="split">
      <OnboardingIntro
        title="Make it yours."
        lede="This is what visitors will see on your website. Adjust a few basics before you install it."
      />

      <WidgetSetup />
    </Container>
  );
}
