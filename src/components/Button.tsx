import Link from 'next/link';

import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'quiet';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** One primary per section. Secondary and quiet step back. */
  variant?: Variant;
};

function classesFor(variant: Variant, className?: string) {
  return [styles.button, styles[variant], className].filter(Boolean).join(' ');
}

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  return <button type={type} className={classesFor(variant, className)} {...rest} />;
}

/** A real navigation that looks like a button. Use it when the action goes somewhere. */
export function ButtonLink({
  variant = 'primary',
  className,
  ...rest
}: React.ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={classesFor(variant, className)} {...rest} />;
}
