import { Container } from './Container';
import styles from './Placeholder.module.css';

/**
 * Stand-in for screens that are not built yet, so the navigation never leads to a 404.
 * Replace each use when its screen is designed and implemented.
 */
export function Placeholder({ title }: { title: string }) {
  return (
    <Container>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.note}>This screen has not been built yet.</p>
    </Container>
  );
}
