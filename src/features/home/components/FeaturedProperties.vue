<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ArrowRight } from 'lucide-vue-next';
import Skeleton from 'primevue/skeleton';
import PropertyCard from '@/features/properties/components/PropertyCard.vue';
import { useFeaturedProperties } from '@/features/properties/composables/useProperties';

const { t, locale } = useI18n();
const { data, isLoading, isError } = useFeaturedProperties(6);
</script>

<template>
  <section v-if="!isError" class="bg-white py-12">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 class="text-2xl font-bold text-[#1a1a2e]">
          {{ t('featured.title', 'Latest properties') }}
        </h2>
        <router-link
          :to="`/${locale}/properties`"
          class="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {{ t('featured.viewAll', 'View all properties') }}
          <ArrowRight class="h-4 w-4" />
        </router-link>
      </div>

      <!-- Loading skeletons -->
      <div v-if="isLoading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <Skeleton class="!h-48 w-full" />
          <div class="space-y-3 p-4">
            <Skeleton class="!h-6 !w-1/3" />
            <Skeleton class="!h-5 !w-2/3" />
            <Skeleton class="!h-4 !w-1/2" />
            <div class="flex gap-4 pt-2">
              <Skeleton class="!h-4 !w-16" />
              <Skeleton class="!h-4 !w-16" />
            </div>
          </div>
        </div>
      </div>

      <!-- Property grid -->
      <div v-else-if="data?.data?.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PropertyCard
          v-for="property in data.data"
          :key="property.id"
          :property="property"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p class="text-gray-600">
          {{ t('featured.noProperties', 'No properties available at the moment.') }}
        </p>
      </div>
    </div>
  </section>
</template>
