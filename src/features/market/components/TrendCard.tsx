import { MarketTrendResponse } from '@/types/market';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { useMarketStore } from '@/store/useMarketStore';

export function TrendCard({ trend }: { trend: MarketTrendResponse }) {
  const livePrice = useMarketStore((state) => state.prices[trend.symbol]);
  
  const displayPrice = livePrice?.price ?? trend.price;
  const changePercent = livePrice?.changePercent ?? trend.changePercent;
  
  const isPositive = changePercent >= 0;
  
  return (
    <Link href={`/dashboard/stocks/${trend.symbol}`} className="min-w-[240px] shrink-0 outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-xl">
      <Card className="h-full cursor-pointer transition-colors hover:bg-slate-50 border-l-4 border-l-orange-500">
        <CardContent className="p-4 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-1">
              {trend.symbol}
              <Flame size={16} className="text-orange-500" />
            </h4>
            <p className="text-xs text-slate-500 truncate max-w-[150px]">{trend.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold">Score: {trend.score}</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-lg font-bold text-slate-900">
                ₹{displayPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className={`text-xs font-medium flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 max-w-[120px] truncate" title={trend.reason}>
                {trend.reason}
              </p>
            </div>
          </div>
      </CardContent>
    </Card>
  </Link>
);
}
