'use client';

import { useGainers, useLosers, useTrending } from '@/features/market/hooks/useMarketQueries';
import { MarketSection } from '@/features/market/components/MarketSection';
import { MoverCard } from '@/features/market/components/MoverCard';
import { TrendCard } from '@/features/market/components/TrendCard';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: gainers, isLoading: isLoadingGainers, isError: isErrorGainers } = useGainers();
  const { data: losers, isLoading: isLoadingLosers, isError: isErrorLosers } = useLosers();
  const { data: trending, isLoading: isLoadingTrending, isError: isErrorTrending } = useTrending();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome back, {user?.fullName?.split(' ')[0] || 'Trader'}!
        </h1>
        <p className="text-slate-500 mt-1">Here is your market overview for today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for Portfolio Summary in future phases */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Portfolio Summary</CardTitle>
            <CardDescription>Your portfolio performance (Coming in Phase 7)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-24 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-dashed">
              Portfolio data will appear here
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <MarketSection title="Top Gainers" isLoading={isLoadingGainers}>
          {isErrorGainers && <div className="text-red-500 py-4">Failed to load top gainers.</div>}
          {gainers?.map((mover) => (
            <MoverCard key={mover.symbol} mover={mover} />
          ))}
          {gainers?.length === 0 && <div className="text-slate-500 py-4">No gainers found.</div>}
        </MarketSection>

        <MarketSection title="Top Losers" isLoading={isLoadingLosers}>
          {isErrorLosers && <div className="text-red-500 py-4">Failed to load top losers.</div>}
          {losers?.map((mover) => (
            <MoverCard key={mover.symbol} mover={mover} />
          ))}
          {losers?.length === 0 && <div className="text-slate-500 py-4">No losers found.</div>}
        </MarketSection>

        <MarketSection title="Trending Stocks" isLoading={isLoadingTrending}>
          {isErrorTrending && <div className="text-red-500 py-4">Failed to load trending stocks.</div>}
          {trending?.map((trend) => (
            <TrendCard key={trend.symbol} trend={trend} />
          ))}
          {trending?.length === 0 && <div className="text-slate-500 py-4">No trending stocks found.</div>}
        </MarketSection>
      </div>
    </div>
  );
}
