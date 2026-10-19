import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { OnboardingIntro } from '@/components/OnboardingIntro';
import { requireUser } from '@/lib/auth/session';
import { requireBusiness } from '@/lib/data/business';

import { EnquiryForm } from './EnquiryForm';

export const metadata: Metadata = { title: 'Where should enquiries go?' };

/**
 * Onboarding step 4: Enquiry destination (WIREFRAMES.md, "Step 4 - Enquiry Destination").
 * One destination, one email, one decision. Enquiries reach the owner where they already
 * work, so they never have to watch this product for new ones (PRODUCT.md section 12).
 *
 * The address is saved to the owner's business (see EnquiryForm and ../actions), and
 * only then does Continue move on to Test Assistant. Nothing is emailed to it yet: no
 * test email is offered, because with nothing to send it the action would mislead.
 * Prefilled with the saved address, or the account email as the wireframe suggests.
 */
export default async function EnquiriesPage() {
  const [user, business] = await Promise.all([requireUser(), requireBusiness()]);

  return (
    <Container>
      <OnboardingIntro
        title="Where should we send customer enquiries?"
        lede="When someone wants to book, request a quote, or needs personal help, your assistant will collect the important details and send them here."
      />

      <EnquiryForm initialEmail={business.enquiry_email ?? user.email ?? ''} />
    </Container>
  );
}
