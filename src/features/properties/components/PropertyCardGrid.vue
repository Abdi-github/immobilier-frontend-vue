<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Heart, Building2, Bed, Maximize, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { formatPrice } from '@/shared/utils/formatters';
import type { Property } from '../types';

const props = withDefaults(
  defineProps<{
    property: Property;
    isFavorite?: boolean;
  }>(),
  { isFavorite: false },
);

const emit = defineEmits<{
  favorite: [id: string];
}>();

const { locale } = useI18n();
const getLocalizedName = useLocalizedName();

const currentImageIndex = ref(0);
const isHovering = ref(false);

const propertyImages = computed(() => props.property.images ?? []);
const hasMultipleImages = computed(() => propertyImages.value.length > 1);
const currentImage = computed(() => propertyImages.value[currentImageIndex.value]);

const isNew = computed(() => {
  if (!props.property.published_at) return false;
  const diff = Date.now() - new Date(props.property.published_at).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) <= 7;
});

const detailUrl = computed(() => `/${locale.value}/properties/${props.property.id}`);
const categoryName = computed(() => getLocalizedName(props.property.category?.name));
const cityName = computed(() => getLocalizedName(props.property.city?.name));

const priceDisplay = computed(() => {
  const base = formatPrice(props.property.price, props.property.currency);
  if (!props.property.price) return base;
  return `${base}.-`;
});

function prevImage(e: Event) {
  e.preventDefault();
  e.stopPropagation();
  currentImageIndex.value =
    currentImageIndex.value === 0
      ? propertyImages.value.length - 1
      : currentImageIndex.value - 1;
}

function nextImage(e: Event) {
  e.preventDefault();
  e.stopPropagation();
  currentImageIndex.value =
    currentImageIndex.value === propertyImages.value.length - 1
      ? 0
      : currentImageIndex.value + 1;
}

function goToImage(idx: number, e: Event) {
  e.preventDefault();
  e.stopPropagation();
  currentImageIndex.value = idx;
}
</script>

<template>
  <router-link
    :to="detailUrl"
    class="group block overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg"
    :data-testid="`property-card-${property.id}`"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <!-- Image section with carousel -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <img
        v-if="currentImage?.url"
        :src="currentImage.url"
        :alt="`${property.title} - Image ${currentImageIndex + 1}`"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="flex h-full w-full items-center justify-center">
        <Building2 class="h-12 w-12 text-gray-300" />
      </div>

      <!-- Carousel arrows (visible on hover) -->
      <template v-if="hasMultipleImages">
        <button
          class="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-opacity hover:bg-white"
          :class="isHovering ? 'opacity-100' : 'opacity-0'"
          aria-label="Previous image"
          @click="prevImage"
        >
          <ChevronLeft class="h-5 w-5" />
        </button>
        <button
          class="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-opacity hover:bg-white"
          :class="isHovering ? 'opacity-100' : 'opacity-0'"
          aria-label="Next image"
          @click="nextImage"
        >
          <ChevronRight class="h-5 w-5" />
        </button>
      </template>

      <!-- NEW badge -->
      <div v-if="isNew" class="absolute left-3 top-3">
        <span class="rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white">NEW</span>
      </div>

      <!-- Favorite button -->
      <button
        type="button"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white"
        @click.prevent.stop="emit('favorite', property.id)"
      >
        <Heart
          class="h-5 w-5"
          :class="isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'"
        />
      </button>

      <!-- Image dots / counter -->
      <div
        v-if="hasMultipleImages"
        class="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
      >
        <!-- Dots for ≤5 images -->
        <template v-if="propertyImages.length <= 5">
          <button
            v-for="(_, idx) in propertyImages"
            :key="idx"
            class="h-2 w-2 rounded-full transition-colors"
            :class="idx === currentImageIndex ? 'bg-white' : 'bg-white/50'"
            :aria-label="`Go to image ${idx + 1}`"
            @click="goToImage(idx, $event)"
          />
        </template>
        <!-- Counter for >5 images -->
        <span
          v-else
          class="rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white"
        >
          {{ currentImageIndex + 1 }} / {{ propertyImages.length }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Price -->
      <div class="text-lg font-bold text-[#1a1a2e]">
        {{ priceDisplay }}
        <span v-if="property.transaction_type === 'rent'" class="font-normal text-gray-600">/month</span>
        <span
          v-if="property.additional_costs && property.additional_costs > 0"
          class="ml-1 text-sm font-normal text-gray-500"
        >
          (+{{ property.additional_costs }}.- costs)
        </span>
      </div>

      <!-- Type and rooms -->
      <p class="mt-1 text-sm text-gray-700">
        {{ categoryName }}
        <template v-if="property.rooms"> {{ property.rooms }} rooms</template>
      </p>

      <!-- Location -->
      <p class="mt-1 truncate text-sm text-gray-500">
        {{ cityName }}<template v-if="property.address">, {{ property.address }}</template>
      </p>

      <!-- Features row -->
      <div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
        <div class="flex items-center gap-3 text-sm text-gray-600">
          <div v-if="property.surface" class="flex items-center gap-1">
            <Maximize class="h-4 w-4" />
            <span>{{ property.surface }} m²</span>
          </div>
          <div v-if="property.rooms" class="flex items-center gap-1">
            <Bed class="h-4 w-4" />
            <span>{{ property.rooms }}</span>
          </div>
        </div>

        <!-- Agency logo -->
        <div v-if="property.agency" class="shrink-0">
          <img
            v-if="property.agency.logo_url"
            :src="property.agency.logo_url"
            :alt="property.agency.name || 'Agency'"
            class="h-8 max-w-[80px] object-contain"
          />
          <div
            v-else
            class="flex h-8 items-center rounded bg-gray-100 px-2 text-xs text-gray-500"
          >
            {{ property.agency.name?.slice(0, 10) || 'Agency' }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
