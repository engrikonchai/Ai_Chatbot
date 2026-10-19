import type { Metadata } from 'next';

import { ProductHeader } from '@/components/ProductHeader';
import { requireUser } from '@/lib/auth/session';
import { requireBusiness } from '@/lib/data/business';
import { getCurrentProfile } from '@/lib/data/profile';

import styles from './layout.module.css';

// The owner's private product, so it stays out of search results.
export const metadata: Metadata = {
  description: 'Your website assistant: what it handled and anything that needs you.',
  robots: { index: false, follow: false },
};

// Post-onboarding shell: lightweight top navigation, one comfortable column below.
// Owner-only: redirects to Log in without a session (server-side, in addition to the
// proxy) and makes sure the owner's business exists. The profile initial is real.
export default async function ProductLayout({ children }: { children: React.ReactNode }) {
  const [user, profile] = await Promise.all([requireUser(), getCurrentProfile(), requireBusiness()]);
  const initial = (profile?.name || user.email || '?').trim().charAt(0).toUpperCase() || '?';

  return (
    <>
      <ProductHeader ownerInitial={initial} />
      <main id="main" tabIndex={-1} className={styles.main}>
        {children}
      </main>
    </>
  );
}
