import type { Metadata } from 'next';

import { AssistantMark } from '@/components/AssistantMark';
import { Container } from '@/components/Container';

import { EnquiryForm } from './EnquiryForm';
import styles from './enquiries.module.css';

export const metadata: Metadata = { title: 'Where should enquiries go?' };

/**
 * Onboarding step 4: Enquiry destination (WIREFRAMES.md, "Step 4 - Enquiry Destination").
 * One destination, one email, one decision. Enquiries reach the owner where they already
 * work, so they never have to watch this product for new ones (PRODUCT.md section 12).
 *
 * DEVELOPMENT / INTERACTION VALIDATION STATE ONLY.
 * There is no enquiry backend, email delivery or persistence. The form only checks the
 * address in React state (see EnquiryForm). No screen links here yet and Continue does
 * not navigate, because the steps around it are not real. No test email is offered:
 * with nothing to send it, the action would be misleading.
 */
export default function EnquiriesPage() {
  return (
    <Container>
      <div className={styles.intro}>
        <span className={styles.mark}>
          <AssistantMark size={20} />
        </span>
        <h1 className={styles.title}>Where should we send customer enquiries?</h1>
        <p className={styles.lede}>
          When someone wants to book, request a quote, or needs personal help, your assistant
          will collect the important details and send them here.
        </p>
      </div>

      <EnquiryForm />
    </Container>
  );
}
