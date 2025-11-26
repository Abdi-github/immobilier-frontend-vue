import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import { locationsApi } from '../api/locations.api';

export function useCities(cantonId?: Ref<string | undefined>) {
  return useQuery({
    queryKey: ['cities', cantonId ? cantonId : undefined],
    queryFn: () =>
      locationsApi.getCities(cantonId?.value ? { canton_id: cantonId.value } : undefined).then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  });
}

export function usePopularCities(params?: { min_properties?: number; limit?: number }) {
  return useQuery({
    queryKey: ['cities', 'popular', params],
    queryFn: () => locationsApi.getPopularCities(params).then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCitiesByCanton(cantonId: Ref<string | undefined>) {
  const enabled = computed(() => !!cantonId.value);
  return useQuery({
    queryKey: ['cities', 'canton', cantonId],
    queryFn: () => locationsApi.getCitiesByCanton(cantonId.value!).then((res) => res.data),
    enabled,
    staleTime: 10 * 60 * 1000,
  });
}
