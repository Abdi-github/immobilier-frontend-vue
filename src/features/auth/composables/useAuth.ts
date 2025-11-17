import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth.store';
import { authApi } from '../api/auth.api';
import type { LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../types';

export function useAuth() {
  const router = useRouter();
  const { locale } = useI18n();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data).then((res) => res.data),
    onSuccess: (response) => {
      const { user, tokens } = response.data;
      authStore.setCredentials({
        user,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data).then((res) => res.data),
    onSuccess: (response) => {
      const { user, tokens } = response.data;
      authStore.setCredentials({
        user,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout().then((res) => res.data),
    onSuccess: () => {
      authStore.logout();
      queryClient.clear();
      router.push(`/${locale.value}`);
    },
    onError: () => {
      // Even if API call fails, clear local state
      authStore.logout();
      queryClient.clear();
      router.push(`/${locale.value}`);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data).then((res) => res.data),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data).then((res) => res.data),
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (data: { token: string }) => authApi.verifyEmail(data).then((res) => res.data),
  });

  const resendVerificationMutation = useMutation({
    mutationFn: (data: { email: string }) => authApi.resendVerification(data).then((res) => res.data),
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    verifyEmailMutation,
    resendVerificationMutation,
  };
}
