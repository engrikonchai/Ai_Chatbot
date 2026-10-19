import type { Metadata } from 'next';

import { OnboardingHeader } from '@/components/OnboardingHeader';

import styles from './layout.module.css';

// Setup screens belong to a signed-in owner, so they stay out of search results.
export const metadata: Metadata = {
  description: 'Set up your website assistant.',
  robots: { index: false, follow: false },
};

// Onboarding shell: brand and one focused task. Deliberately no product navigation
// (Home / Assistant / Website / profile) until setup is finished (DESIGN.md section 17).
// Progress is omitted for now: the docs list nine steps but show a "of 7" indicator.
export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OnboardingHeader />
      <main id="main" tabIndex={-1} className={styles.main}>
        {children}
      </main>
    </>
  );
}
