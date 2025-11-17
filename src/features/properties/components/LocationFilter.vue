<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { MapPin, ChevronDown, X, Plus } from 'lucide-vue-next';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useCities } from '@/features/locations/composables/useCities';
import type { SelectedLocation } from '../composables/usePropertySearch';

const props = defineProps<{
  selectedLocations: SelectedLocation[];
}>();

const emit = defineEmits<{
  change: [locations: SelectedLocation[]];
}>();

const { t } = useI18n();
const getLocalizedName = useLocalizedName();

const isOpen = ref(false);
const searchQuery = ref('');
const dropdownRef = ref<HTMLDivElement>();

const { data: cantonsData } = useCantons();
const { data: citiesData } = useCities();

const cantons = computed(() => cantonsData.value?.data ?? []);
const cities = computed(() => citiesData.value?.data ?? []);

const filteredResults = computed((): SelectedLocation[] => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) {
    // Show first 8 cantons by default
    return cantons.value.slice(0, 8).map((canton) => ({
      id: String(canton.id),
      name: getLocalizedName(canton.name),
      type: 'canton' as const,
      cantonCode: canton.code,
    }));
  }

  const results: SelectedLocation[] = [];

  // Search cities
  for (const city of cities.value) {
    const cityName = getLocalizedName(city.name).toLowerCase();
    const postalCode = city.postal_code ?? '';
    if (cityName.includes(query) || postalCode.includes(query)) {
      const canton = cantons.value.find((c) => String(c.id) === String(city.canton_id));
      results.push({
        id: String(city.id),
        name: getLocalizedName(city.name),
        type: 'city',
        postalCode: city.postal_code,
        cantonCode: canton?.code,
      });
    }
  }

  // Search cantons
  for (const canton of cantons.value) {
    const cantonName = getLocalizedName(canton.name).toLowerCase();
    if (cantonName.includes(query)) {
      results.push({
        id: String(canton.id),
        name: getLocalizedName(canton.name),
        type: 'canton',
        cantonCode: canton.code,
      });
    }
  }

  return results.slice(0, 20);
});

function isSelected(id: string) {
  return props.selectedLocations.some((loc) => loc.id === id);
}

function addLocation(location: SelectedLocation) {
  if (!isSelected(location.id)) {
    emit('change', [...props.selectedLocations, location]);
  }
  searchQuery.value = '';
}

function removeLocation(id: string, e?: Event) {
  e?.stopPropagation();
  emit('change', props.selectedLocations.filter((loc) => loc.id !== id));
}

function clearAll() {
  emit('change', []);
}

function onClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', onClickOutside));
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- Trigger button -->
    <button
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      class="flex h-auto min-h-10 min-w-50 items-center justify-between gap-2 rounded-md border border-gray-300 px-3 py-2"
      :class="selectedLocations.length > 0 && 'bg-gray-50'"
      @click="isOpen = !isOpen"
    >
      <div class="flex flex-1 flex-wrap items-center gap-1">
        <!-- Empty state -->
        <template v-if="selectedLocations.length === 0">
          <MapPin class="h-4 w-4 text-gray-400" />
          <span class="text-sm text-gray-500">{{ t('properties.filters.location', 'Location') }}</span>
        </template>
        <!-- Selected tags -->
        <template v-else>
          <span
            v-for="location in selectedLocations"
            :key="location.id"
            class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
          >
            {{ location.name }}
            <span v-if="location.type === 'city' && location.cantonCode" class="text-gray-500">({{ location.cantonCode }})</span>
            <span v-if="location.type === 'canton'" class="text-gray-500">(Canton)</span>
            <button
              type="button"
              class="ml-0.5 rounded-full p-0.5 hover:bg-primary/20"
              @click.stop="removeLocation(location.id, $event)"
            >
              <X class="h-3 w-3" />
            </button>
          </span>
          <span class="flex items-center gap-1 text-xs text-gray-400">
            <Plus class="h-3 w-3" />
            Add
          </span>
        </template>
      </div>
      <ChevronDown class="h-4 w-4 shrink-0 text-gray-400" />
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute left-0 top-full z-50 mt-1 w-80 rounded-md border bg-white shadow-lg"
    >
      <!-- Search input -->
      <div class="border-b p-3">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('properties.filters.searchLocation', 'Search city, postal code or canton...')"
          class="h-9 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <!-- Results list -->
      <div class="max-h-72 overflow-y-auto p-2">
        <p v-if="filteredResults.length === 0" class="p-3 text-center text-sm text-gray-500">
          No locations found
        </p>
        <div v-else class="space-y-1">
          <button
            v-for="location in filteredResults"
            :key="`${location.type}-${location.id}`"
            :disabled="isSelected(location.id)"
            class="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm"
            :class="isSelected(location.id) ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'"
            @click="addLocation(location)"
          >
            <div class="flex items-center gap-2">
              <MapPin class="h-4 w-4 text-gray-400" />
              <div>
                <span class="font-medium">{{ location.name }}</span>
                <span v-if="location.postalCode" class="ml-2 text-gray-500">{{ location.postalCode }}</span>
              </div>
            </div>
            <span
              class="text-xs"
              :class="location.type === 'canton' ? 'rounded bg-blue-100 px-1.5 py-0.5 text-blue-700' : 'text-gray-400'"
            >
              {{ location.type === 'canton' ? 'Canton' : location.cantonCode || '' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Clear all -->
      <div v-if="selectedLocations.length > 0" class="border-t p-2">
        <button
          type="button"
          class="w-full rounded-md py-1.5 text-center text-sm text-gray-500 hover:bg-gray-50"
          @click="clearAll"
        >
          Clear all locations
        </button>
      </div>
    </div>
  </div>
</template>
