import { useQuery } from '@tanstack/vue-query';
import { locationsApi } from '../api/locations.api';
export function useAmenities() {
    return useQuery({
        queryKey: ['amenities'],
        queryFn: () => locationsApi.getAmenities().then((res) => res.data),
        staleTime: 30 * 60 * 1000,
    });
}
export function useAmenitiesByGroup(group) {
    return useQuery({
        queryKey: ['amenities', 'group', group],
        queryFn: () => locationsApi.getAmenitiesByGroup(group).then((res) => res.data),
        staleTime: 30 * 60 * 1000,
    });
}
