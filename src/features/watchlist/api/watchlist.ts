import { apiClient } from '@/api/client';
import { AddWatchlistRequest, WatchlistResponse } from '@/types/watchlist';

export const getWatchlist = async (): Promise<WatchlistResponse[]> => {
  const { data } = await apiClient.get<WatchlistResponse[]>('/api/watchlist');
  return data;
};

export const addToWatchlist = async (request: AddWatchlistRequest): Promise<WatchlistResponse> => {
  const { data } = await apiClient.post<WatchlistResponse>('/api/watchlist', request);
  return data;
};

export const removeFromWatchlist = async (symbol: string): Promise<void> => {
  await apiClient.delete(`/api/watchlist/${symbol}`);
};
