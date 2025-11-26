import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import { agenciesApi } from '../api/agencies.api';
import type { AgencyQueryParams } from '../types';

export function useAgencies(params: Ref<AgencyQueryParams | undefined>) {
  const enabled = computed(() => !!params.value);
  return useQuery({
    queryKey: ['agencies', params],
    queryFn: () => agenciesApi.getAgencies(params.value!).then((res) => res.data),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
