import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { OnboardingIntro } from '@/components/OnboardingIntro';

import { AddWebsiteForm } from './AddWebsiteForm';

export const metadata: Metadata = { title: 'Add your website' };

/**
 * Onboarding step 1: Add website (WIREFRAMES.md, "Step 1 - Add Website").
 * The smallest possible first action: one field, one primary action.
 */
export default function AddWebsitePage() {
  return (
    <Container>
      <OnboardingIntro
        title="Let’s build your assistant."
        lede="Start with your website. We’ll learn the basics about your business automatically."
      />

      <AddWebsiteForm />
    </Container>
  );
}
