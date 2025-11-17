import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { dashboardApi } from '../api/dashboard.api';
import { useAuthStore } from '@/stores/auth.store';
import type { CreateAlertRequest, UpdateAlertRequest } from '../types';

export function useAlerts() {
  const authStore = useAuthStore();

  return useQuery({
    queryKey: ['alerts'],
    queryFn: () => dashboardApi.getAlerts().then((res) => res.data.data),
    enabled: authStore.isAuthenticated,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAlertRequest) =>
      dashboardApi.createAlert(data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}

export function useUpdateAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAlertRequest }) =>
      dashboardApi.updateAlert(id, data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}

export function useDeleteAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dashboardApi.deleteAlert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}

export function useToggleAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) =>
      dashboardApi.toggleAlert(id, is_active).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}
