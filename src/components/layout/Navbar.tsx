'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useLogoutMutation } from '@/features/auth/hooks/useAuthMutations';
import { LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user } = useAuthStore();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-8">
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="flex items-center space-x-2 mr-6">
            <div className="bg-[var(--color-primary)] text-white p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">TradeX</span>
          </Link>
          <div className="hidden sm:flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Market
            </Link>
            <Link href="/dashboard/portfolio" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Portfolio
            </Link>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-700">
                <UserIcon size={16} />
                {user.fullName}
              </div>
              <Button 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
