'use client';

import * as React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, usePathname } from 'next/navigation';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (isMounted && !isAuthenticated && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
      router.push('/login');
    }
  }, [isMounted, isAuthenticated, pathname, router]);

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!isMounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-r-[var(--color-primary)]"></span>
      </div>
    );
  }

  if (!isAuthenticated && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
