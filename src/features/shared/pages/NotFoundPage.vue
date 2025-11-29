<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Home } from 'lucide-vue-next';
import SEO from '@/shared/components/SEO.vue';

const { t, locale } = useI18n();
const router = useRouter();
</script>

<template>
  <div data-testid="not-found-page" class="flex min-h-[60vh] flex-col items-center justify-center px-4">
    <SEO :title="t('notFound.title')" />
    <h1 class="text-7xl font-bold text-gray-200">404</h1>
    <h2 class="mt-4 text-2xl font-semibold text-gray-800">{{ t('notFound.title') }}</h2>
    <p class="mt-2 text-gray-500">{{ t('notFound.description') }}</p>
    <button
      class="mt-8 flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
      @click="router.push({ name: 'home', params: { lang: locale } })"
    >
      <Home class="h-4 w-4" />
      {{ t('notFound.goHome') }}
    </button>
  </div>
</template>
