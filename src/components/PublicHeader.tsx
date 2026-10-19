import Link from 'next/link';

import { PRODUCT_NAME } from '@/lib/brand';

import { AssistantMark } from './AssistantMark';
import { ButtonLink } from './Button';
import { Container } from './Container';
import { NavLink } from './NavLink';
import styles from './PublicHeader.module.css';

/**
 * Public header: brand, one way to learn more, one way in, one way to start.
 * No product navigation, menus or dropdowns. On phones only the brand and "Log in"
 * remain; the hero carries the primary call to action there.
 */
export function PublicHeader() {
  return (
    <header className={styles.header}>
      <Container size="wide" className={styles.bar}>
        <Link href="/" className={styles.brand}>
          <AssistantMark size={24} />
          <span className={styles.wordmark}>{PRODUCT_NAME}</span>
        </Link>

        <nav aria-label="Main" className={styles.nav}>
          <Link href="/#how-it-works" className={`${styles.link} ${styles.roomy}`}>
            How it works
          </Link>
          <NavLink href="/login" className={styles.link}>
            Log in
          </NavLink>
          <ButtonLink href="/signup" className={`${styles.cta} ${styles.roomy}`}>
            Build my assistant
          </ButtonLink>
        </nav>
      </Container>
    </header>
  );
}
