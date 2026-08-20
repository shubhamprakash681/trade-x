import * as React from 'react';
import { ChevronRight } from 'lucide-react';

interface MarketSectionProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export function MarketSection({ title, children, isLoading }: MarketSectionProps) {
  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <button className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] flex items-center">
          View All <ChevronRight size={16} />
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[200px] h-[120px] bg-slate-200 rounded-xl animate-pulse shrink-0"></div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {children}
        </div>
      )}
    </section>
  );
}
