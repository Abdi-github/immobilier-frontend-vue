<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronDown } from 'lucide-vue-next';
import Button from 'primevue/button';
import Skeleton from 'primevue/skeleton';
import { usePopularCities } from '@/features/locations/composables/useCities';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import type { PopularCity } from '@/features/locations/types';

const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();
const showAll = ref(false);

const { data: citiesData, isLoading } = usePopularCities();

const cities = computed<PopularCity[]>(() => citiesData.value?.data || []);
const displayCities = computed(() => (showAll.value ? cities.value : cities.value.slice(0, 6)));

const placeholderImage =
  'https://res.cloudinary.com/dzyyygr1x/image/upload/v1770906733/Gen%C3%A8ve_t33k2z.jpg';

function getCityName(city: PopularCity) {
  return getLocalizedName(city.name);
}

function getCantonName(city: PopularCity) {
  return getLocalizedName(city.canton_name);
}
</script>

<template>
  <!-- Loading -->
  <section v-if="isLoading" class="bg-white py-12">
    <div class="container mx-auto px-4">
      <div class="mb-8 text-center">
        <Skeleton class="mx-auto !h-8 !w-64" />
        <Skeleton class="mx-auto mt-2 !h-4 !w-96" />
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton v-for="i in 6" :key="i" class="!h-48 rounded-lg" />
      </div>
    </div>
  </section>

  <!-- Content -->
  <section v-else-if="cities.length" class="bg-white py-12">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h2 class="text-2xl font-bold text-[#1a1a2e] md:text-3xl">
          {{ t('cityListings.title', 'Discover properties by city') }}
        </h2>
        <p class="mt-2 text-gray-600">
          {{ t('cityListings.subtitle', "Browse real estate in Switzerland's most popular cities") }}
        </p>
      </div>

      <!-- City tiles — alternating 1/3 + 2/3 layout -->
      <div class="flex flex-col gap-4">
        <div
          v-for="(_, rowIdx) in Array.from({ length: Math.ceil(displayCities.length / 2) })"
          :key="rowIdx"
          class="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          <!-- First tile -->
          <div
            v-if="displayCities[rowIdx * 2]"
            class="group relative min-h-[200px] overflow-hidden rounded-xl"
            :class="rowIdx % 2 === 0 ? 'md:col-span-1' : 'md:col-span-2'"
          >
            <div class="absolute inset-0">
              <img
                :src="displayCities[rowIdx * 2].image_url || placeholderImage"
                :alt="getCityName(displayCities[rowIdx * 2])"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
            </div>
            <div class="relative flex h-full flex-col justify-end p-5">
              <h3 class="text-xl font-bold text-white md:text-2xl">
                {{ getCityName(displayCities[rowIdx * 2]) }}
              </h3>
              <span class="text-sm text-white/80">
                {{ getCantonName(displayCities[rowIdx * 2]) }}
                ({{ displayCities[rowIdx * 2].canton_code }})
              </span>
              <div class="mt-3 flex flex-wrap gap-3">
                <router-link
                  v-if="displayCities[rowIdx * 2].rent_count > 0"
                  :to="`/${locale}/properties?transaction_type=rent&city_name=${encodeURIComponent(getCityName(displayCities[rowIdx * 2]))}`"
                  class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  {{ displayCities[rowIdx * 2].rent_count }} {{ t('cityListings.toRent', 'to rent') }}
                </router-link>
                <router-link
                  v-if="displayCities[rowIdx * 2].buy_count > 0"
                  :to="`/${locale}/properties?transaction_type=buy&city_name=${encodeURIComponent(getCityName(displayCities[rowIdx * 2]))}`"
                  class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  {{ displayCities[rowIdx * 2].buy_count }} {{ t('cityListings.toBuy', 'to buy') }}
                </router-link>
              </div>
            </div>
          </div>

          <!-- Second tile -->
          <div
            v-if="displayCities[rowIdx * 2 + 1]"
            class="group relative min-h-[200px] overflow-hidden rounded-xl"
            :class="rowIdx % 2 === 0 ? 'md:col-span-2' : 'md:col-span-1'"
          >
            <div class="absolute inset-0">
              <img
                :src="displayCities[rowIdx * 2 + 1].image_url || placeholderImage"
                :alt="getCityName(displayCities[rowIdx * 2 + 1])"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
            </div>
            <div class="relative flex h-full flex-col justify-end p-5">
              <h3 class="text-xl font-bold text-white md:text-2xl">
                {{ getCityName(displayCities[rowIdx * 2 + 1]) }}
              </h3>
              <span class="text-sm text-white/80">
                {{ getCantonName(displayCities[rowIdx * 2 + 1]) }}
                ({{ displayCities[rowIdx * 2 + 1].canton_code }})
              </span>
              <div class="mt-3 flex flex-wrap gap-3">
                <router-link
                  v-if="displayCities[rowIdx * 2 + 1].rent_count > 0"
                  :to="`/${locale}/properties?transaction_type=rent&city_name=${encodeURIComponent(getCityName(displayCities[rowIdx * 2 + 1]))}`"
                  class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  {{ displayCities[rowIdx * 2 + 1].rent_count }} {{ t('cityListings.toRent', 'to rent') }}
                </router-link>
                <router-link
                  v-if="displayCities[rowIdx * 2 + 1].buy_count > 0"
                  :to="`/${locale}/properties?transaction_type=buy&city_name=${encodeURIComponent(getCityName(displayCities[rowIdx * 2 + 1]))}`"
                  class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  {{ displayCities[rowIdx * 2 + 1].buy_count }} {{ t('cityListings.toBuy', 'to buy') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- See more -->
      <div v-if="!showAll && cities.length > 6" class="mt-8 text-center">
        <Button severity="secondary" outlined class="gap-2" @click="showAll = true">
          {{ t('cityListings.seeMore', 'See other cities') }}
          <ChevronDown class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </section>
</template>
