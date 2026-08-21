import { useState } from 'react';
import { useCreateAlert } from '../hooks/useNotificationQueries';
import { AlertCondition } from '@/types/notifications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CreateAlertForm() {
  const [symbol, setSymbol] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState<AlertCondition>('ABOVE');

  const createMutation = useCreateAlert();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol || !targetPrice) return;

    createMutation.mutate({
      symbol: symbol.toUpperCase(),
      targetPrice: parseFloat(targetPrice),
      condition,
    }, {
      onSuccess: () => {
        setSymbol('');
        setTargetPrice('');
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Alert</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input 
              id="symbol" 
              placeholder="e.g. RELIANCE" 
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value as AlertCondition)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="ABOVE">Crosses Above</option>
              <option value="BELOW">Drops Below</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetPrice">Target Price</Label>
            <Input 
              id="targetPrice" 
              type="number" 
              step="0.05"
              min="0.01"
              placeholder="0.00"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            type="submit" 
            disabled={createMutation.isPending || !symbol || !targetPrice}
            className="w-full md:w-auto"
          >
            {createMutation.isPending ? 'Creating...' : 'Create Alert'}
          </Button>
        </div>
      </form>
    </div>
  );
}
