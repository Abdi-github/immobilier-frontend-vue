<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string;
  title: string;
  description?: string;
}>(), {
  icon: 'pi-inbox',
});
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <i :class="['pi', icon, 'text-4xl text-gray-300']" />
    <h3 class="mt-4 text-lg font-medium text-gray-900">{{ title }}</h3>
    <p v-if="description" class="mt-2 text-sm text-gray-500">{{ description }}</p>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
