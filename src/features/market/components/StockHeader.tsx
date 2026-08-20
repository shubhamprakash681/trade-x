'use client';

import { StockResponse, PriceResponse } from '@/types/market';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMarketStore } from '@/store/useMarketStore';

interface StockHeaderProps {
  stock?: StockResponse;
  price?: PriceResponse;
  isLoading: boolean;
}

export function StockHeader({ stock, price, isLoading }: StockHeaderProps) {
  const livePrice = useMarketStore((state) => stock ? state.prices[stock.symbol] : undefined);
  const displayPrice = livePrice || price;
  const isPositive = (displayPrice?.changePercent ?? 0) >= 0;

  if (isLoading || !stock) {
    return (
      <div className="flex justify-between items-start animate-pulse">
        <div>
          <div className="h-8 w-48 bg-slate-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
        <div className="text-right">
          <div className="h-10 w-32 bg-slate-200 rounded mb-2 ml-auto"></div>
          <div className="h-4 w-24 bg-slate-200 rounded ml-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{stock.symbol}</h1>
            <span className="px-2 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-md">
              {stock.exchange}
            </span>
          </div>
          <p className="text-slate-500 mt-1">{stock.name} • {stock.sector}</p>
        </div>
        
        <div className="text-right">
          {displayPrice ? (
            <>
              <div className="text-3xl font-bold text-slate-900">
                ₹{displayPrice.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center justify-end gap-1 font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                {isPositive ? '+' : ''}{displayPrice.changeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({isPositive ? '+' : ''}{displayPrice.changePercent.toFixed(2)}%)
              </div>
            </>
          ) : (
            <div className="text-slate-400">Price unavailable</div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button className="flex-1 sm:flex-none w-full sm:w-32 bg-green-600 hover:bg-green-700">Buy</Button>
        <Button className="flex-1 sm:flex-none w-full sm:w-32 bg-red-600 hover:bg-red-700">Sell</Button>
      </div>
    </div>
  );
}
