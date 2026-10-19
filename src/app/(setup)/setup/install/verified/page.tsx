import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { OnboardingIntro } from '@/components/OnboardingIntro';
import { demoInstall } from '@/lib/demo';

import styles from './verified.module.css';

export const metadata: Metadata = { title: 'Your assistant is installed' };

const CHECKS = ['Widget detected', 'Assistant ready'] as const;

/**
 * STATIC REPRESENTATIVE SUCCESS SCREEN. VISUAL VALIDATION ONLY.
 *
 * This is the design for the moment installation checking finds the widget
 * (SCREENS.md section 12, "Success State"). It is NOT the result of any detection:
 * no website was checked, nothing was found, and every word below is fixed. Nothing
 * links or navigates here, and "Check installation" on /setup/install must never lead
 * here until a real check exists. It is reachable only by typing the URL, for review.
 */
export default function InstallVerifiedPage() {
  return (
    <Container>
      <OnboardingIntro
        title="Your assistant is installed."
        lede={<>It’s on {demoInstall.site} and ready for your visitors.</>}
      />

      <ul className={styles.checks}>
        {CHECKS.map((label) => (
          <li key={label} className={styles.check}>
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              width="18"
              height="18"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4.5 10.5 8 14l7.5-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {label}
          </li>
        ))}
      </ul>
    </Container>
  );
}
