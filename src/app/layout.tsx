import type { Metadata, Viewport } from 'next';
import { Figtree, Source_Serif_4 } from 'next/font/google';

import '@/styles/tokens.css';
import './globals.css';

// latin-ext covers č ć š ž đ, which the first pilot market needs.
const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-source-serif',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'AI Website Assistant', template: '%s · AI Website Assistant' },
  description: 'An AI assistant for your website that answers customers and captures enquiries.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f5f1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${figtree.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
