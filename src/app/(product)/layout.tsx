import type { Metadata } from 'next';

import { ProductHeader } from '@/components/ProductHeader';
import { demoOwner } from '@/lib/demo';

import styles from './layout.module.css';

// The owner's private product, so it stays out of search results.
export const metadata: Metadata = {
  description: 'Your website assistant: what it handled and anything that needs you.',
  robots: { index: false, follow: false },
};

// Post-onboarding shell: lightweight top navigation, one comfortable column below.
// Auth is not built yet, so the owner shown here is demo data.
export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductHeader ownerInitial={demoOwner.firstName.charAt(0)} />
      <main id="main" tabIndex={-1} className={styles.main}>
        {children}
      </main>
    </>
  );
}
