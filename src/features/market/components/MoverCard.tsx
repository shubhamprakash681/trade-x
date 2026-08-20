import { MarketMoverResponse } from '@/types/market';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MoverCard({ mover }: { mover: MarketMoverResponse }) {
  const isPositive = mover.changeAmount >= 0;
  
  return (
    <Card className="min-w-[200px] shrink-0 cursor-pointer transition-colors hover:bg-slate-50">
      <CardContent className="p-4">
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
            ₹{mover.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{mover.changeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({isPositive ? '+' : ''}{mover.changePercent.toFixed(2)}%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
