import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { computed } from 'vue';
import { dashboardApi } from '../api/dashboard.api';
import { useAuthStore } from '@/stores/auth.store';
export function useFavorites(params) {
    const authStore = useAuthStore();
    return useQuery({
        queryKey: computed(() => ['favorites', params.value]),
        queryFn: () => dashboardApi.getFavorites(params.value).then((res) => res.data),
        enabled: authStore.isAuthenticated,
        staleTime: 2 * 60 * 1000,
    });
}
export function useFavoriteIds() {
    const authStore = useAuthStore();
    return useQuery({
        queryKey: ['favorite-ids'],
        queryFn: () => dashboardApi.getFavoriteIds().then((res) => res.data.data.property_ids),
        enabled: authStore.isAuthenticated,
        staleTime: 2 * 60 * 1000,
    });
}
export function useAddFavorite() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (propertyId) => dashboardApi.addFavorite(propertyId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            queryClient.invalidateQueries({ queryKey: ['favorite-ids'] });
        },
    });
}
export function useRemoveFavorite() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (propertyId) => dashboardApi.removeFavorite(propertyId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            queryClient.invalidateQueries({ queryKey: ['favorite-ids'] });
        },
    });
}
