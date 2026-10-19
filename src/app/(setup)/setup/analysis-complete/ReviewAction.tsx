import { ButtonLink } from '@/components/Button';

import styles from './ReviewAction.module.css';

/**
 * The primary action of the Analysis complete screen: opens Review Information.
 * It only navigates. Nothing is saved or sent, and the Review screen shows its own
 * representative questions; it does not receive anything from this screen.
 */
export function ReviewAction() {
  return (
    <div className={styles.review}>
      <ButtonLink href="/setup/review">Review important information</ButtonLink>
    </div>
  );
}
