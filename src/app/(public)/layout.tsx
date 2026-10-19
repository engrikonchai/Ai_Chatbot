import Link from 'next/link';

import { Container } from '@/components/Container';
import { PublicHeader } from '@/components/PublicHeader';
import { PRODUCT_NAME } from '@/lib/brand';

import styles from './layout.module.css';

// Public shell: the website people see before they have an account. A quiet header,
// the page, and a minimal footer. No legal links until real pages exist.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main id="main" tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <Container size="wide" className={styles.footerBar}>
          <span className={styles.footerName}>{PRODUCT_NAME}</span>
          <Link href="/login" className={styles.footerLink}>
            Log in
          </Link>
        </Container>
      </footer>
    </>
  );
}
