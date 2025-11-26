import { computed, type Ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { propertyManagementApi } from '../api/property-management.api';
import type { PropertyStats } from '../types';

interface MyPropertiesParams {
  page?: number;
  limit?: number;
  status?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export function useMyProperties(params: Ref<MyPropertiesParams>) {
  return useQuery({
    queryKey: computed(() => ['my-properties', params.value]),
    queryFn: () => propertyManagementApi.getMyProperties(params.value).then((res) => res.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useMyProperty(id: Ref<string>) {
  return useQuery({
    queryKey: computed(() => ['my-property', id.value]),
    queryFn: () => propertyManagementApi.getMyProperty(id.value).then((res) => res.data.data),
    enabled: computed(() => !!id.value),
    staleTime: 2 * 60 * 1000,
  });
}

export function usePropertyStats() {
  return useQuery({
    queryKey: ['property-stats'],
    queryFn: async () => {
      const res = await propertyManagementApi.getPropertyStats();
      const data = res.data.data;
      const byStatus = (data.by_status as Record<string, number>) || {};
      return {
        total: (data.total as number) || 0,
        draft: byStatus.DRAFT ?? 0,
        pending: byStatus.PENDING_APPROVAL ?? 0,
        approved: byStatus.APPROVED ?? 0,
        published: byStatus.PUBLISHED ?? 0,
        rejected: byStatus.REJECTED ?? 0,
        archived: byStatus.ARCHIVED ?? 0,
      } as PropertyStats;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof propertyManagementApi.createProperty>[0]) =>
      propertyManagementApi.createProperty(data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-properties'] });
      queryClient.invalidateQueries({ queryKey: ['property-stats'] });
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof propertyManagementApi.updateProperty>[1] }) =>
      propertyManagementApi.updateProperty(id, data).then((res) => res.data.data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['my-property', id] });
      queryClient.invalidateQueries({ queryKey: ['my-properties'] });
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => propertyManagementApi.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-properties'] });
      queryClient.invalidateQueries({ queryKey: ['property-stats'] });
    },
  });
}

export function useSubmitForApproval() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => propertyManagementApi.submitForApproval(id).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-properties'] });
      queryClient.invalidateQueries({ queryKey: ['property-stats'] });
    },
  });
}

export function useArchiveProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => propertyManagementApi.archiveProperty(id).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-properties'] });
      queryClient.invalidateQueries({ queryKey: ['property-stats'] });
    },
  });
}
