'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useLogoutMutation } from '@/features/auth/hooks/useAuthMutations';
import { NotificationsPopover } from '@/features/notifications/components/NotificationsPopover';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { ChangePasswordDialog } from '@/features/auth/components/ChangePasswordDialog';
import { LogOut, User as UserIcon, Menu, X, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { user } = useAuthStore();
  const logoutMutation = useLogoutMutation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Market', href: '/dashboard' },
    { name: 'Watchlist', href: '/dashboard/watchlist' },
    { name: 'Portfolio', href: '/dashboard/portfolio' },
    { name: 'Orders', href: '/dashboard/orders' },
    { name: 'Alerts', href: '/dashboard/alerts' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 select-none">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-8">
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="flex items-center space-x-2 mr-6">
            <div className="bg-[var(--color-primary)] text-white p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">TradeX</span>
          </Link>
          <div className="hidden sm:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-sm font-medium transition-colors hover:text-slate-900 dark:hover:text-slate-50 ${pathname === link.href ? 'text-[var(--color-primary)]' : 'text-slate-600 dark:text-slate-400'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <ThemeToggle />
          {user && (
            <div className="flex items-center gap-2 sm:gap-4">
              <NotificationsPopover />
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <UserIcon size={16} />
                {user.fullName}
              </div>
              <ChangePasswordDialog>
                <Button className="hidden sm:flex gap-2 bg-transparent text-slate-700 hover:bg-slate-100 border border-slate-200 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800">
                  <KeyRound size={16} />
                  <span>Change Password</span>
                </Button>
              </ChangePasswordDialog>
              <Button 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="gap-2 hidden sm:flex"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
              
              {/* Mobile menu button */}
              <button
                className="sm:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && user && (
        <div className="sm:hidden border-t border-slate-200 bg-white shadow-lg absolute w-full top-16 left-0">
          <div className="px-4 py-3 space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 border-b border-slate-100 mb-2">
              <UserIcon size={16} />
              {user.fullName}
            </div>
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href 
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' 
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="flex w-full items-center gap-2 px-3 py-2 mt-4 rounded-md text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
