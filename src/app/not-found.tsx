import type { Metadata } from 'next';

import { ButtonLink } from '@/components/Button';
import { Container } from '@/components/Container';
import { PublicHeader } from '@/components/PublicHeader';

import styles from './not-found.module.css';

export const metadata: Metadata = { title: 'Page not found' };

/** Any unknown address: say so calmly and offer one way back. No error codes. */
export default function NotFound() {
  return (
    <>
      <PublicHeader />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Container>
          <h1 className={styles.title}>This page isn’t here.</h1>
          <p className={styles.lede}>The link may be out of date, or the address may have a typo.</p>
          <ButtonLink href="/">Go to the homepage</ButtonLink>
        </Container>
      </main>
    </>
  );
}
