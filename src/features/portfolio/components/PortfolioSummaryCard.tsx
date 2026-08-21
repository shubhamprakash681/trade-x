import { Card, CardContent } from '@/components/ui/card';
import { PortfolioSummaryResponse } from '@/types/portfolio';
import { formatCurrency } from '@/lib/format';

interface PortfolioSummaryCardProps {
  summary: PortfolioSummaryResponse;
}

export function PortfolioSummaryCard({ summary }: PortfolioSummaryCardProps) {
  const isPositive = summary.unrealizedPnl >= 0;

  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          <div className="flex flex-col pt-4 md:pt-0">
            <span className="text-sm font-medium text-slate-500 mb-1">Current Value</span>
            <span className="text-3xl font-bold text-slate-900">
              {formatCurrency(summary.totalValue)}
            </span>
          </div>

          <div className="flex flex-col pt-4 md:pt-0 md:pl-6">
            <span className="text-sm font-medium text-slate-500 mb-1">Total Investment</span>
            <span className="text-2xl font-semibold text-slate-700">
              {formatCurrency(summary.investedValue)}
            </span>
          </div>

          <div className="flex flex-col pt-4 md:pt-0 md:pl-6">
            <span className="text-sm font-medium text-slate-500 mb-1">Overall P&L</span>
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{formatCurrency(summary.unrealizedPnl)}
              </span>
              <span className={`text-sm font-medium px-2 py-0.5 rounded-md ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {isPositive ? '+' : ''}{summary.unrealizedPnlPercent.toFixed(2)}%
              </span>
            </div>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
}
