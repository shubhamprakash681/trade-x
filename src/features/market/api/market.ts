import { apiClient } from '@/api/client';
import { MarketMoverResponse, MarketTrendResponse } from '@/types/market';

export const getGainers = async (): Promise<MarketMoverResponse[]> => {
  const response = await apiClient.get<MarketMoverResponse[]>('/api/market/gainers');
  return response.data;
};

export const getLosers = async (): Promise<MarketMoverResponse[]> => {
  const response = await apiClient.get<MarketMoverResponse[]>('/api/market/losers');
  return response.data;
};

export const getTrending = async (): Promise<MarketTrendResponse[]> => {
  const response = await apiClient.get<MarketTrendResponse[]>('/api/market/trending');
  return response.data;
};
