import { useQuery } from '@tanstack/vue-query';
import { propertiesApi } from '../api/properties.api';
export function useProperties(params) {
    return useQuery({
        queryKey: ['properties', params],
        queryFn: () => propertiesApi.getProperties(params.value).then((res) => res.data),
        staleTime: 5 * 60 * 1000,
    });
}
export function useFeaturedProperties(limit = 6) {
    return useQuery({
        queryKey: ['properties', { limit, status: 'PUBLISHED' }],
        queryFn: () => propertiesApi
            .getProperties({ limit, status: 'PUBLISHED' })
            .then((res) => res.data),
        staleTime: 5 * 60 * 1000,
    });
}
