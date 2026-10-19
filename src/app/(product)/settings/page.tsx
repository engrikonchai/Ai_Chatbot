import type { Metadata } from 'next';

import { Button } from '@/components/Button';
import { Placeholder } from '@/components/Placeholder';
import { logOut } from '@/lib/auth/actions';
import { getCurrentUser } from '@/lib/auth/session';

import styles from './settings.module.css';

export const metadata: Metadata = { title: 'Settings' };

/**
 * Settings is still a placeholder (SCREENS.md section 19 is not designed yet). The one
 * thing that has to work now is leaving: who is signed in, and a real Log out.
 */
export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <Placeholder title="Settings">
      {user ? (
        <section aria-labelledby="account-heading" className={styles.account}>
          <h2 id="account-heading" className={styles.label}>
            Account
          </h2>
          {user.email ? <p className={styles.email}>Signed in as {user.email}</p> : null}
          <form action={logOut}>
            <Button type="submit" variant="secondary">
              Log out
            </Button>
          </form>
        </section>
      ) : null}
    </Placeholder>
  );
}
