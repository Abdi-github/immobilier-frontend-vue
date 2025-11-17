<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Bell, List, MapPin, Search, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import Select from 'primevue/select';
import Skeleton from 'primevue/skeleton';
import SEO from '@/shared/components/SEO.vue';
import PropertyCardGrid from '../components/PropertyCardGrid.vue';
import PropertyTypeFilter from '../components/PropertyTypeFilter.vue';
import LocationFilter from '../components/LocationFilter.vue';
import MinMaxFilter from '../components/MinMaxFilter.vue';
import { usePropertySearch, type SelectedLocation } from '../composables/usePropertySearch';
import { useProperties } from '../composables/useProperties';
import { useCategories } from '@/features/locations/composables/useCategories';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useCities } from '@/features/locations/composables/useCities';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import {
  PRICE_OPTIONS_RENT,
  PRICE_OPTIONS_BUY,
  ROOMS_OPTIONS,
  SURFACE_OPTIONS,
  formatSwissPrice,
  formatRoomsLabel,
  formatSurfaceLabel,
} from '../constants/filterPresets';

const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();

const {
  transactionType,
  selectedCategoryIds,
  cantonIds,
  cityIds,
  priceMin,
  priceMax,
  roomsMin,
  roomsMax,
  surfaceMin,
  surfaceMax,
  currentSort,
  queryParams,
  handleTransactionChange,
  handleCategoryChange,
  handleLocationsChange,
  handlePriceMinChange,
  handlePriceMaxChange,
  handleRoomsMinChange,
  handleRoomsMaxChange,
  handleSurfaceMinChange,
  handleSurfaceMaxChange,
  handleSortChange,
  handlePageChange,
  getPageNumbers,
} = usePropertySearch();

// Data queries
const { data, isLoading, isError, isFetching } = useProperties(toRef(queryParams));
const { data: categoriesData } = useCategories();
const { data: cantonsData } = useCantons();
const { data: citiesData } = useCities();

const categories = computed(() => categoriesData.value?.data ?? []);
const cantons = computed(() => cantonsData.value?.data ?? []);
const cities = computed(() => citiesData.value?.data ?? []);

const properties = computed(() => data.value?.data ?? []);
const pagination = computed(() => {
  const p = data.value?.pagination;
  if (!p) return undefined;
  return {
    ...p,
    hasPrevPage: p.page > 1,
    hasNextPage: p.page < p.totalPages,
  };
});

// Reconstruct selected locations from URL IDs
const selectedLocations = computed<SelectedLocation[]>(() => {
  const locations: SelectedLocation[] = [];

  for (const cantonId of cantonIds.value) {
    const canton = cantons.value.find((c) => String(c.id) === cantonId);
    if (canton) {
      locations.push({
        id: String(canton.id),
        name: getLocalizedName(canton.name),
        type: 'canton',
        cantonCode: canton.code,
      });
    }
  }

  for (const cityId of cityIds.value) {
    const city = cities.value.find((c) => String(c.id) === cityId);
    if (city) {
      const canton = cantons.value.find((c) => String(c.id) === String(city.canton_id));
      locations.push({
        id: String(city.id),
        name: getLocalizedName(city.name),
        type: 'city',
        postalCode: city.postal_code,
        cantonCode: canton?.code,
      });
    }
  }

  return locations;
});

// Sort options for Select dropdown
const sortOptions = [
  { value: 'is_top-desc', label: t('properties.sort.topOffers', 'TOP offers') },
  { value: 'published_at-desc', label: t('properties.sort.newest', 'Newest listed') },
  { value: 'published_at-asc', label: t('properties.sort.oldest', 'Oldest listed') },
  { value: 'price-asc', label: t('properties.sort.priceAsc', 'Price (ascending)') },
  { value: 'price-desc', label: t('properties.sort.priceDesc', 'Price (descending)') },
];

// Pagination helpers
const paginationStart = computed(() =>
  pagination.value ? (pagination.value.page - 1) * pagination.value.limit + 1 : 0,
);
const paginationEnd = computed(() =>
  pagination.value
    ? Math.min(pagination.value.page * pagination.value.limit, pagination.value.total)
    : 0,
);
const pageNumbers = computed(() =>
  pagination.value ? getPageNumbers(pagination.value.totalPages) : [],
);

const priceOptions = computed(() =>
  transactionType.value === 'rent' ? PRICE_OPTIONS_RENT : PRICE_OPTIONS_BUY,
);

const priceLabel = computed(() =>
  transactionType.value === 'rent'
    ? t('properties.filters.rentAmount', 'Rent amount')
    : t('properties.filters.price', 'Price'),
);
</script>

<template>
  <div data-testid="properties-page" class="min-h-screen bg-gray-50">
    <SEO
      :title="t('properties.seo.title', 'Properties for Rent & Sale in Switzerland')"
      :description="t('properties.seo.description', 'Browse apartments, houses and commercial properties available for rent and sale across Switzerland.')"
    />

    <!-- Top Filter Bar -->
    <div class="border-b bg-white">
      <div class="mx-auto max-w-7xl px-4 py-4">
        <div class="flex flex-wrap items-center gap-3">
          <!-- Rent / Buy toggle -->
          <div class="flex overflow-hidden rounded-full border border-gray-300">
            <button
              class="px-6 py-2 text-sm font-medium transition-colors"
              :class="transactionType === 'rent' ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
              @click="handleTransactionChange('rent')"
            >
              {{ t('properties.filters.rent', 'Rent') }}
            </button>
            <button
              class="px-6 py-2 text-sm font-medium transition-colors"
              :class="transactionType === 'buy' ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
              @click="handleTransactionChange('buy')"
            >
              {{ t('properties.filters.buy', 'Buy') }}
            </button>
          </div>

          <!-- Property Type -->
          <PropertyTypeFilter
            :categories="categories"
            :selected-ids="selectedCategoryIds"
            @change="handleCategoryChange"
          />

          <!-- Location -->
          <LocationFilter
            :selected-locations="selectedLocations"
            @change="handleLocationsChange"
          />

          <!-- Price -->
          <MinMaxFilter
            :label="priceLabel"
            :min-value="priceMin"
            :max-value="priceMax"
            :options="priceOptions"
            :format-value="formatSwissPrice"
            @update:min-value="handlePriceMinChange"
            @update:max-value="handlePriceMaxChange"
          />

          <!-- Rooms -->
          <MinMaxFilter
            :label="t('properties.filters.rooms', 'Rooms')"
            :min-value="roomsMin"
            :max-value="roomsMax"
            :options="ROOMS_OPTIONS"
            :format-value="formatRoomsLabel"
            @update:min-value="handleRoomsMinChange"
            @update:max-value="handleRoomsMaxChange"
          />

          <!-- Surface -->
          <MinMaxFilter
            :label="t('properties.filters.surface', 'Surface')"
            :min-value="surfaceMin"
            :max-value="surfaceMax"
            :options="SURFACE_OPTIONS"
            :format-value="formatSurfaceLabel"
            @update:min-value="handleSurfaceMinChange"
            @update:max-value="handleSurfaceMaxChange"
          />

          <div class="flex-1" />

          <!-- Create Alert -->
          <button
            class="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {{ t('properties.list.createAlert', 'Create your e-mail alert') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Secondary toolbar -->
    <div class="border-b bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <!-- Results count -->
        <div class="text-sm text-gray-600">
          <span v-if="pagination">
            {{ paginationStart }}-{{ paginationEnd }} of {{ pagination.total?.toLocaleString('de-CH') }} properties found
          </span>
          <Skeleton v-else width="8rem" height="1rem" />
        </div>

        <!-- Right side: List/Map + Sort -->
        <div class="flex items-center gap-4">
          <!-- List / Map toggle -->
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-1 text-sm font-medium text-primary">
              <List class="h-4 w-4" />
              {{ t('properties.list.listView', 'List') }}
            </button>
            <router-link
              :to="`/${locale}/properties/map`"
              class="flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
            >
              <MapPin class="h-4 w-4" />
              {{ t('properties.list.map', 'Map') }}
            </router-link>
          </div>

          <!-- Sort -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">{{ t('properties.list.sort', 'Sort') }} :</span>
            <Select
              :model-value="currentSort"
              :options="sortOptions"
              option-label="label"
              option-value="value"
              class="w-44 border-0 text-sm font-medium text-primary shadow-none"
              @update:model-value="handleSortChange"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="mx-auto max-w-7xl px-4 py-6">
      <!-- Breadcrumb title -->
      <h2 class="mb-4 text-sm text-gray-600">
        {{ transactionType === 'rent'
          ? t('properties.list.rentIn', 'Rent in Switzerland')
          : t('properties.list.buyIn', 'Buy in Switzerland')
        }}
      </h2>

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 9" :key="i" class="overflow-hidden rounded-lg bg-white shadow-sm">
          <Skeleton width="100%" height="0" class="!aspect-[4/3]" />
          <div class="space-y-3 p-4">
            <Skeleton width="8rem" height="1.5rem" />
            <Skeleton width="12rem" height="1rem" />
            <Skeleton width="10rem" height="1rem" />
            <div class="flex gap-4 pt-2">
              <Skeleton width="4rem" height="1rem" />
              <Skeleton width="4rem" height="1rem" />
            </div>
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="isError" class="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <p class="text-red-600">{{ t('common.errors.loadFailed', 'Failed to load properties') }}</p>
        <button
          class="mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          @click="$router.go(0)"
        >
          {{ t('common.actions.retry', 'Retry') }}
        </button>
      </div>

      <!-- Properties grid -->
      <div
        v-else-if="properties.length > 0"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        :class="isFetching && 'opacity-60'"
      >
        <PropertyCardGrid
          v-for="property in properties"
          :key="property.id"
          :property="property"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="rounded-lg bg-white p-12 text-center shadow-sm">
        <Search class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-4 text-lg font-semibold text-gray-900">
          {{ t('properties.list.noResults', 'No properties found') }}
        </h3>
        <p class="mt-2 text-gray-600">
          {{ t('properties.list.noResultsHint', 'Try adjusting your search criteria') }}
        </p>
      </div>

      <!-- Email alert banner (after first page results) -->
      <div
        v-if="!isLoading && properties.length > 0 && pagination && pagination.page === 1"
        class="my-6 flex items-center justify-between rounded-lg bg-[#1a1a2e] p-4 text-white"
      >
        <div class="flex items-center gap-3">
          <Bell class="h-5 w-5" />
          <span class="text-sm">{{ t('properties.list.alertBanner.subtitle', 'Receive new properties by email') }}</span>
        </div>
        <button class="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-[#1a1a2e] hover:bg-gray-100">
          {{ t('properties.list.alertBanner.cta', 'Create your e-mail alert') }}
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.totalPages > 1" class="mt-8 flex flex-col items-center gap-4">
        <div class="flex items-center gap-1">
          <!-- Previous -->
          <button
            :disabled="!pagination.hasPrevPage"
            class="rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            @click="handlePageChange(pagination.page - 1)"
          >
            <ChevronLeft class="h-4 w-4" />
          </button>

          <!-- Page numbers -->
          <template v-for="(pageNum, idx) in pageNumbers" :key="idx">
            <span v-if="pageNum === '...'" class="px-2 text-gray-400">...</span>
            <button
              v-else
              class="min-w-8 rounded-md px-3 py-1.5 text-sm"
              :class="pagination.page === pageNum
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'"
              @click="handlePageChange(pageNum as number)"
            >
              {{ pageNum }}
            </button>
          </template>

          <!-- Next -->
          <button
            :disabled="!pagination.hasNextPage"
            class="flex items-center gap-1 rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            @click="handlePageChange(pagination.page + 1)"
          >
            <span class="text-sm">{{ t('common.pagination.next', 'Next') }}</span>
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>

        <!-- Page indicator -->
        <p class="text-sm text-gray-500">
          Page {{ pagination.page }} on {{ pagination.totalPages }}
        </p>
      </div>
    </div>
  </div>
</template>
