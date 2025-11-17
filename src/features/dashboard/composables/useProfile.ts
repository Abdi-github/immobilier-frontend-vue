import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { dashboardApi } from '../api/dashboard.api';
import { useAuthStore } from '@/stores/auth.store';

export function useProfile() {
  const authStore = useAuthStore();

  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => dashboardApi.getProfile().then((res) => res.data.data),
    enabled: authStore.isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: (data: Parameters<typeof dashboardApi.updateProfile>[0]) =>
      dashboardApi.updateProfile(data).then((res) => res.data.data),
    onSuccess: (user) => {
      authStore.updateUser(user);
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: (formData: FormData) =>
      dashboardApi.uploadAvatar(formData).then((res) => res.data.data),
    onSuccess: (data) => {
      authStore.updateUser({ avatar_url: data.avatar_url });
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
}
