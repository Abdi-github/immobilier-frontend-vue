import { computed } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { propertyManagementApi } from '../api/property-management.api';
export function usePropertyImages(propertyId) {
    return useQuery({
        queryKey: computed(() => ['property-images', propertyId.value]),
        queryFn: () => propertyManagementApi.getPropertyImages(propertyId.value).then((res) => res.data.data),
        enabled: computed(() => !!propertyId.value),
        staleTime: 2 * 60 * 1000,
    });
}
export function useUploadImage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ propertyId, formData }) => propertyManagementApi.uploadImage(propertyId, formData).then((res) => res.data.data),
        onSuccess: (_data, { propertyId }) => {
            queryClient.invalidateQueries({ queryKey: ['property-images', propertyId] });
            queryClient.invalidateQueries({ queryKey: ['my-property', propertyId] });
        },
    });
}
export function useUploadMultipleImages() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ propertyId, formData }) => propertyManagementApi.uploadMultipleImages(propertyId, formData).then((res) => res.data.data),
        onSuccess: (_data, { propertyId }) => {
            queryClient.invalidateQueries({ queryKey: ['property-images', propertyId] });
            queryClient.invalidateQueries({ queryKey: ['my-property', propertyId] });
        },
    });
}
export function useDeleteImage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ propertyId, imageId }) => propertyManagementApi.deleteImage(propertyId, imageId),
        onSuccess: (_data, { propertyId }) => {
            queryClient.invalidateQueries({ queryKey: ['property-images', propertyId] });
            queryClient.invalidateQueries({ queryKey: ['my-property', propertyId] });
        },
    });
}
export function useSetPrimaryImage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ propertyId, imageId }) => propertyManagementApi.setPrimaryImage(propertyId, imageId),
        onSuccess: (_data, { propertyId }) => {
            queryClient.invalidateQueries({ queryKey: ['property-images', propertyId] });
            queryClient.invalidateQueries({ queryKey: ['my-property', propertyId] });
        },
    });
}
export function useReorderImages() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ propertyId, imageIds }) => propertyManagementApi.reorderImages(propertyId, imageIds),
        onSuccess: (_data, { propertyId }) => {
            queryClient.invalidateQueries({ queryKey: ['property-images', propertyId] });
        },
    });
}
