'use client';

import { useOrderHistory } from '@/features/portfolio/hooks/usePortfolioQueries';
import { OrderHistoryTable } from '@/features/portfolio/components/OrderHistoryTable';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function OrdersPage() {
  const { data: orders, isLoading, isError, error } = useOrderHistory();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded"></div>
        <div className="h-64 w-full bg-slate-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'Failed to load order history. Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!orders) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Order History</h1>
        <p className="text-slate-500 mt-1">Review your past paper trading activities</p>
      </div>

      <OrderHistoryTable orders={orders} />
    </div>
  );
}
