import { AlertResponse } from '@/types/notifications';
import { formatCurrency } from '@/lib/format';
import { useDeleteAlert } from '../hooks/useNotificationQueries';
import { Trash2, BellRing, CheckCircle2 } from 'lucide-react';

interface AlertsListProps {
  alerts: AlertResponse[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  const deleteMutation = useDeleteAlert();

  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-slate-200">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <BellRing className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">No Alerts Set</h3>
        <p className="text-slate-500 text-center max-w-sm">
          You don&apos;t have any active price alerts. Create one to get notified when a stock hits your target price.
        </p>
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
              <th scope="col" className="px-6 py-4 font-medium">Condition</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Target Price</th>
              <th scope="col" className="px-6 py-4 font-medium text-center">Status</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {alerts.map((alert) => {
              const isActive = alert.status === 'ACTIVE';
              return (
                <tr key={alert.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900">{alert.stockName}</span>
                    <span className="block text-xs text-slate-500">{alert.symbol}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-700">
                      {alert.condition === 'ABOVE' ? 'Crosses Above' : 'Drops Below'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    {formatCurrency(alert.targetPrice)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {isActive ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Triggered
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => deleteMutation.mutate(alert.id)}
                      disabled={deleteMutation.isPending}
                      className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
                      title="Delete alert"
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
