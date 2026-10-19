import type { Metadata } from 'next';

import { AssistantMark } from '@/components/AssistantMark';
import { Container } from '@/components/Container';

import { WidgetSetup } from './WidgetSetup';
import styles from './widget.module.css';

export const metadata: Metadata = { title: 'Make it yours' };

/**
 * Onboarding step 6: Widget setup (WIREFRAMES.md, "Step 6 - Widget Setup"). Answers one
 * question, "What will my customers see?", with a preview and four basics. Strong
 * defaults: the owner can continue without changing anything.
 *
 * DEVELOPMENT / INTERACTION VALIDATION STATE ONLY.
 * The preview is drawn by this page; it is not the embeddable widget, which does not
 * exist yet. Appearance lives in React state only (see WidgetSetup): nothing is saved
 * or sent, and a refresh restores the defaults in `demoWidget`.
 */
export default function WidgetSetupPage() {
  return (
    <Container size="split">
      <div className={styles.intro}>
        <span className={styles.mark}>
          <AssistantMark size={20} />
        </span>
        <h1 className={styles.title}>Make it yours.</h1>
        <p className={styles.lede}>
          This is what visitors will see on your website. Adjust a few basics before you install
          it.
        </p>
      </div>

      <WidgetSetup />
    </Container>
  );
}
