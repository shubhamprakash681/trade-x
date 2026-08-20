import { useQuery } from '@tanstack/react-query';
import { getGainers, getLosers, getTrending } from '../api/market';

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
