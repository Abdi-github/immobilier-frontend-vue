<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronDown, X } from 'lucide-vue-next';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import type { Category } from '@/features/locations/types';

const props = defineProps<{
  categories: Category[];
  selectedIds: string[];
}>();

const emit = defineEmits<{
  change: [ids: string[]];
}>();

const { t } = useI18n();
const getLocalizedName = useLocalizedName();

const isOpen = ref(false);
const dropdownRef = ref<HTMLDivElement>();

function handleToggle(id: string) {
  if (props.selectedIds.includes(id)) {
    emit('change', props.selectedIds.filter((sid) => sid !== id));
  } else {
    emit('change', [...props.selectedIds, id]);
  }
}

const displayLabel = computed(() => {
  if (props.selectedIds.length === 0) {
    return t('properties.filters.category', 'Property type');
  }
  if (props.selectedIds.length === 1) {
    const selected = props.categories.find((cat) => String(cat.id) === props.selectedIds[0]);
    return selected ? getLocalizedName(selected.name) : t('properties.filters.category', 'Property type');
  }
  return `${props.selectedIds.length} types`;
});

const hasValue = computed(() => props.selectedIds.length > 0);

function handleClear(e: Event) {
  e.stopPropagation();
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
    <button
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      class="flex w-40 items-center justify-between rounded-md border px-3 py-2 text-sm font-normal transition-colors"
      :class="hasValue ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'"
      @click="isOpen = !isOpen"
    >
      <span class="truncate">{{ displayLabel }}</span>
      <span class="ml-2 flex items-center gap-1">
        <span
          v-if="hasValue"
          role="button"
          tabindex="0"
          class="rounded-sm p-0.5 hover:bg-gray-200"
          @click="handleClear"
          @keydown.enter="handleClear"
        >
          <X class="h-3.5 w-3.5 shrink-0 opacity-70 hover:opacity-100" />
        </span>
        <ChevronDown
          class="h-4 w-4 shrink-0 opacity-50 transition-transform"
          :class="isOpen && 'rotate-180'"
        />
      </span>
    </button>

    <div
      v-if="isOpen"
      class="absolute left-0 top-full z-50 mt-1 w-56 rounded-md border bg-white p-2 shadow-lg"
    >
      <div class="max-h-64 overflow-auto">
        <label
          v-for="category in categories"
          :key="category.id"
          class="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-50"
        >
          <input
            type="checkbox"
            :checked="selectedIds.includes(String(category.id))"
            class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            @change="handleToggle(String(category.id))"
          />
          <span class="text-sm text-gray-700">{{ getLocalizedName(category.name) }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
