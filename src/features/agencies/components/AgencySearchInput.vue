<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { MapPin, Building2 } from 'lucide-vue-next';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useCities } from '@/features/locations/composables/useCities';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';

export interface SearchResult {
  id: string;
  name: string;
  type: 'canton' | 'city';
  cantonCode?: string;
  cantonName?: string;
}

const emit = defineEmits<{
  select: [result: SearchResult];
}>();

const { t } = useI18n();
const getLocalizedName = useLocalizedName();

const query = ref('');
const isOpen = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const dropdownRef = ref<HTMLDivElement | null>(null);

const { data: cantonsData } = useCantons();
const { data: citiesData } = useCities();

const filteredResults = computed((): SearchResult[] => {
  if (!query.value.trim() || query.value.length < 2) return [];

  const searchTerm = query.value.toLowerCase();
  const results: SearchResult[] = [];
  const cantons = cantonsData.value?.data || [];
  const cities = citiesData.value?.data || [];

  // Search cantons
  for (const canton of cantons) {
    const name = getLocalizedName(canton.name);
    if (name.toLowerCase().includes(searchTerm)) {
      results.push({
        id: canton.id,
        name,
        type: 'canton',
        cantonCode: canton.code,
      });
    }
  }

  // Search cities
  for (const city of cities) {
    const name = getLocalizedName(city.name);
    if (name.toLowerCase().includes(searchTerm)) {
      const canton = cantons.find((c) => c.id === city.canton_id);
      results.push({
        id: city.id,
        name,
        type: 'city',
        cantonCode: canton?.code,
        cantonName: canton ? getLocalizedName(canton.name) : undefined,
      });
    }
  }

  // Sort: exact matches first, then cantons, then cities
  return results
    .sort((a, b) => {
      const aExact = a.name.toLowerCase() === searchTerm;
      const bExact = b.name.toLowerCase() === searchTerm;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      if (a.type === 'canton' && b.type === 'city') return -1;
      if (a.type === 'city' && b.type === 'canton') return 1;
      return a.name.localeCompare(b.name);
    })
    .slice(0, 10);
});

function handleSelect(result: SearchResult) {
  query.value = '';
  isOpen.value = false;
  emit('select', result);
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node;
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(target) &&
    inputRef.value &&
    !inputRef.value.contains(target)
  ) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <div class="relative flex-1">
    <MapPin
      class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
    <input
      ref="inputRef"
      v-model="query"
      type="text"
      :placeholder="t('agencies.search.locationPlaceholder')"
      class="h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      @focus="isOpen = true"
      @input="isOpen = true"
    />

    <!-- Dropdown -->
    <div
      v-if="isOpen && filteredResults.length > 0"
      ref="dropdownRef"
      class="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-md border bg-white shadow-lg"
    >
      <button
        v-for="result in filteredResults"
        :key="`${result.type}-${result.id}`"
        class="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
        @click="handleSelect(result)"
      >
        <div class="flex items-center gap-3">
          <MapPin v-if="result.type === 'canton'" class="h-4 w-4 text-blue-500" />
          <Building2 v-else class="h-4 w-4 text-gray-400" />
          <div>
            <span class="font-medium">{{ result.name }}</span>
            <span
              v-if="result.type === 'city' && result.cantonName"
              class="ml-2 text-sm text-gray-500"
            >
              - {{ result.cantonName }}
            </span>
          </div>
        </div>
        <span
          class="rounded px-2 py-0.5 text-xs"
          :class="
            result.type === 'canton'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600'
          "
        >
          {{ result.type === 'canton' ? t('agencies.search.canton', 'Canton') : t('agencies.search.city', 'City') }}
        </span>
      </button>
    </div>

    <!-- No results -->
    <div
      v-if="isOpen && query.length >= 2 && filteredResults.length === 0"
      ref="dropdownRef"
      class="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border bg-white p-4 text-center text-sm text-gray-500 shadow-lg"
    >
      {{ t('agencies.search.noResults', 'No locations found') }}
    </div>
  </div>
</template>
