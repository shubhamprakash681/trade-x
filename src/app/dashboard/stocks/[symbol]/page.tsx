'use client';

import { use, useState } from 'react';
import { useStock, useMarketHistory, useLatestPrice } from '@/features/market/hooks/useMarketQueries';
import { StockHeader } from '@/features/market/components/StockHeader';
import { StockChart } from '@/features/market/components/StockChart';
import { OrderForm } from '@/features/portfolio/components/OrderForm';
import { useMarketStore } from '@/store/useMarketStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { subDays, formatISO } from 'date-fns';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function StockDetailsPage(props: { params: Promise<{ symbol: string }> }) {
  const { symbol } = use(props.params);
  
  // Calculate date range for the last 30 days
  const [dateRange] = useState(() => {
    const end = new Date();
    const start = subDays(end, 30);
    return {
      from: formatISO(start, { representation: 'date' }),
      to: formatISO(end, { representation: 'date' }),
    };
  });

  const { data: stock, isLoading: isStockLoading, isError: isStockError } = useStock(symbol);
  const { data: latestPrice, isLoading: isPriceLoading } = useLatestPrice(symbol);
  const { data: history, isLoading: isHistoryLoading, isError: isHistoryError } = useMarketHistory(
    symbol,
    dateRange.from,
    dateRange.to
  );

  const livePriceData = useMarketStore((state) => state.prices[symbol]);
  const currentPrice = livePriceData?.price || latestPrice?.price || 0;

  const isPositive = (livePriceData?.changePercent ?? latestPrice?.changePercent ?? 0) >= 0;

  if (isStockError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-slate-800">Stock not found</h2>
        <p className="text-slate-500 mt-2">We couldn&apos;t find details for &quot;{symbol}&quot;</p>
        <Link href="/dashboard" className="mt-6 text-[var(--color-primary)] font-medium hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors">
          <ChevronLeft size={16} className="mr-1" />
          Back to Dashboard
        </Link>
        <StockHeader 
          stock={stock} 
          price={latestPrice} 
          isLoading={isStockLoading || isPriceLoading} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Price History (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {isHistoryLoading ? (
              <div className="h-[300px] bg-slate-100 rounded-lg animate-pulse w-full"></div>
            ) : isHistoryError ? (
              <div className="h-[300px] flex items-center justify-center text-red-500">Failed to load chart data</div>
            ) : (
              <StockChart data={history || []} isPositive={isPositive} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trade Execution</CardTitle>
          </CardHeader>
          <CardContent>
            {stock ? (
              <OrderForm symbol={stock.symbol} currentPrice={currentPrice} />
            ) : (
              <div className="h-48 animate-pulse bg-slate-100 rounded-lg"></div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
