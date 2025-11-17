import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { dashboardApi } from '../api/dashboard.api';
import { useAuthStore } from '@/stores/auth.store';
import type { UserSettings } from '../types';

export function useSettings() {
  const authStore = useAuthStore();

  return useQuery({
    queryKey: ['user', 'settings'],
    queryFn: () => dashboardApi.getSettings().then((res) => res.data.data),
    enabled: authStore.isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserSettings>) =>
      dashboardApi.updateSettings(data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'settings'] });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: Parameters<typeof dashboardApi.changePassword>[0]) =>
      dashboardApi.changePassword(data),
  });
}

export function useDeactivateAccount() {
  return useMutation({
    mutationFn: () => dashboardApi.deactivateAccount(),
  });
}
