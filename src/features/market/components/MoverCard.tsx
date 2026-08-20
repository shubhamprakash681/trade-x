import { MarketMoverResponse } from '@/types/market';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { useMarketStore } from '@/store/useMarketStore';

export function MoverCard({ mover }: { mover: MarketMoverResponse }) {
  const livePrice = useMarketStore((state) => state.prices[mover.symbol]);
  
  const displayPrice = livePrice?.price ?? mover.price;
  const changeAmount = livePrice?.changeAmount ?? mover.changeAmount;
  const changePercent = livePrice?.changePercent ?? mover.changePercent;
  
  const isPositive = changeAmount >= 0;
  
  return (
    <Link href={`/dashboard/stocks/${mover.symbol}`} className="min-w-[200px] shrink-0 outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-xl">
      <Card className="h-full cursor-pointer transition-colors hover:bg-slate-50">
        <CardContent className="p-4 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-slate-900">{mover.symbol}</h4>
            <p className="text-xs text-slate-500 truncate max-w-[120px]">{mover.name}</p>
          </div>
          <div className={`p-1.5 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          </div>
        </div>
        
        <div className="mt-4">
            <p className="text-lg font-bold text-slate-900">
              ₹{displayPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={`text-xs font-medium flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isPositive ? '+' : ''}{changeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </p>
          </div>
      </CardContent>
    </Card>
  </Link>
);
}
