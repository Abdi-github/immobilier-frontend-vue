<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg';
}>(), {
  size: 'md',
});
</script>

<template>
  <div class="flex items-center justify-center">
    <i
      class="pi pi-spin pi-spinner"
      :class="{
        'text-xl': size === 'sm',
        'text-3xl': size === 'md',
        'text-5xl': size === 'lg',
      }"
    />
  </div>
</template>
