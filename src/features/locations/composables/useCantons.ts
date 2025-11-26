import { useQuery } from '@tanstack/vue-query';
import { locationsApi } from '../api/locations.api';

export function useCantons() {
  return useQuery({
    queryKey: ['cantons'],
    queryFn: () => locationsApi.getCantons().then((res) => res.data),
    staleTime: 30 * 60 * 1000, // 30 minutes — cantons rarely change
  });
}
