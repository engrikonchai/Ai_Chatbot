'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

/** A link that marks itself as the current page for assistive tech and styling. */
export function NavLink({ href, ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
  return <Link href={href} aria-current={isCurrent ? 'page' : undefined} {...rest} />;
}
