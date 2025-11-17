import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { DEFAULT_PAGE_SIZE } from '@/shared/utils/constants';

export const useSearchStore = defineStore('search', () => {
  const transactionType = ref<'rent' | 'buy' | null>(null);
  const categoryId = ref<string | null>(null);
  const cantonId = ref<string | null>(null);
  const cityId = ref<string | null>(null);
  const priceMin = ref<number | null>(null);
  const priceMax = ref<number | null>(null);
  const roomsMin = ref<number | null>(null);
  const roomsMax = ref<number | null>(null);
  const surfaceMin = ref<number | null>(null);
  const surfaceMax = ref<number | null>(null);
  const amenityIds = ref<string[]>([]);
  const sort = ref<string>('newest');
  const page = ref(1);
  const limit = ref(DEFAULT_PAGE_SIZE);

  const queryParams = computed(() => {
    const params: Record<string, unknown> = {
      page: page.value,
      limit: limit.value,
    };
    if (transactionType.value) params.transaction_type = transactionType.value;
    if (categoryId.value) params.category_id = categoryId.value;
    if (cantonId.value) params.canton_id = cantonId.value;
    if (cityId.value) params.city_id = cityId.value;
    if (priceMin.value) params.price_min = priceMin.value;
    if (priceMax.value) params.price_max = priceMax.value;
    if (roomsMin.value) params.rooms_min = roomsMin.value;
    if (roomsMax.value) params.rooms_max = roomsMax.value;
    if (surfaceMin.value) params.surface_min = surfaceMin.value;
    if (surfaceMax.value) params.surface_max = surfaceMax.value;
    if (amenityIds.value.length) params.amenities = amenityIds.value;
    if (sort.value) params.sort_by = sort.value;
    return params;
  });

  const hasActiveFilters = computed(() => {
    return !!(
      transactionType.value ||
      categoryId.value ||
      cantonId.value ||
      cityId.value ||
      priceMin.value ||
      priceMax.value ||
      roomsMin.value ||
      roomsMax.value ||
      surfaceMin.value ||
      surfaceMax.value ||
      amenityIds.value.length
    );
  });

  function setPage(newPage: number) {
    page.value = newPage;
  }

  function resetFilters() {
    transactionType.value = null;
    categoryId.value = null;
    cantonId.value = null;
    cityId.value = null;
    priceMin.value = null;
    priceMax.value = null;
    roomsMin.value = null;
    roomsMax.value = null;
    surfaceMin.value = null;
    surfaceMax.value = null;
    amenityIds.value = [];
    sort.value = 'newest';
    page.value = 1;
  }

  function updateFromQuery(query: Record<string, string>) {
    if (query.transaction_type) transactionType.value = query.transaction_type as 'rent' | 'buy';
    if (query.category_id) categoryId.value = query.category_id;
    if (query.canton_id) cantonId.value = query.canton_id;
    if (query.city_id) cityId.value = query.city_id;
    if (query.price_min) priceMin.value = Number(query.price_min);
    if (query.price_max) priceMax.value = Number(query.price_max);
    if (query.rooms_min) roomsMin.value = Number(query.rooms_min);
    if (query.rooms_max) roomsMax.value = Number(query.rooms_max);
    if (query.surface_min) surfaceMin.value = Number(query.surface_min);
    if (query.surface_max) surfaceMax.value = Number(query.surface_max);
    if (query.sort_by) sort.value = query.sort_by;
    if (query.page) page.value = Number(query.page);
    if (query.limit) limit.value = Number(query.limit);
  }

  return {
    transactionType,
    categoryId,
    cantonId,
    cityId,
    priceMin,
    priceMax,
    roomsMin,
    roomsMax,
    surfaceMin,
    surfaceMax,
    amenityIds,
    sort,
    page,
    limit,
    queryParams,
    hasActiveFilters,
    setPage,
    resetFilters,
    updateFromQuery,
  };
});
