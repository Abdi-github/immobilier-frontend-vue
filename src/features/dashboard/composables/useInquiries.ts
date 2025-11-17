import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import { dashboardApi } from '../api/dashboard.api';
import { useAuthStore } from '@/stores/auth.store';

export function useInquiries(params: Ref<{ page: number; limit?: number }>) {
  const authStore = useAuthStore();

  return useQuery({
    queryKey: computed(() => ['inquiries', params.value]),
    queryFn: () => dashboardApi.getMyInquiries(params.value).then((res) => res.data),
    enabled: authStore.isAuthenticated,
    staleTime: 2 * 60 * 1000,
  });
}
