import { apiClient } from '@/api/client';
import { 
  AlertResponse, 
  CreateAlertRequest, 
  NotificationResponse 
} from '@/types/notifications';

export const getAlerts = async (): Promise<AlertResponse[]> => {
  const { data } = await apiClient.get<AlertResponse[]>('/api/alerts');
  return data;
};

export const createAlert = async (request: CreateAlertRequest): Promise<AlertResponse> => {
  const { data } = await apiClient.post<AlertResponse>('/api/alerts', request);
  return data;
};

export const deleteAlert = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/alerts/${id}`);
};

export const getNotifications = async (limit: number = 100): Promise<NotificationResponse[]> => {
  const { data } = await apiClient.get<NotificationResponse[]>(`/api/notifications?limit=${limit}`);
  return data;
};
