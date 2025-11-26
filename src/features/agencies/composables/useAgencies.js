import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { agenciesApi } from '../api/agencies.api';
export function useAgencies(params) {
    const enabled = computed(() => !!params.value);
    return useQuery({
        queryKey: ['agencies', params],
        queryFn: () => agenciesApi.getAgencies(params.value).then((res) => res.data),
        enabled,
        staleTime: 5 * 60 * 1000,
    });
}
