import { Container } from './Container';
import styles from './Placeholder.module.css';

/**
 * Stand-in for screens that are not built yet, so the navigation never leads to a 404.
 * Replace each use when its screen is designed and implemented. `children` is for the
 * rare piece that must work before the screen exists (Settings: log out).
 */
export function Placeholder({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <Container>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.note}>This screen has not been built yet.</p>
      {children}
    </Container>
  );
}
