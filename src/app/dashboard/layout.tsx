import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { MarketStreamer } from '@/features/market/components/MarketStreamer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <MarketStreamer />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
