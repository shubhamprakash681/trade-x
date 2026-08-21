import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { buyOrder, sellOrder, getPortfolio } from '../api/portfolio';
import { OrderRequest, OrderResponse, PortfolioResponse } from '@/types/portfolio';
import { ApiError } from '@/types/api';
import { toast } from 'sonner';

export const usePortfolio = () => {
  return useQuery<PortfolioResponse, ApiError>({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
  });
};

export const useBuyOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, ApiError, OrderRequest>({
    mutationFn: buyOrder,
    onSuccess: (data) => {
      toast.success(`Successfully bought ${data.quantity} shares of ${data.symbol}`);
      // Invalidate portfolio queries once implemented in Phase 7
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to place buy order');
    },
  });
};

export const useSellOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, ApiError, OrderRequest>({
    mutationFn: sellOrder,
    onSuccess: (data) => {
      toast.success(`Successfully sold ${data.quantity} shares of ${data.symbol}`);
      // Invalidate portfolio queries once implemented in Phase 7
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to place sell order');
    },
  });
};
