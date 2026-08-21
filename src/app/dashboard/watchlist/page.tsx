'use client';

import { useWatchlist } from '@/features/watchlist/hooks/useWatchlistQueries';
import { WatchlistTable } from '@/features/watchlist/components/WatchlistTable';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WatchlistPage() {
  const { data: watchlist, isLoading, isError, refetch, isRefetching } = useWatchlist();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Watchlist</h1>
          <p className="text-slate-500 mt-1">Keep track of your favorite stocks</p>
        </div>
        <div className="h-64 bg-slate-100 animate-pulse rounded-lg w-full"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-slate-800">Error loading watchlist</h2>
        <p className="text-slate-500 mt-2">There was a problem fetching your watched stocks.</p>
        <Button onClick={() => refetch()} className="mt-6">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Watchlist</h1>
          <p className="text-slate-500 mt-1">Keep track of your favorite stocks</p>
        </div>
        <Button
          variant="outline"
          className="h-8 px-3 py-1.5 text-xs"
          onClick={() => refetch()} 
          disabled={isRefetching}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} /> 
          Refresh
        </Button>
      </div>

      <WatchlistTable watchlist={watchlist || []} />
    </div>
  );
}
