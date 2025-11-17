<script setup lang="ts">
import { computed, defineAsyncComponent, toRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  MapPin,
  BedDouble,
  Maximize,
  Calendar,
  Building2,
  ChevronRight,
  Heart,
  Share2,
  Printer,
} from 'lucide-vue-next';
import { formatPrice, formatArea, formatDate } from '@/shared/utils/formatters';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import SEO from '@/shared/components/SEO.vue';
import Skeleton from 'primevue/skeleton';
import PropertyGallery from '../components/PropertyGallery.vue';
import PropertyAmenities from '../components/PropertyAmenities.vue';
import PropertyContact from '../components/PropertyContact.vue';
const PropertyMap = defineAsyncComponent(() => import('../components/PropertyMap.vue'));
import { useProperty, usePropertyImages } from '../composables/useProperty';

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();

function handlePrint() {
  window.print();
}

const propertyId = toRef(() => (route.params.id as string) || '');

const { data: propertyData, isLoading, isError } = useProperty(propertyId);
const { data: imagesData } = usePropertyImages(propertyId);

const property = computed(() => propertyData.value?.data);
const images = computed(
  () => imagesData.value?.data || property.value?.images || [],
);
</script>

<template>
  <div data-testid="property-detail-page" class="min-h-screen bg-gray-50">
    <SEO
      v-if="property"
      :title="property.title"
      :description="property.description?.slice(0, 160)"
      :image="images?.[0]?.url"
    />

    <!-- Loading state -->
    <div v-if="isLoading" class="container mx-auto px-4 py-8">
      <Skeleton width="16rem" height="2rem" class="mb-4" />
      <Skeleton width="100%" height="0" class="!aspect-video rounded-xl" />
      <div class="mt-8 grid gap-8 lg:grid-cols-3">
        <div class="space-y-4 lg:col-span-2">
          <Skeleton width="12rem" height="2.5rem" />
          <Skeleton width="100%" height="1.5rem" />
          <Skeleton width="75%" height="1.5rem" />
          <Skeleton width="100%" height="8rem" />
        </div>
        <div>
          <Skeleton width="100%" height="24rem" border-radius="0.75rem" />
        </div>
      </div>
    </div>

    <!-- Error / Not found -->
    <div
      v-else-if="isError || !property"
      class="container mx-auto flex flex-col items-center justify-center px-4 py-20"
    >
      <Building2 class="h-16 w-16 text-gray-400" />
      <h1 class="mt-4 text-2xl font-bold">{{ t('properties.detail.notFound') }}</h1>
      <p class="mt-2 text-gray-500">{{ t('properties.detail.notFoundDescription') }}</p>
      <button
        class="mt-6 rounded-md bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"
        @click="router.push(`/${locale}/properties`)"
      >
        {{ t('properties.detail.backToList') }}
      </button>
    </div>

    <!-- Main content -->
    <template v-else>
      <!-- Breadcrumb -->
      <div class="border-b bg-white">
        <div class="container mx-auto px-4 py-4">
          <nav class="flex items-center gap-2 text-sm text-gray-500">
            <router-link :to="`/${locale}`" class="hover:text-primary">
              {{ t('common.nav.home') }}
            </router-link>
            <ChevronRight class="h-4 w-4" />
            <router-link :to="`/${locale}/properties`" class="hover:text-primary">
              {{ t('common.nav.properties') }}
            </router-link>
            <ChevronRight class="h-4 w-4" />
            <span class="truncate text-gray-900">{{ property.title }}</span>
          </nav>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="rounded-full px-3 py-1 text-xs font-medium"
                :class="
                  property.transaction_type === 'rent'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                "
              >
                {{ t(`common.transaction.${property.transaction_type}`) }}
              </span>
              <span
                v-if="property.category"
                class="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {{ getLocalizedName(property.category.name) }}
              </span>
            </div>
            <h1 class="mt-2 text-2xl font-bold md:text-3xl">{{ property.title }}</h1>
            <div class="mt-2 flex items-center gap-1 text-gray-500">
              <MapPin class="h-4 w-4" />
              <span>
                {{ property.address }}
                <template v-if="property.city"
                  >, {{ getLocalizedName(property.city.name) }}</template
                >
                <template v-if="property.canton"> ({{ property.canton.code }})</template>
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              aria-label="Add to favorites"
              class="rounded-md border border-gray-300 p-2 transition-colors hover:bg-gray-50"
            >
              <Heart class="h-4 w-4" />
            </button>
            <button
              aria-label="Share property"
              class="rounded-md border border-gray-300 p-2 transition-colors hover:bg-gray-50"
            >
              <Share2 class="h-4 w-4" />
            </button>
            <button
              aria-label="Print property"
              class="rounded-md border border-gray-300 p-2 transition-colors hover:bg-gray-50"
              @click="handlePrint"
            >
              <Printer class="h-4 w-4" />
            </button>
          </div>
        </div>

        <!-- Image gallery -->
        <PropertyGallery :images="images" :title="property.title" />

        <!-- Main content grid -->
        <div class="mt-8 grid gap-8 lg:grid-cols-3">
          <!-- Left column - Details -->
          <div class="space-y-8 lg:col-span-2">
            <!-- Price and key features -->
            <div class="rounded-xl bg-white p-6 shadow-sm">
              <div
                class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p class="text-sm text-gray-500">{{ t('properties.detail.price') }}</p>
                  <p class="text-3xl font-bold text-primary">
                    {{ formatPrice(property.price, property.currency) }}
                    <span
                      v-if="property.transaction_type === 'rent'"
                      class="text-lg font-normal text-gray-500"
                    >
                      {{ t('common.units.perMonth') }}
                    </span>
                  </p>
                  <p
                    v-if="property.additional_costs && property.additional_costs > 0"
                    class="text-sm text-gray-500"
                  >
                    + {{ formatPrice(property.additional_costs, property.currency) }}
                    {{ t('properties.detail.additionalCosts') }}
                  </p>
                </div>

                <div class="flex gap-6">
                  <div
                    v-if="property.rooms !== undefined && property.rooms > 0"
                    class="text-center"
                  >
                    <BedDouble class="mx-auto h-6 w-6 text-primary" />
                    <p class="mt-1 text-lg font-semibold">{{ property.rooms }}</p>
                    <p class="text-xs text-gray-500">
                      {{ property.rooms === 1 ? t('common.rooms_one') : t('common.rooms_other') }}
                    </p>
                  </div>
                  <div
                    v-if="property.surface !== undefined && property.surface > 0"
                    class="text-center"
                  >
                    <Maximize class="mx-auto h-6 w-6 text-primary" />
                    <p class="mt-1 text-lg font-semibold">{{ formatArea(property.surface) }}</p>
                    <p class="text-xs text-gray-500">{{ t('properties.detail.surface') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="rounded-xl bg-white p-6 shadow-sm">
              <h2 class="text-xl font-semibold">{{ t('properties.detail.description') }}</h2>
              <hr class="my-4" />
              <p class="whitespace-pre-line text-gray-500">{{ property.description }}</p>
            </div>

            <!-- Amenities -->
            <div
              v-if="property.amenities && property.amenities.length > 0"
              class="rounded-xl bg-white p-6 shadow-sm"
            >
              <PropertyAmenities :amenity-ids="property.amenities" />
            </div>

            <!-- Location details -->
            <div class="rounded-xl bg-white p-6 shadow-sm">
              <h2 class="text-xl font-semibold">{{ t('properties.detail.location') }}</h2>
              <hr class="my-4" />
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <p class="text-sm text-gray-500">{{ t('properties.detail.address') }}</p>
                  <p class="font-medium">{{ property.address }}</p>
                </div>
                <div v-if="property.city">
                  <p class="text-sm text-gray-500">{{ t('properties.detail.city') }}</p>
                  <p class="font-medium">{{ getLocalizedName(property.city.name) }}</p>
                </div>
                <div v-if="property.canton">
                  <p class="text-sm text-gray-500">{{ t('properties.detail.canton') }}</p>
                  <p class="font-medium">
                    {{ getLocalizedName(property.canton.name) }} ({{ property.canton.code }})
                  </p>
                </div>
                <div v-if="property.postal_code">
                  <p class="text-sm text-gray-500">{{ t('properties.detail.postalCode') }}</p>
                  <p class="font-medium">{{ property.postal_code }}</p>
                </div>
              </div>

              <!-- Map -->
              <div class="mt-6">
                <PropertyMap :address="property.address" />
              </div>
            </div>

            <!-- Proximity / Nearby -->
            <div
              v-if="property.proximity && Object.keys(property.proximity).length > 0"
              class="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 class="text-xl font-semibold">{{ t('properties.detail.nearby') }}</h2>
              <hr class="my-4" />
              <div class="grid gap-3 sm:grid-cols-2">
                <div
                  v-for="(value, key) in property.proximity"
                  :key="key"
                  class="flex justify-between"
                >
                  <span class="text-gray-500">{{ key }}</span>
                  <span class="font-medium">{{ value }}</span>
                </div>
              </div>
            </div>

            <!-- Meta info -->
            <div class="flex flex-wrap gap-4 text-sm text-gray-500">
              <div v-if="property.published_at" class="flex items-center gap-1">
                <Calendar class="h-4 w-4" />
                <span>
                  {{ t('properties.detail.publishedOn') }}
                  {{ formatDate(property.published_at, locale) }}
                </span>
              </div>
              <div>
                <span>{{ t('properties.detail.reference') }}: {{ property.external_id }}</span>
              </div>
            </div>
          </div>

          <!-- Right column - Contact form -->
          <div class="lg:sticky lg:top-24 lg:self-start">
            <PropertyContact :property="property" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
