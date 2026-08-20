import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root to dashboard as per routing strategy
  redirect('/dashboard');
}
