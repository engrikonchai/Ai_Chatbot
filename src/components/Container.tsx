import styles from './Container.module.css';

type ContainerProps = {
  /**
   * `wide`: the page frame (header). `reading`: core product content, a narrow
   * column that sits slightly left of centre on large screens (DESIGN.md section 7).
   */
  size?: 'wide' | 'reading';
  className?: string;
  children: React.ReactNode;
};

export function Container({ size = 'reading', className, children }: ContainerProps) {
  const classes = [styles[size], className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}
