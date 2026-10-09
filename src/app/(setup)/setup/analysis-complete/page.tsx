import type { Metadata } from 'next';

import { AssistantMark } from '@/components/AssistantMark';
import { Container } from '@/components/Container';
import { demoAnalysisComplete } from '@/lib/demo';

import { ReviewAction } from './ReviewAction';
import styles from './analysis-complete.module.css';

export const metadata: Metadata = { title: 'I learned the basics' };

function needsHelpLine(count: number) {
  return count === 1 ? '1 thing needs your help.' : `${count} things need your help.`;
}

/**
 * Onboarding step 3: Analysis complete (WIREFRAMES.md, "Analysis Success").
 *
 * DEVELOPMENT / VISUAL VALIDATION STATE ONLY.
 * There is no scanning backend. Everything here comes from `demoAnalysisComplete`, a
 * fixed representative state: it is not the result of any scan, nothing generates it,
 * and no screen links to or from it (neither /setup nor /setup/learning leads here).
 * Do not add timers, requests, or automatic navigation until real analysis exists
 * (DESIGN.md section 26: the UI must not invent backend behaviour). The product copy
 * below is deliberately free of developer notes.
 */
export default function AnalysisCompletePage() {
  const { learned, needsHelpCount } = demoAnalysisComplete;

  return (
    <Container>
      <div className={styles.content}>
        <div className={styles.intro}>
          <span className={styles.mark}>
            <AssistantMark size={20} />
          </span>
          <h1 className={styles.title}>I learned the basics.</h1>
          <p className={styles.lede}>
            I found the important information about your business. There are just a few things I’d
            like you to check.
          </p>
        </div>

        <section aria-labelledby="learned-heading">
          <h2 id="learned-heading" className="visually-hidden">
            What I learned
          </h2>
          <dl className={styles.learned}>
            {learned.map((item) => (
              <div key={item.name} className={styles.item}>
                <dt className={styles.name}>{item.name}</dt>
                <dd className={styles.detail}>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="help-heading" className={styles.help}>
          <h2 id="help-heading" className={styles.helpTitle}>
            {needsHelpLine(needsHelpCount)}
          </h2>
          <p className={styles.helpLede}>These are the details I couldn’t confirm confidently.</p>
          <ReviewAction />
        </section>
      </div>
    </Container>
  );
}
