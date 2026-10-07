import { redirect } from 'next/navigation';

// Temporary: the public landing page is a later milestone. Until then `/` opens Home.
export default function RootPage() {
  redirect('/home');
}
