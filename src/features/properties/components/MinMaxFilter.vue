<script setup lang="ts">
import { ref, watch } from 'vue';
import { ChevronDown, X } from 'lucide-vue-next';
import type { MinMaxOption } from '../constants/filterPresets';

const props = withDefaults(
  defineProps<{
    label: string;
    minValue?: number;
    maxValue?: number;
    options: MinMaxOption[];
    unit?: string;
    formatValue?: (value: number) => string;
  }>(),
  { unit: '' },
);

const emit = defineEmits<{
  'update:minValue': [value: number | undefined];
  'update:maxValue': [value: number | undefined];
}>();

const isOpen = ref(false);
const localMin = ref(props.minValue?.toString() ?? '');
const localMax = ref(props.maxValue?.toString() ?? '');
const dropdownRef = ref<HTMLDivElement>();

// Sync from props
watch(
  () => props.minValue,
  (v) => (localMin.value = v?.toString() ?? ''),
);
watch(
  () => props.maxValue,
  (v) => (localMax.value = v?.toString() ?? ''),
);

function applyValues() {
  const min = localMin.value ? parseInt(localMin.value, 10) : undefined;
  const max = localMax.value ? parseInt(localMax.value, 10) : undefined;
  if (min !== props.minValue) emit('update:minValue', min);
  if (max !== props.maxValue) emit('update:maxValue', max);
}

function handleOptionClick(value: number, target: 'min' | 'max') {
  if (target === 'min') {
    localMin.value = value.toString();
    emit('update:minValue', value);
  } else {
    localMax.value = value.toString();
    emit('update:maxValue', value);
  }
}

const hasValue = computed(() => props.minValue !== undefined || props.maxValue !== undefined);

const displayLabel = computed(() => {
  if (props.minValue && props.maxValue) {
    const minStr = props.formatValue ? props.formatValue(props.minValue) : String(props.minValue);
    const maxStr = props.formatValue ? props.formatValue(props.maxValue) : String(props.maxValue);
    return `${minStr} - ${maxStr}`;
  }
  if (props.minValue) {
    const minStr = props.formatValue ? props.formatValue(props.minValue) : String(props.minValue);
    return `${minStr}+`;
  }
  if (props.maxValue) {
    const maxStr = props.formatValue ? props.formatValue(props.maxValue) : String(props.maxValue);
    return `≤ ${maxStr}`;
  }
  return props.label;
});

function handleClear(e: Event) {
  e.stopPropagation();
  localMin.value = '';
  localMax.value = '';
  emit('update:minValue', undefined);
  emit('update:maxValue', undefined);
}

function onInputKey(e: KeyboardEvent) {
  if (e.key === 'Enter') applyValues();
}

function onlyDigits(e: Event) {
  const input = e.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, '');
  if (input.dataset.field === 'min') localMin.value = input.value;
  else localMax.value = input.value;
}

// Close on outside click
function onClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
    applyValues();
  }
}

import { computed, onMounted, onBeforeUnmount } from 'vue';

onMounted(() => document.addEventListener('mousedown', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', onClickOutside));
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      class="flex min-w-32 items-center justify-between gap-1 rounded-md border px-3 py-2 text-sm font-normal transition-colors"
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
      class="absolute left-0 top-full z-50 mt-1 w-64 rounded-md border bg-white shadow-lg"
    >
      <!-- Min / Max inputs -->
      <div class="flex gap-2 border-b p-3">
        <input
          :value="localMin"
          data-field="min"
          placeholder="Min"
          class="h-9 w-full rounded-md border border-gray-300 px-2 text-sm focus:border-primary focus:outline-none"
          @input="onlyDigits"
          @blur="applyValues"
          @keydown="onInputKey"
        />
        <input
          :value="localMax"
          data-field="max"
          placeholder="Max"
          class="h-9 w-full rounded-md border border-gray-300 px-2 text-sm focus:border-primary focus:outline-none"
          @input="onlyDigits"
          @blur="applyValues"
          @keydown="onInputKey"
        />
      </div>

      <!-- Preset options in two columns -->
      <div class="grid max-h-48 grid-cols-2 gap-0 overflow-auto">
        <div class="border-r">
          <p class="bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500">Min</p>
          <button
            v-for="option in options"
            :key="`min-${option.value}`"
            class="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50"
            :class="minValue === option.value && 'bg-primary/10 font-medium text-primary'"
            @click="handleOptionClick(option.value, 'min')"
          >
            {{ option.label }}
          </button>
        </div>
        <div>
          <p class="bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500">Max</p>
          <button
            v-for="option in options"
            :key="`max-${option.value}`"
            class="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50"
            :class="maxValue === option.value && 'bg-primary/10 font-medium text-primary'"
            @click="handleOptionClick(option.value, 'max')"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
