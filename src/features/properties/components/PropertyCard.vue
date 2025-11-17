<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Heart, Building2, Bed, Maximize } from 'lucide-vue-next';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { formatPrice } from '@/shared/utils/formatters';
import type { Property } from '../types';

const props = withDefaults(
  defineProps<{
    property: Property;
    variant?: 'grid' | 'list';
    isFavorite?: boolean;
  }>(),
  {
    variant: 'grid',
    isFavorite: false,
  },
);

const emit = defineEmits<{
  favorite: [id: string];
}>();

const { locale } = useI18n();
const getLocalizedName = useLocalizedName();

const primaryImage = computed(
  () => props.property.images?.find((img) => img.is_primary) || props.property.images?.[0],
);

const detailUrl = computed(() => `/${locale.value}/properties/${props.property.id}`);
const categoryName = computed(() => getLocalizedName(props.property.category?.name));
const cityName = computed(() => getLocalizedName(props.property.city?.name));

const priceDisplay = computed(() => {
  const base = formatPrice(props.property.price, props.property.currency);
  if (props.property.price === null || props.property.price === undefined || props.property.price === 0) return base;
  return props.property.transaction_type === 'rent' ? `${base}.-/month` : `${base}.-`;
});
</script>

<template>
  <article
    :data-testid="`property-card-${property.id}`"
    class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    :class="variant === 'list' && 'flex flex-row'"
  >
    <!-- Image -->
    <router-link
      :to="detailUrl"
      class="relative block overflow-hidden bg-gray-100"
      :class="variant === 'grid' ? 'aspect-[4/3]' : 'w-64 shrink-0'"
    >
      <img
        v-if="primaryImage?.url"
        :src="primaryImage.url"
        :alt="property.title"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="flex h-full w-full items-center justify-center">
        <Building2 class="h-12 w-12 text-gray-300" />
      </div>

      <!-- Favorite button -->
      <button
        type="button"
        class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all hover:bg-white"
        @click.prevent.stop="emit('favorite', property.id)"
      >
        <Heart
          class="h-4 w-4 transition-colors"
          :class="isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'"
        />
      </button>

      <!-- Image count -->
      <span
        v-if="property.images && property.images.length > 1"
        class="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white"
      >
        1 / {{ property.images.length }}
      </span>
    </router-link>

    <!-- Content -->
    <div
      class="flex flex-1 flex-col p-4"
      :class="variant === 'list' && 'justify-between'"
    >
      <!-- Price -->
      <div class="mb-2">
        <span class="text-lg font-bold text-[#1a1a2e]">{{ priceDisplay }}</span>
        <span
          v-if="property.additional_costs && property.additional_costs > 0"
          class="ml-1 text-sm text-gray-500"
        >
          (+{{ property.additional_costs }}.- costs)
        </span>
      </div>

      <!-- Type and rooms -->
      <div class="mb-1 text-sm font-medium text-gray-800">
        {{ categoryName }}
        <template v-if="property.rooms"> {{ property.rooms }} rooms</template>
      </div>

      <!-- Address -->
      <div class="mb-3 text-sm text-gray-600">
        {{ cityName }}<template v-if="property.address">, {{ property.address }}</template>
        <template v-if="property.canton?.code"> ({{ property.canton.code }})</template>
      </div>

      <!-- Features -->
      <div class="flex items-center gap-4 text-sm text-gray-500">
        <div v-if="property.surface && property.surface > 0" class="flex items-center gap-1">
          <Maximize class="h-4 w-4" />
          <span>{{ property.surface }} m²</span>
        </div>
        <div v-if="property.rooms && property.rooms > 0" class="flex items-center gap-1">
          <Bed class="h-4 w-4" />
          <span>{{ property.rooms }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
