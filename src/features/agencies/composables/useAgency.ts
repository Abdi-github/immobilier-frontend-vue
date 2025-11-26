import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import { agenciesApi } from '../api/agencies.api';

export function useAgency(id: Ref<string>) {
  const enabled = computed(() => !!id.value);
  return useQuery({
    queryKey: ['agency', id],
    queryFn: () => agenciesApi.getAgency(id.value).then((res) => res.data),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
