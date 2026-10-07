import Link from 'next/link';

import { PRODUCT_NAME } from '@/lib/brand';

import { AssistantMark } from './AssistantMark';
import { Container } from './Container';
import { NavLink } from './NavLink';
import styles from './ProductHeader.module.css';

const PRIMARY_NAV = [
  { href: '/home', label: 'Home' },
  { href: '/assistant', label: 'Assistant' },
  { href: '/website', label: 'Website' },
] as const;

/**
 * Post-onboarding navigation: a lightweight top bar with exactly three product
 * areas. Settings is reached through the profile control. No sidebar, no tab bar.
 * A fourth item needs product justification (SCREENS.md section 20).
 */
export function ProductHeader({ ownerInitial }: { ownerInitial: string }) {
  return (
    <header className={styles.header}>
      <Container size="wide" className={styles.bar}>
        <Link href="/home" className={styles.brand} aria-label={`${PRODUCT_NAME}, home`}>
          <AssistantMark size={26} />
          <span className={styles.wordmark}>{PRODUCT_NAME}</span>
        </Link>

        <nav aria-label="Main" className={styles.nav}>
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink href="/settings" className={styles.profile} aria-label="Account and settings">
          <span aria-hidden="true">{ownerInitial}</span>
        </NavLink>
      </Container>
    </header>
  );
}
