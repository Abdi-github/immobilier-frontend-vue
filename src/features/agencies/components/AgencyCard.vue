<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Building2, MapPin, Phone, Globe, CheckCircle } from 'lucide-vue-next';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import type { Agency } from '../types';

const props = defineProps<{
  agency: Agency;
}>();

const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();

const cityName = computed(() => {
  if (!props.agency.city) return '';
  return getLocalizedName(props.agency.city.name);
});

const isVerified = computed(() => props.agency.is_verified || props.agency.verified);

const websiteUrl = computed(() => {
  if (!props.agency.website) return '';
  return props.agency.website.startsWith('http')
    ? props.agency.website
    : `https://${props.agency.website}`;
});
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row"
  >
    <!-- Logo -->
    <div
      class="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border bg-gray-50"
    >
      <img
        v-if="agency.logo"
        :src="agency.logo"
        :alt="agency.name"
        class="h-full w-full rounded-md object-contain p-1"
      />
      <Building2 v-else class="h-10 w-10 text-gray-400" />
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col gap-2">
      <!-- Agency Name -->
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-gray-900">{{ agency.name }}</h3>
        <span v-if="isVerified" :title="t('agencies.card.verified')">
          <CheckCircle class="h-4 w-4 text-green-500" />
        </span>
      </div>

      <!-- Address -->
      <div class="flex items-start gap-1 text-sm text-gray-600">
        <MapPin class="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          {{ agency.address }}<br />
          {{ agency.postal_code }} {{ cityName }}
        </span>
      </div>

      <!-- Phone -->
      <div v-if="agency.phone" class="flex items-center gap-1 text-sm text-gray-600">
        <Phone class="h-4 w-4 shrink-0" />
        <a :href="`tel:${agency.phone}`" class="hover:text-primary">{{ agency.phone }}</a>
      </div>

      <!-- Properties count -->
      <p v-if="agency.total_properties > 0" class="text-sm text-gray-500">
        {{ t('agencies.card.propertiesCount', { count: agency.total_properties }) }}
        <router-link
          :to="`/${locale}/properties?agency_id=${agency.id}`"
          class="text-primary hover:underline"
        >
          {{ t('agencies.card.toBuy') }}
        </router-link>
      </p>
    </div>

    <!-- Actions -->
    <div class="flex shrink-0 flex-row gap-2 sm:flex-col">
      <router-link
        :to="`/${locale}/agencies/${agency.id}`"
        class="flex flex-1 items-center justify-center rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50 sm:flex-none"
      >
        {{ t('agencies.card.details') }}
      </router-link>

      <a
        v-if="agency.website"
        :href="websiteUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-1 items-center justify-center gap-1 rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50 sm:flex-none"
      >
        <Globe class="h-4 w-4" />
        {{ t('agencies.card.map') }}
      </a>

      <button
        class="flex flex-1 items-center justify-center rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50 sm:flex-none"
      >
        {{ t('agencies.card.contact') }}
      </button>
    </div>
  </div>
</template>
