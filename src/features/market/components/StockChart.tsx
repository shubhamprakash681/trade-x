'use client';

import { CandleResponse } from '@/types/market';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format, parseISO } from 'date-fns';

interface StockChartProps {
  data: CandleResponse[];
  isPositive: boolean;
}

export function StockChart({ data, isPositive }: StockChartProps) {
  if (!data || data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-slate-500">No chart data available.</div>;
  }

  const chartData = data.map((candle) => ({
    time: format(parseISO(candle.candleTime), 'MMM dd'),
    price: candle.close,
  }));

  const color = isPositive ? '#16a34a' : '#dc2626';

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#94a3b8' }} 
            minTickGap={30}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
            formatter={(value: any) => [`₹${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 'Price']}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
