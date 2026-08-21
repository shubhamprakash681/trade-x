import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../api/watchlist';
import { WatchlistResponse, AddWatchlistRequest } from '@/types/watchlist';
import { ApiError } from '@/types/api';
import { toast } from 'sonner';

export const useWatchlist = () => {
  return useQuery<WatchlistResponse[], ApiError>({
    queryKey: ['watchlist'],
    queryFn: getWatchlist,
  });
};

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation<WatchlistResponse, ApiError, AddWatchlistRequest>({
    mutationFn: addToWatchlist,
    onSuccess: (data) => {
      toast.success(`${data.symbol} added to watchlist`);
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add to watchlist');
    },
  });
};

export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: removeFromWatchlist,
    onSuccess: (_, symbol) => {
      toast.success(`${symbol} removed from watchlist`);
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to remove from watchlist');
    },
  });
};
