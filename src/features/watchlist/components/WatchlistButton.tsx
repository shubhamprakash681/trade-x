import { Star } from 'lucide-react';
import { useWatchlist, useAddToWatchlist, useRemoveFromWatchlist } from '../hooks/useWatchlistQueries';

interface WatchlistButtonProps {
  symbol: string;
}

export function WatchlistButton({ symbol }: WatchlistButtonProps) {
  const { data: watchlist, isLoading } = useWatchlist();
  const addMutation = useAddToWatchlist();
  const removeMutation = useRemoveFromWatchlist();

  const isWatched = watchlist?.some((item) => item.symbol === symbol) ?? false;
  const isPending = addMutation.isPending || removeMutation.isPending || isLoading;

  const toggleWatchlist = () => {
    if (isWatched) {
      removeMutation.mutate(symbol);
    } else {
      addMutation.mutate({ symbol });
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      disabled={isPending}
      className={`inline-flex items-center justify-center p-2 rounded-full transition-colors focus:outline-none ${
        isWatched 
          ? 'text-yellow-500 hover:bg-yellow-50' 
          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
      } disabled:opacity-50`}
      title={isWatched ? 'Remove from Watchlist' : 'Add to Watchlist'}
    >
      <Star 
        className="w-6 h-6" 
        fill={isWatched ? 'currentColor' : 'none'} 
      />
    </button>
  );
}
