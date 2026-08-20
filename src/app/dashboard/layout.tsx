import { AuthGuard } from '@/features/auth/components/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
        {/* We will add Navbar/Sidebar here later */}
        <main className="flex-1 bg-slate-50">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
