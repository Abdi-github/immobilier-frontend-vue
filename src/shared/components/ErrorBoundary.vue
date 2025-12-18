<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';

const error = ref<Error | null>(null);

onErrorCaptured((err: Error) => {
  error.value = err;
  return false;
});
</script>

<template>
  <div v-if="error" class="flex flex-col items-center justify-center p-8">
    <p class="text-lg font-semibold text-red-600">Something went wrong</p>
    <p class="mt-2 text-sm text-gray-500">{{ error.message }}</p>
    <button class="mt-4 rounded bg-primary px-4 py-2 text-white" @click="error = null">
      Try Again
    </button>
  </div>
  <slot v-else />
</template>
