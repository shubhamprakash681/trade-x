import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAlerts, 
  createAlert, 
  deleteAlert, 
  getNotifications 
} from '../api/notifications';
import { CreateAlertRequest, AlertResponse, NotificationResponse } from '@/types/notifications';
import { ApiError } from '@/types/api';
import { toast } from 'sonner';

export const useAlerts = () => {
  return useQuery<AlertResponse[], ApiError>({
    queryKey: ['alerts'],
    queryFn: getAlerts,
  });
};

export const useCreateAlert = () => {
  const queryClient = useQueryClient();

  return useMutation<AlertResponse, ApiError, CreateAlertRequest>({
    mutationFn: createAlert,
    onSuccess: (data) => {
      toast.success(`Alert set for ${data.symbol} at ${data.targetPrice}`);
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create alert');
    },
  });
};

export const useDeleteAlert = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: deleteAlert,
    onSuccess: () => {
      toast.success('Alert deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete alert');
    },
  });
};

export const useNotifications = (limit: number = 100) => {
  return useQuery<NotificationResponse[], ApiError>({
    queryKey: ['notifications', limit],
    queryFn: () => getNotifications(limit),
    refetchInterval: 10000, // Refetch every 10 seconds to get new notifications
  });
};
