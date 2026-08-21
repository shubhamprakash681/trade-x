import { apiClient } from '@/api/client';
import { AuthResponse, LoginRequest, SignupRequest, User } from '@/types/auth';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/api/auth/login', data);
  return response.data;
};

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/api/auth/signup', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/api/auth/logout');
};

export const getMe = async (): Promise<User> => {
  const response = await apiClient.get<User>('/api/users/me');
  return response.data;
};

export const changePassword = async (data: import('@/types/auth').ChangePasswordRequest): Promise<void> => {
  await apiClient.put('/api/users/password', data);
};

