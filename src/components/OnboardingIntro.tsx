import { AssistantMark } from './AssistantMark';
import styles from './OnboardingIntro.module.css';

/**
 * The opening of every onboarding step: the assistant mark, the assistant speaking (a
 * serif heading) and one short supporting line. Deliberately small: a title, the lede,
 * an optional larger mark for the final step, and room for one extra line (Learning
 * shows the site being read). Anything else belongs to the step, not here.
 */
export function OnboardingIntro({
  title,
  lede,
  markSize = 20,
  children,
}: {
  title: React.ReactNode;
  lede: React.ReactNode;
  markSize?: number;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.intro}>
      <span className={styles.mark}>
        <AssistantMark size={markSize} />
      </span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lede}>{lede}</p>
      {children}
    </div>
  );
}
