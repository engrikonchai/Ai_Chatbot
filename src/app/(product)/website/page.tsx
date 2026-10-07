import type { Metadata } from 'next';

import { Placeholder } from '@/components/Placeholder';

export const metadata: Metadata = { title: 'Website' };

export default function WebsitePage() {
  return <Placeholder title="Website" />;
}
