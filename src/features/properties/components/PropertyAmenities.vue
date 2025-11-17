<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Check } from 'lucide-vue-next';
import { useAmenities } from '@/features/locations/composables/useAmenities';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';

const props = defineProps<{
  amenityIds: string[];
}>();

const { t } = useI18n();
const getLocalizedName = useLocalizedName();
const { data: amenitiesData, isLoading } = useAmenities();

const propertyAmenities = computed(() => {
  const allAmenities = (amenitiesData.value as any)?.data ?? amenitiesData.value ?? [];
  return props.amenityIds
    .map((id: string) => (allAmenities as any[]).find((a: { id: string }) => a.id === id))
    .filter((a: unknown): a is { id: string; name: Record<string, string> } => !!a);
});
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">{{ t('properties.detail.amenities') }}</h3>

    <!-- Loading -->
    <div v-if="isLoading" class="flex flex-wrap gap-2">
      <div
        v-for="i in 3"
        :key="i"
        class="h-8 w-24 animate-pulse rounded-full bg-gray-200"
      />
    </div>

    <!-- Amenities list -->
    <div v-else-if="propertyAmenities.length > 0" class="flex flex-wrap gap-2">
      <span
        v-for="amenity in propertyAmenities"
        :key="amenity.id"
        class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
      >
        <Check class="h-3.5 w-3.5 text-green-600" />
        {{ getLocalizedName(amenity.name) }}
      </span>
    </div>
  </div>
</template>
