import { ProductHeader } from '@/components/ProductHeader';
import { demoOwner } from '@/lib/demo';

import styles from './layout.module.css';

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
