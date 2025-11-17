import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import { propertiesApi } from '../api/properties.api';

export function useProperty(id: Ref<string>) {
  const enabled = computed(() => !!id.value);
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesApi.getProperty(id.value).then((res) => res.data),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePropertyImages(id: Ref<string>) {
  const enabled = computed(() => !!id.value);
  return useQuery({
    queryKey: ['property', id, 'images'],
    queryFn: () => propertiesApi.getPropertyImages(id.value).then((res) => res.data),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
