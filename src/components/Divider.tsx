import styles from './Divider.module.css';

/** A hairline. Prefer this and whitespace over wrapping sections in cards. */
export function Divider() {
  return <hr className={styles.divider} />;
}
