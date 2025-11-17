import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { dashboardApi } from '../api/dashboard.api';
import { useAuthStore } from '@/stores/auth.store';
export function useAlerts() {
    const authStore = useAuthStore();
    return useQuery({
        queryKey: ['alerts'],
        queryFn: () => dashboardApi.getAlerts().then((res) => res.data.data),
        enabled: authStore.isAuthenticated,
        staleTime: 2 * 60 * 1000,
    });
}
export function useCreateAlert() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => dashboardApi.createAlert(data).then((res) => res.data.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alerts'] });
        },
    });
}
export function useUpdateAlert() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => dashboardApi.updateAlert(id, data).then((res) => res.data.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alerts'] });
        },
    });
}
export function useDeleteAlert() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => dashboardApi.deleteAlert(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alerts'] });
        },
    });
}
export function useToggleAlert() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, is_active }) => dashboardApi.toggleAlert(id, is_active).then((res) => res.data.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alerts'] });
        },
    });
}
