<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SEO from '@/shared/components/SEO.vue';

const { t } = useI18n();

const sections = [
  'acceptance', 'services', 'accounts', 'listings',
  'intellectual', 'limitation', 'law', 'contact',
];
</script>

<template>
  <div data-testid="terms-page" class="mx-auto max-w-4xl px-4 py-12">
    <SEO :title="t('terms.title')" />

    <h1 class="text-3xl font-bold tracking-tight mb-8">{{ t('terms.title') }}</h1>

    <div class="space-y-8">
      <p class="text-gray-500">{{ t('terms.lastUpdated') }}</p>

      <section v-for="s in sections" :key="s">
        <h2 class="text-xl font-semibold mb-2">{{ t(`terms.sections.${s}.title`) }}</h2>
        <p class="text-gray-500 leading-relaxed">{{ t(`terms.sections.${s}.text`) }}</p>
      </section>
    </div>
  </div>
</template>
