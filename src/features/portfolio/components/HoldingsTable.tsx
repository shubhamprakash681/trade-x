import { HoldingResponse } from '@/types/portfolio';
import { formatCurrency } from '@/lib/format';
import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface HoldingsTableProps {
  holdings: HoldingResponse[];
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  if (holdings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-slate-200">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">No Holdings Found</h3>
        <p className="text-slate-500 text-center max-w-sm">
          You haven&apos;t made any paper trades yet. Navigate to the market to buy your first stock!
        </p>
        <Link 
          href="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          Go to Market
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
              <th scope="col" className="px-6 py-4 font-medium text-right">Qty.</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Avg. Price</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">LTP</th>
              <th scope="col" className="px-6 py-4 font-medium text-right hidden md:table-cell">Investment</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Current Value</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {holdings.map((holding) => {
              const isPositive = holding.unrealizedPnl >= 0;
              return (
                <tr key={holding.symbol} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/stocks/${holding.symbol}`} className="font-medium text-slate-900 hover:text-[var(--color-primary)] hover:underline">
                      {holding.stockName}
                      <span className="block text-xs text-slate-500">{holding.symbol}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    {holding.quantity}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600">
                    {formatCurrency(holding.averagePrice)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-900 font-medium">
                    {formatCurrency(holding.lastPrice)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 hidden md:table-cell">
                    {formatCurrency(holding.investedValue)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-900 font-medium">
                    {formatCurrency(holding.marketValue)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`flex flex-col items-end ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      <span className="font-semibold flex items-center">
                        {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {isPositive ? '+' : ''}{formatCurrency(holding.unrealizedPnl)}
                      </span>
                      <span className="text-xs">
                        {isPositive ? '+' : ''}{holding.unrealizedPnlPercent.toFixed(2)}%
                      </span>
                    </div>
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
