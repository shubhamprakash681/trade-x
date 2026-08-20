import { useQuery } from '@tanstack/react-query';
import { getGainers, getLosers, getTrending, getStock, getMarketHistory, getLatestPrice } from '../api/market';

export const useGainers = () => {
  return useQuery({
    queryKey: ['market', 'gainers'],
    queryFn: getGainers,
    refetchInterval: 10000, // Refetch every 10 seconds to simulate live updates
  });
};

export const useLosers = () => {
  return useQuery({
    queryKey: ['market', 'losers'],
    queryFn: getLosers,
    refetchInterval: 10000,
  });
};

export const useTrending = () => {
  return useQuery({
    queryKey: ['market', 'trending'],
    queryFn: getTrending,
    refetchInterval: 10000,
  });
};

export const useStock = (symbol: string) => {
  return useQuery({
    queryKey: ['market', 'stock', symbol],
    queryFn: () => getStock(symbol),
    enabled: !!symbol,
  });
};

export const useMarketHistory = (symbol: string, from?: string, to?: string) => {
  return useQuery({
    queryKey: ['market', 'history', symbol, from, to],
    queryFn: () => getMarketHistory(symbol, from, to),
    enabled: !!symbol,
  });
};

export const useLatestPrice = (symbol: string) => {
  return useQuery({
    queryKey: ['market', 'latestPrice', symbol],
    queryFn: () => getLatestPrice(symbol),
    enabled: !!symbol,
  });
};
