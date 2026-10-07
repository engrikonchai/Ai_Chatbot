import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { Divider } from '@/components/Divider';
import { StatusLine } from '@/components/StatusLine';
import { demoHome, demoOwner } from '@/lib/demo';

import styles from './home.module.css';

export const metadata: Metadata = { title: 'Home' };

function plural(count: number, one: string, many: string) {
  return count === 1 ? one : many;
}

/**
 * Home, normal state: "Everything is handled." (WIREFRAMES.md, default returning state).
 * A short report from the assistant, not a dashboard: state, one quiet outcome
 * sentence, a little recent activity. Demo data until the data layer exists.
 */
export default function HomePage() {
  const { greeting, site, week, recent } = demoHome;

  return (
    <Container>
      <section aria-labelledby="home-state" className={styles.state}>
        <p className={styles.greeting}>
          {greeting}, {demoOwner.firstName}
        </p>
        <h1 id="home-state" className={styles.headline}>
          Everything is handled.
        </h1>
        <p className={styles.lede}>
          Your assistant is live and nothing needs your attention right now.
        </p>
        <StatusLine tone="live">Live on {site}</StatusLine>
      </section>

      <Divider />

      <section aria-labelledby="home-week" className={styles.section}>
        <h2 id="home-week" className={styles.label}>
          This week
        </h2>
        <p className={styles.outcome}>
          It handled <strong>{week.conversations}</strong> conversations, captured{' '}
          <strong>{week.enquiries}</strong> {plural(week.enquiries, 'enquiry', 'enquiries')} and
          answered <strong>{week.handledAutomaticallyPercent}%</strong> without you.
        </p>
      </section>

      <Divider />

      <section aria-labelledby="home-recent" className={styles.section}>
        <h2 id="home-recent" className={styles.label}>
          Recent activity
        </h2>
        <ul className={styles.recent}>
          {recent.map((day) => (
            <li key={day.label}>
              <span className={styles.day}>{day.label}</span>, {day.conversations}{' '}
              {plural(day.conversations, 'conversation', 'conversations')} handled and{' '}
              {day.enquiries} {plural(day.enquiries, 'enquiry', 'enquiries')} captured.
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
