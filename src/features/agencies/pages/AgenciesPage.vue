<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Search, Building2, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import SEO from '@/shared/components/SEO.vue';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useCities } from '@/features/locations/composables/useCities';
import { useAgencies } from '../composables/useAgencies';
import Skeleton from 'primevue/skeleton';
import AgencyCard from '../components/AgencyCard.vue';
import AgencySearchInput from '../components/AgencySearchInput.vue';
import type { SearchResult } from '../components/AgencySearchInput.vue';

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();

const LIMIT = 20;

// Read URL params
const cantonId = computed(() => (route.query.canton_id as string) || '');
const cityId = computed(() => (route.query.city_id as string) || '');
const searchParam = computed(() => (route.query.search as string) || '');
const currentPage = computed(() => parseInt((route.query.page as string) || '1', 10));

// Local state for agency name input
const agencyNameSearch = ref(searchParam.value);
watch(searchParam, (val) => {
  agencyNameSearch.value = val;
});

const hasSearchCriteria = computed(
  () => !!(cantonId.value || cityId.value || searchParam.value),
);

// Query params — only query when search criteria present
const queryParams = computed(() => {
  if (!hasSearchCriteria.value) return undefined;
  return {
    page: currentPage.value,
    limit: LIMIT,
    search: searchParam.value || undefined,
    canton_id: cantonId.value || undefined,
    city_id: cityId.value || undefined,
  };
});

const { data: agenciesData, isLoading, isFetching } = useAgencies(queryParams);
const { data: cantonsData } = useCantons();
const { data: citiesData } = useCities();

const agencies = computed(() => agenciesData.value?.data || []);
const pagination = computed(() => agenciesData.value?.meta);
const totalPages = computed(() => pagination.value?.totalPages || 1);

// Location info for display
const locationInfo = computed(() => {
  const cantons = cantonsData.value?.data || [];
  const cities = citiesData.value?.data || [];

  if (cityId.value) {
    const city = cities.find((c) => c.id === cityId.value);
    if (city) {
      const canton = cantons.find((c) => c.id === city.canton_id);
      return {
        type: 'city' as const,
        name: getLocalizedName(city.name),
        cantonName: canton ? getLocalizedName(canton.name) : '',
      };
    }
  }
  if (cantonId.value) {
    const canton = cantons.find((c) => c.id === cantonId.value);
    if (canton) {
      return {
        type: 'canton' as const,
        name: getLocalizedName(canton.name),
      };
    }
  }
  return null;
});

function updateQuery(params: Record<string, string>) {
  router.push({ query: { ...params } });
}

function handleLocationSelect(result: SearchResult) {
  const params: Record<string, string> = { page: '1' };
  if (result.type === 'canton') {
    params.canton_id = result.id;
  } else {
    params.city_id = result.id;
  }
  if (agencyNameSearch.value) {
    params.search = agencyNameSearch.value;
  }
  updateQuery(params);
}

function handleAgencySearch() {
  const params: Record<string, string> = { page: '1' };
  if (cantonId.value) params.canton_id = cantonId.value;
  if (cityId.value) params.city_id = cityId.value;
  if (agencyNameSearch.value) params.search = agencyNameSearch.value;
  updateQuery(params);
}

function handlePageChange(page: number) {
  const params: Record<string, string> = { page: page.toString() };
  if (cantonId.value) params.canton_id = cantonId.value;
  if (cityId.value) params.city_id = cityId.value;
  if (searchParam.value) params.search = searchParam.value;
  updateQuery(params);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleClearSearch() {
  agencyNameSearch.value = '';
  router.push({ query: {} });
}

// Pagination page numbers
const pageNumbers = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages: number[] = [];
  const count = Math.min(total, 5);

  for (let i = 0; i < count; i++) {
    let page: number;
    if (total <= 5) {
      page = i + 1;
    } else if (current <= 3) {
      page = i + 1;
    } else if (current >= total - 2) {
      page = total - 4 + i;
    } else {
      page = current - 2 + i;
    }
    pages.push(page);
  }
  return pages;
});
</script>

<template>
  <div data-testid="agencies-page" class="min-h-screen bg-gray-50">
    <SEO
      :title="t('agencies.seo.title')"
      :description="t('agencies.seo.description')"
    />

    <!-- Hero Banner with Search -->
    <div
      class="relative bg-cover bg-center"
      :style="{
        backgroundImage:
          'linear-gradient(rgba(26, 26, 46, 0.7), rgba(26, 26, 46, 0.8)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80)',
        minHeight: hasSearchCriteria ? '200px' : '400px',
      }"
    >
      <div class="mx-auto max-w-4xl px-4 py-12">
        <h1
          v-if="!hasSearchCriteria"
          class="mb-8 text-center text-3xl font-bold text-white md:text-4xl"
        >
          {{ t('agencies.hero.title') }}
        </h1>

        <!-- Search Form -->
        <div class="flex flex-col gap-3 md:flex-row md:gap-4">
          <AgencySearchInput @select="handleLocationSelect" />

          <!-- Agency Name Search -->
          <div class="relative flex-1">
            <Building2
              class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              v-model="agencyNameSearch"
              type="text"
              :placeholder="t('agencies.search.agencyNamePlaceholder')"
              class="h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              @keydown.enter="handleAgencySearch"
            />
          </div>

          <!-- Search Button -->
          <button
            :disabled="isFetching"
            class="flex h-12 items-center justify-center rounded-md bg-primary px-6 text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
            @click="handleAgencySearch"
          >
            <Search class="h-5 w-5" />
          </button>
        </div>

        <p
          v-if="!hasSearchCriteria"
          class="mt-4 text-center text-sm text-white/80"
        >
          {{ t('agencies.search.hint') }}
        </p>
      </div>
    </div>

    <!-- Results Section -->
    <div v-if="hasSearchCriteria" class="mx-auto max-w-5xl px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <router-link :to="`/${locale}`" class="hover:text-primary">
          {{ t('common.nav.home') }}
        </router-link>
        <ChevronRight class="h-4 w-4" />
        <button class="hover:text-primary" @click="handleClearSearch">
          {{ t('agencies.detail.title') }}
        </button>
        <template v-if="locationInfo">
          <ChevronRight class="h-4 w-4" />
          <span class="text-gray-900">{{ locationInfo.name }}</span>
        </template>
      </nav>

      <!-- Results Header -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900">
          <template v-if="locationInfo?.type === 'canton'">
            {{ t('agencies.results.titleCanton', { name: locationInfo.name }) }}
          </template>
          <template v-else-if="locationInfo?.type === 'city'">
            {{ t('agencies.results.titleCity', { name: locationInfo.name }) }}
          </template>
          <template v-else-if="searchParam">
            {{ t('agencies.results.titleSearch', { search: searchParam }) }}
          </template>
          <template v-else>
            {{ t('agencies.results.titleAll') }}
          </template>
        </h2>

        <p v-if="pagination" class="mt-2 text-sm text-gray-600">
          {{
            t('agencies.results.showing', {
              from: (currentPage - 1) * LIMIT + 1,
              to: Math.min(currentPage * LIMIT, pagination.total),
              total: pagination.total,
            })
          }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <div
          v-for="i in 5"
          :key="i"
          class="flex gap-4 rounded-lg border bg-white p-4"
        >
          <Skeleton width="5rem" height="5rem" border-radius="0.375rem" />
          <div class="flex-1 space-y-2">
            <Skeleton width="12rem" height="1.25rem" />
            <Skeleton width="16rem" height="1rem" />
            <Skeleton width="8rem" height="1rem" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="agencies.length === 0"
        class="rounded-lg border bg-white p-8 text-center"
      >
        <Building2 class="mx-auto h-12 w-12 text-gray-300" />
        <h3 class="mt-4 text-lg font-medium text-gray-900">
          {{ t('agencies.results.noResults') }}
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          {{ t('agencies.results.noResultsHint') }}
        </p>
        <button
          class="mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          @click="handleClearSearch"
        >
          {{ t('agencies.results.clearSearch') }}
        </button>
      </div>

      <!-- Agency List -->
      <div v-else class="space-y-4">
        <AgencyCard
          v-for="agency in agencies"
          :key="agency.id"
          :agency="agency"
        />
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="mt-8 flex items-center justify-center gap-2"
      >
        <button
          :disabled="currentPage === 1 || isFetching"
          class="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
          @click="handlePageChange(currentPage - 1)"
        >
          <ChevronLeft class="h-4 w-4" />
          {{ t('common.pagination.previous') }}
        </button>

        <div class="flex items-center gap-1">
          <button
            v-for="page in pageNumbers"
            :key="page"
            :disabled="isFetching"
            class="min-w-10 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50"
            :class="
              page === currentPage
                ? 'bg-primary text-white'
                : 'border border-gray-300 hover:bg-gray-50'
            "
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
        </div>

        <button
          :disabled="currentPage === totalPages || isFetching"
          class="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
          @click="handlePageChange(currentPage + 1)"
        >
          {{ t('common.pagination.next') }}
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Landing Content — when no search criteria -->
    <div v-if="!hasSearchCriteria" class="mx-auto max-w-5xl px-4 py-12">
      <div class="text-center">
        <Building2 class="mx-auto h-16 w-16 text-gray-300" />
        <h2 class="mt-6 text-2xl font-semibold text-gray-900">
          {{ t('agencies.landing.title') }}
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-gray-600">
          {{ t('agencies.landing.description') }}
        </p>
      </div>
    </div>
  </div>
</template>
