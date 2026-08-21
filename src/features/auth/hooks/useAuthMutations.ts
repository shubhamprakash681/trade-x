import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, signup, logout } from '../api/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { AuthResponse, LoginRequest, SignupRequest } from '@/types/auth';

export const useLoginMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      router.push('/dashboard');
    },
  });
};

export const useSignupMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupRequest) => signup(data),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      router.push('/dashboard');
    },
  });
};

export const useLogoutMutation = () => {
  const logoutAction = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      logoutAction();
      queryClient.clear();
      router.push('/login');
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: import('@/types/auth').ChangePasswordRequest) => import('../api/auth').then((m) => m.changePassword(data)),
  });
};

export const useRequestPasswordRecoveryMutation = () => {
  return useMutation({
    mutationFn: (data: import('@/types/auth').PasswordRecoveryRequest) => import('../api/auth').then((m) => m.requestPasswordRecovery(data)),
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: import('@/types/auth').PasswordResetRequest) => import('../api/auth').then((m) => m.resetPassword(data)),
  });
};
