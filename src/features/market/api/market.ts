import { apiClient } from '@/api/client';
import { MarketMoverResponse, MarketTrendResponse, StockResponse, CandleResponse, PriceResponse } from '@/types/market';

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

export const getStock = async (symbol: string): Promise<StockResponse> => {
  const response = await apiClient.get<StockResponse>(`/api/stocks/${symbol}`);
  return response.data;
};

export const getMarketHistory = async (symbol: string, from?: string, to?: string): Promise<CandleResponse[]> => {
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const response = await apiClient.get<CandleResponse[]>(`/api/market/history/${symbol}${queryString}`);
  return response.data;
};

export const getLatestPrice = async (symbol: string): Promise<PriceResponse> => {
  const response = await apiClient.get<PriceResponse>(`/api/prices/${symbol}`);
  return response.data;
};
