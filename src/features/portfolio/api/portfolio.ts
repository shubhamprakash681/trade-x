import { apiClient } from '@/api/client';
import { OrderRequest, OrderResponse, PortfolioResponse } from '@/types/portfolio';

export const getPortfolio = async (): Promise<PortfolioResponse> => {
  const { data } = await apiClient.get<PortfolioResponse>('/api/portfolio');
  return data;
};

export const buyOrder = async (request: OrderRequest): Promise<OrderResponse> => {
  const { data } = await apiClient.post<OrderResponse>('/api/orders/buy', request);
  return data;
};

export const sellOrder = async (request: OrderRequest): Promise<OrderResponse> => {
  const { data } = await apiClient.post<OrderResponse>('/api/orders/sell', request);
  return data;
};
