import { MarketTrendResponse } from '@/types/market';
import { Card, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';

export function TrendCard({ trend }: { trend: MarketTrendResponse }) {
  const isPositive = trend.changePercent >= 0;
  
  return (
    <Card className="min-w-[240px] shrink-0 cursor-pointer transition-colors hover:bg-slate-50 border-l-4 border-l-orange-500">
      <CardContent className="p-4">
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
        
        <div className="mt-3">
          <p className="text-lg font-bold text-slate-900">
            ₹{trend.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center justify-between mt-1">
            <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{trend.changePercent.toFixed(2)}%
            </p>
            <p className="text-xs text-slate-400 max-w-[120px] truncate" title={trend.reason}>
              {trend.reason}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
