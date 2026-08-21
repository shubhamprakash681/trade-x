'use client';

import { WatchlistResponse } from '@/types/watchlist';
import { useRemoveFromWatchlist } from '../hooks/useWatchlistQueries';
import { useMarketStore } from '@/store/useMarketStore';
import { Trash2, Star, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/format';

interface WatchlistTableProps {
  watchlist: WatchlistResponse[];
}

export function WatchlistTable({ watchlist }: WatchlistTableProps) {
  const removeMutation = useRemoveFromWatchlist();
  const prices = useMarketStore((state) => state.prices);

  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-slate-200">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Star className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">Your Watchlist is Empty</h3>
        <p className="text-slate-500 text-center max-w-sm">
          You aren&apos;t watching any stocks yet. Visit the market and click the star icon to add stocks here.
        </p>
        <Link 
          href="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          Explore Market
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Stock</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Price</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Change</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {watchlist.map((item) => {
              const livePrice = prices[item.symbol];
              const priceDisplay = livePrice ? formatCurrency(livePrice.price) : '---';
              const isPositive = livePrice ? livePrice.changePercent >= 0 : true;
              const changeDisplay = livePrice 
                ? `${isPositive ? '+' : ''}${livePrice.changeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${isPositive ? '+' : ''}${livePrice.changePercent.toFixed(2)}%)`
                : '---';

              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/stocks/${item.symbol}`} className="font-medium text-slate-900 hover:text-[var(--color-primary)] hover:underline">
                      {item.stockName}
                      <span className="block text-xs text-slate-500">{item.symbol} • {item.exchange}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    {priceDisplay}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center gap-1 font-medium ${!livePrice ? 'text-slate-400' : isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {livePrice && (isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />)}
                      {changeDisplay}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => removeMutation.mutate(item.symbol)}
                      disabled={removeMutation.isPending}
                      className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
                      title="Remove from Watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
