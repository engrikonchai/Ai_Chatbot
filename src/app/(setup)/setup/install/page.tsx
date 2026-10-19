import type { Metadata } from 'next';

import { AssistantMark } from '@/components/AssistantMark';
import { Container } from '@/components/Container';

import { Installation } from './Installation';
import styles from './install.module.css';

export const metadata: Metadata = { title: 'Add your assistant to your website' };

/**
 * Onboarding step 7: Install (WIREFRAMES.md, "Step 7 - Install" and "Step 8 - Verify").
 * One snippet, three short steps, one check. The owner should think "That's it?".
 *
 * DEVELOPMENT / INTERACTION VALIDATION STATE ONLY.
 * The snippet is REPRESENTATIVE (see `demoInstall`): there is no embeddable script, so
 * pasting it installs nothing. "Copy code" really copies it. "Check installation" is
 * not connected to any detection and says so; it never reports success. The eventual
 * success design lives, unlinked, at /setup/install/verified.
 */
export default function InstallPage() {
  return (
    <Container>
      <div className={styles.intro}>
        <span className={styles.mark}>
          <AssistantMark size={20} />
        </span>
        <h1 className={styles.title}>Add your assistant to your website.</h1>
        <p className={styles.lede}>
          Paste one small piece of code into your website and your assistant will appear there.
        </p>
      </div>

      <Installation />
    </Container>
  );
}
