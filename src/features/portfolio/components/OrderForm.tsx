'use client';

import { useState } from 'react';
import { useBuyOrder, useSellOrder } from '../hooks/usePortfolioQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface OrderFormProps {
  symbol: string;
  currentPrice: number;
}

export function OrderForm({ symbol, currentPrice }: OrderFormProps) {
  const [quantity, setQuantity] = useState<string>('1');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');

  const buyMutation = useBuyOrder();
  const sellMutation = useSellOrder();

  const isPending = buyMutation.isPending || sellMutation.isPending;
  const numQuantity = parseFloat(quantity);
  const isValidQuantity = !isNaN(numQuantity) && numQuantity > 0;
  
  const estimatedAmount = isValidQuantity ? numQuantity * currentPrice : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidQuantity) return;

    if (side === 'BUY') {
      buyMutation.mutate({ symbol, quantity: numQuantity });
    } else {
      sellMutation.mutate({ symbol, quantity: numQuantity });
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="BUY" value={side} onValueChange={(v) => setSide(v as 'BUY' | 'SELL')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="BUY" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Buy</TabsTrigger>
          <TabsTrigger value="SELL" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Sell</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="quantity">Quantity (Shares)</Label>
            </div>
            <Input
              id="quantity"
              type="number"
              min="1"
              step="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="text-right font-medium text-lg"
              placeholder="0"
              disabled={isPending}
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500">Estimated Amount</span>
            <span className="font-bold text-slate-900 text-lg">
              ₹{estimatedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <Button 
            type="submit" 
            className={`w-full text-white h-12 text-lg font-medium transition-colors ${side === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            disabled={!isValidQuantity || isPending}
          >
            {isPending ? 'Processing...' : side === 'BUY' ? 'Place Buy Order' : 'Place Sell Order'}
          </Button>
        </form>
      </Tabs>
    </div>
  );
}
