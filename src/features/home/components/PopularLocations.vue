<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MapPin } from 'lucide-vue-next';
import Skeleton from 'primevue/skeleton';
import Tag from 'primevue/tag';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';

const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();
const { data, isLoading } = useCantons();

const popularCantonCodes = ['ZH', 'GE', 'VD', 'BS', 'BE', 'TI'];

const cantonImages: Record<string, string> = {
  ZH: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=300&fit=crop',
  GE: 'https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=400&h=300&fit=crop',
  VD: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=300&fit=crop',
  BS: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=400&h=300&fit=crop',
  BE: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=300&fit=crop',
  TI: 'https://images.unsplash.com/photo-1583764028506-0d34d2c42a1c?w=400&h=300&fit=crop',
};

const popularCantons = computed(() =>
  data.value?.data?.filter((c) => popularCantonCodes.includes(c.code)) || [],
);
</script>

<template>
  <section class="bg-gray-50 py-16 md:py-20">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-bold text-[#1a1a2e]">{{ t('locations.title') }}</h2>
        <p class="mt-2 text-gray-600">{{ t('locations.subtitle') }}</p>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton v-for="i in 6" :key="i" class="!aspect-[4/3] rounded-xl" />
      </div>

      <!-- Canton cards -->
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <router-link
          v-for="canton in popularCantons"
          :key="canton.id"
          :to="`/${locale}/properties?canton_id=${canton.id}`"
          class="group overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-lg"
        >
          <div class="relative aspect-[4/3]">
            <img
              :src="cantonImages[canton.code] || cantonImages.ZH"
              :alt="getLocalizedName(canton.name)"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div class="absolute inset-x-0 bottom-0 p-4 text-white">
              <div class="flex items-center gap-2">
                <MapPin class="h-5 w-5" />
                <h3 class="text-xl font-bold">{{ getLocalizedName(canton.name) }}</h3>
              </div>
              <div class="mt-2 flex items-center gap-2">
                <Tag :value="canton.code" severity="secondary" class="bg-white/20 text-white" />
                <span v-if="canton.propertyCount !== undefined" class="text-sm text-white/80">
                  {{ canton.propertyCount }} properties
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>
