<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Building2, Home, Store, Warehouse, TreePine, Castle } from 'lucide-vue-next';
import Skeleton from 'primevue/skeleton';
import { useCategories } from '@/features/locations/composables/useCategories';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import type { Component } from 'vue';

const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();
const { data, isLoading } = useCategories();

const categoryIcons: Record<string, Component> = {
  apartment: Building2,
  house: Home,
  villa: Castle,
  studio: Building2,
  commercial: Store,
  office: Building2,
  warehouse: Warehouse,
  land: TreePine,
  parking: Warehouse,
};
</script>

<template>
  <section class="py-16 md:py-20">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-bold text-[#1a1a2e]">{{ t('categories.title') }}</h2>
        <p class="mt-2 text-gray-600">{{ t('categories.subtitle') }}</p>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Skeleton v-for="i in 8" :key="i" class="!h-32 rounded-xl" />
      </div>

      <!-- Categories grid -->
      <div v-else class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <router-link
          v-for="category in data?.data?.slice(0, 8)"
          :key="category.id"
          :to="`/${locale}/properties?category_id=${category.id}`"
          class="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-primary hover:shadow-md"
        >
          <div class="mb-3 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
            <component :is="categoryIcons[category.slug] || Building2" class="h-6 w-6 text-primary" />
          </div>
          <h3 class="font-semibold text-[#1a1a2e]">
            {{ getLocalizedName(category.name) }}
          </h3>
          <p v-if="category.count !== undefined" class="mt-1 text-sm text-gray-500">
            {{ category.count }} properties
          </p>
        </router-link>
      </div>
    </div>
  </section>
</template>
