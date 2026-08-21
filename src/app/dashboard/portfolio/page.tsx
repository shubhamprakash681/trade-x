'use client';

import { usePortfolio } from '@/features/portfolio/hooks/usePortfolioQueries';
import { PortfolioSummaryCard } from '@/features/portfolio/components/PortfolioSummaryCard';
import { HoldingsTable } from '@/features/portfolio/components/HoldingsTable';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PortfolioPage() {
  const { data: portfolio, isLoading, isError, error } = usePortfolio();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded"></div>
        <div className="h-32 w-full bg-slate-200 animate-pulse rounded-lg"></div>
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
            {error?.message || 'Failed to load portfolio. Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!portfolio) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Your Portfolio</h1>
        <p className="text-slate-500 mt-1">Manage your holdings and track performance</p>
      </div>

      <PortfolioSummaryCard summary={portfolio.summary} />
      
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Holdings</h2>
        <HoldingsTable holdings={portfolio.holdings} />
      </div>
    </div>
  );
}
