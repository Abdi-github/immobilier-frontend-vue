<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Home, MapPin, FileText, Sparkles, Image, Eye, Check } from 'lucide-vue-next';

const props = defineProps<{
  currentStep: number;
  onGoToStep?: (step: number) => void;
}>();

const { t } = useI18n();

const steps = [
  { number: 1, label: () => t('form.steps.basicInfo'), icon: Home },
  { number: 2, label: () => t('form.steps.location'), icon: MapPin },
  { number: 3, label: () => t('form.steps.details'), icon: FileText },
  { number: 4, label: () => t('form.steps.amenities'), icon: Sparkles },
  { number: 5, label: () => t('form.steps.photos'), icon: Image },
  { number: 6, label: () => t('form.steps.review'), icon: Eye },
];

function handleClick(step: number) {
  if (step < props.currentStep && props.onGoToStep) {
    props.onGoToStep(step);
  }
}
</script>

<template>
  <!-- Desktop Stepper -->
  <nav class="hidden lg:block space-y-2">
    <button
      v-for="step in steps"
      :key="step.number"
      type="button"
      class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
      :class="{
        'bg-primary text-white': step.number === currentStep,
        'text-green-700 hover:bg-green-50 cursor-pointer': step.number < currentStep,
        'text-gray-400 cursor-default': step.number > currentStep,
      }"
      :disabled="step.number > currentStep"
      @click="handleClick(step.number)"
    >
      <div
        class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
        :class="{
          'bg-white/20 text-white': step.number === currentStep,
          'bg-green-100 text-green-700': step.number < currentStep,
          'bg-gray-100 text-gray-400': step.number > currentStep,
        }"
      >
        <Check v-if="step.number < currentStep" class="h-3.5 w-3.5" />
        <component v-else :is="step.icon" class="h-3.5 w-3.5" />
      </div>
      <span class="font-medium">{{ step.label() }}</span>
    </button>
  </nav>

  <!-- Mobile Progress Bar -->
  <div class="lg:hidden">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-medium text-gray-700">
        Step {{ currentStep }} of {{ steps.length }}
      </span>
      <span class="text-sm text-gray-500">
        {{ steps[currentStep - 1]?.label() }}
      </span>
    </div>
    <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100">
      <div
        class="h-full rounded-full bg-primary transition-all duration-300"
        :style="{ width: `${(currentStep / steps.length) * 100}%` }"
      />
    </div>
  </div>
</template>
