"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogoutMutation } from "@/features/auth/hooks/useAuthMutations";
import { NotificationsPopover } from "@/features/notifications/components/NotificationsPopover";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ChangePasswordDialog } from "@/features/auth/components/ChangePasswordDialog";
import { LogOut, User as UserIcon, Menu, X, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
    { name: "Market", href: "/dashboard" },
    { name: "Watchlist", href: "/dashboard/watchlist" },
    { name: "Portfolio", href: "/dashboard/portfolio" },
    { name: "Orders", href: "/dashboard/orders" },
    { name: "Alerts", href: "/dashboard/alerts" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-surface)_94%,transparent)] backdrop-blur-xl select-none">
      <div className="container mx-auto flex h-16 min-w-0 items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 shrink-0 items-center gap-2 xl:gap-6">
          <Link href="/dashboard" className="flex shrink-0 items-center gap-2 xl:mr-4">
            <div className="rounded-lg">
              <Image
                src="/favicon.ico"
                alt="TX"
                width={28}
                height={28}
                className="rounded-sm"
              />
            </div>
            <span className="hidden text-xl font-bold tracking-tight text-[var(--app-foreground)] sm:inline-block">
              TradeX
            </span>
          </Link>
          <div className="hidden items-center gap-4 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-[var(--app-foreground)] ${pathname === link.href ? "text-[var(--color-primary)]" : "text-[var(--app-muted)]"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 shrink-0 items-center justify-end gap-1.5 sm:gap-2 xl:gap-4">
          <ThemeToggle />
          {user && (
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 xl:gap-4">
              <NotificationsPopover />
              <div className="hidden items-center gap-2 text-sm font-medium text-[var(--app-muted)] xl:flex">
                <UserIcon size={16} />
                {user.fullName}
              </div>
              <ChangePasswordDialog>
                <Button variant="outline" className="max-xl:hidden xl:flex xl:gap-2">
                  <KeyRound size={16} />
                  <span>Change Password</span>
                </Button>
              </ChangePasswordDialog>
              <Button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="max-xl:hidden xl:flex xl:gap-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>

              {/* Mobile menu button */}
              <button
                type="button"
                className="rounded-lg p-2 text-[var(--app-muted)] transition-colors hover:bg-[var(--app-hover)] hover:text-[var(--app-foreground)] focus:outline-none xl:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && user && (
        <div className="absolute top-16 left-0 w-full border-t border-[var(--app-border)] bg-[var(--app-surface)] shadow-xl xl:hidden">
          <div className="container mx-auto space-y-1 px-4 py-3 sm:px-6 lg:px-8">
            <div className="mb-2 flex min-w-0 items-center gap-2 border-b border-[var(--app-border)] px-3 py-2 text-sm font-medium text-[var(--app-foreground)]">
              <UserIcon size={16} />
              <span className="truncate">{user.fullName}</span>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "text-[var(--app-muted)] hover:bg-[var(--app-hover)] hover:text-[var(--app-foreground)]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <ChangePasswordDialog>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-base font-medium text-[var(--app-muted)] transition-colors hover:bg-[var(--app-hover)] hover:text-[var(--app-foreground)]"
              >
                <KeyRound size={18} />
                <span>Change Password</span>
              </button>
            </ChangePasswordDialog>
            <button
              type="button"
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
