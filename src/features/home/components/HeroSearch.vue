<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Search, MapPin, ChevronRight } from 'lucide-vue-next';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';

type TransactionType = 'rent' | 'buy';
type PropertySection = 'residential' | 'commercial';

const { t, locale } = useI18n();
const router = useRouter();
const getLocalizedName = useLocalizedName();

const section = ref<PropertySection>('residential');
const transactionType = ref<TransactionType>('rent');
const cantonId = ref<string | null>(null);

const { data: cantonsData } = useCantons();

const cantonOptions = computed(() => {
  const cantons = cantonsData.value?.data || [];
  return [
    { label: t('hero.allLocations', 'All locations'), value: null },
    ...cantons.map((c) => ({
      label: getLocalizedName(c.name),
      value: c.id,
    })),
  ];
});

function handleSearch() {
  const params = new URLSearchParams();
  params.set('transaction_type', transactionType.value);
  if (cantonId.value) params.set('canton_id', cantonId.value);
  router.push(`/${locale.value}/properties?${params.toString()}`);
}
</script>

<template>
  <section class="relative bg-gradient-to-b from-[#f8f9fa] to-white py-12 md:py-16" data-testid="hero-section">
    <div class="container mx-auto px-4">
      <div class="mx-auto max-w-3xl">
        <!-- Hero title -->
        <h1 class="mb-8 text-center text-3xl font-bold text-[#1a1a2e] md:text-4xl lg:text-5xl">
          {{ t('hero.title', 'Your project starts here') }}
        </h1>

        <!-- Search box -->
        <div class="rounded-lg bg-white p-4 shadow-lg md:p-6">
          <!-- Section tabs: Residential | Commercial | Estimate -->
          <div class="mb-4 flex justify-center border-b border-gray-200">
            <button
              type="button"
              class="relative px-6 py-3 text-sm font-medium transition-colors"
              :class="section === 'residential'
                ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                : 'text-gray-500 hover:text-gray-700'"
              @click="section = 'residential'"
            >
              {{ t('hero.residential', 'Residential') }}
            </button>
            <button
              type="button"
              class="relative px-6 py-3 text-sm font-medium transition-colors"
              :class="section === 'commercial'
                ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                : 'text-gray-500 hover:text-gray-700'"
              @click="section = 'commercial'"
            >
              {{ t('hero.commercial', 'Commercial') }}
            </button>
            <button
              type="button"
              class="relative px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {{ t('hero.estimate', 'Estimate') }}
            </button>
          </div>

          <!-- Rent/Buy radio buttons -->
          <div class="mb-4 flex items-center justify-center gap-6">
            <label class="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="transactionType"
                :checked="transactionType === 'buy'"
                class="h-4 w-4 border-gray-300 text-primary accent-primary"
                @change="transactionType = 'buy'"
              />
              <span class="text-sm font-medium text-gray-700">
                {{ t('common:transaction.buy', 'Buy') }}
              </span>
            </label>
            <label class="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="transactionType"
                :checked="transactionType === 'rent'"
                class="h-4 w-4 border-gray-300 text-primary accent-primary"
                @change="transactionType = 'rent'"
              />
              <span class="text-sm font-medium text-gray-700">
                {{ t('common:transaction.rent', 'Rent') }}
              </span>
            </label>
          </div>

          <!-- Location search -->
          <div class="flex gap-2">
            <div class="relative flex-1">
              <MapPin class="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Select
                v-model="cantonId"
                :options="cantonOptions"
                option-label="label"
                option-value="value"
                :placeholder="t('hero.wherePlaceholder', 'Where? (cities, ZIP, districts, cantons)')"
                class="h-12 w-full pl-8"
                filter
              />
            </div>
            <Button
              :aria-label="t('quickSearch.searchButton', 'Search')"
              class="h-12 px-6"
              @click="handleSearch"
            >
              <Search class="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <!-- Services section -->
      <div class="mt-12">
        <h2 class="mb-6 text-center text-lg font-semibold text-gray-600">
          {{ t('services.title', 'Our services to support you') }}
        </h2>
        <div class="grid gap-4 md:grid-cols-3">
          <!-- Estimate card -->
          <div class="group cursor-pointer rounded-lg bg-gradient-to-br from-primary/90 to-primary p-6 text-white shadow-md transition-transform hover:scale-[1.02]">
            <div class="mb-2 text-xl font-bold">{{ t('services.estimate.title', 'Estimate') }}</div>
            <div class="text-sm opacity-90">{{ t('services.estimate.subtitle', 'your property') }}</div>
            <div class="mt-1 text-xs font-semibold uppercase">{{ t('services.estimate.tag', 'for free') }}</div>
            <ChevronRight class="mt-4 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </div>

          <!-- e-Tenant card -->
          <div class="group cursor-pointer rounded-lg bg-gradient-to-br from-[#4a90d9] to-[#3a7bc8] p-6 text-white shadow-md transition-transform hover:scale-[1.02]">
            <div class="mb-2 text-xl font-bold">{{ t('services.eTenant.title', 'Apply') }}</div>
            <div class="text-sm opacity-90">{{ t('services.eTenant.subtitle', 'for a rental') }}</div>
            <div class="mt-1 text-xs font-semibold uppercase">{{ t('services.eTenant.tag', 'with e-Tenant') }}</div>
            <ChevronRight class="mt-4 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </div>

          <!-- Find agency card -->
          <div class="group cursor-pointer rounded-lg bg-gradient-to-br from-[#2d3748] to-[#1a202c] p-6 text-white shadow-md transition-transform hover:scale-[1.02]">
            <div class="mb-2 text-xl font-bold">{{ t('services.findAgency.title', 'Find') }}</div>
            <div class="text-sm opacity-90">{{ t('services.findAgency.subtitle', 'an agency') }}</div>
            <ChevronRight class="mt-4 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
