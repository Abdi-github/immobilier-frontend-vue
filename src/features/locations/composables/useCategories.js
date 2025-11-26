import { useQuery } from '@tanstack/vue-query';
import { locationsApi } from '../api/locations.api';
export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => locationsApi.getCategories().then((res) => res.data),
        staleTime: 30 * 60 * 1000,
    });
}
export function useCategoriesBySection(section) {
    return useQuery({
        queryKey: ['categories', 'section', section],
        queryFn: () => locationsApi.getCategoriesBySection(section).then((res) => res.data),
        staleTime: 30 * 60 * 1000,
    });
}
