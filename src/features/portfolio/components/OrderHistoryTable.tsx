import { OrderResponse } from '@/types/portfolio';
import { formatCurrency } from '@/lib/format';
import Link from 'next/link';

interface OrderHistoryTableProps {
  orders: OrderResponse[];
}

export function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-slate-200">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">No Orders Found</h3>
        <p className="text-slate-500 text-center max-w-sm">
          You haven&apos;t placed any orders yet. Visit the market to start paper trading.
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
              <th scope="col" className="px-6 py-4 font-medium">Date</th>
              <th scope="col" className="px-6 py-4 font-medium">Stock</th>
              <th scope="col" className="px-6 py-4 font-medium">Type</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Quantity</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Price</th>
              <th scope="col" className="px-6 py-4 font-medium text-right hidden md:table-cell">Total Amount</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => {
              const date = new Date(order.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              
              const isBuy = order.side === 'BUY';
              
              return (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                    {date}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/stocks/${order.symbol}`} className="font-medium text-slate-900 hover:text-[var(--color-primary)] hover:underline">
                      {order.stockName}
                      <span className="block text-xs text-slate-500">{order.symbol}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${isBuy ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                      {order.side}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600">
                    {formatCurrency(order.price)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-900 font-medium hidden md:table-cell">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.status}
                    </span>
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
